from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import httpx
from pathlib import Path
from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from seed_data import CATEGORIES, PRODUCTS, FAQS, TESTIMONIALS, SERVICE_AREAS, POSTS

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

RESOURCES = {
    "categories": "categories",
    "products": "products",
    "posts": "posts",
    "faqs": "faqs",
    "testimonials": "testimonials",
    "service-areas": "service_areas",
}


def now_iso():
    return datetime.now(timezone.utc).isoformat()


# ---------- Auth (Emergent Managed Google OAuth) ----------
class SessionRequest(BaseModel):
    session_id: str


async def get_current_user(request: Request):
    token = request.cookies.get("session_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@api_router.post("/auth/session")
async def create_session(body: SessionRequest, response: Response):
    async with httpx.AsyncClient() as hc:
        r = await hc.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": body.session_id},
        )
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session id")
    data = r.json()
    allowlist = [e.strip().lower() for e in os.environ.get("ADMIN_EMAILS", "").split(",") if e.strip()]
    if allowlist and data["email"].lower() not in allowlist:
        raise HTTPException(status_code=403, detail="This account is not authorized for the admin dashboard")
    existing = await db.users.find_one({"email": data["email"]}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one({"user_id": user_id}, {"$set": {"name": data["name"], "picture": data.get("picture")}})
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id, "email": data["email"], "name": data["name"],
            "picture": data.get("picture"), "role": "admin", "created_at": now_iso(),
        })
    session_token = data["session_token"]
    await db.user_sessions.insert_one({
        "user_id": user_id, "session_token": session_token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": now_iso(),
    })
    response.set_cookie("session_token", session_token, max_age=7 * 24 * 3600,
                        httponly=True, secure=True, samesite="none", path="/")
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    return user


@api_router.get("/auth/me")
async def auth_me(user=Depends(get_current_user)):
    return user


@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/")
    return {"ok": True}


# ---------- Public content ----------
@api_router.get("/categories")
async def list_categories():
    return await db.categories.find({}, {"_id": 0}).sort("order", 1).to_list(100)


@api_router.get("/products")
async def list_products(category: Optional[str] = None, coverage: Optional[str] = None,
                        search: Optional[str] = None, featured: Optional[bool] = None):
    q: Dict[str, Any] = {}
    if category:
        q["category_slug"] = category
    if coverage:
        q["coverage"] = coverage
    if featured is not None:
        q["featured"] = featured
    if search:
        q["$or"] = [{"name": {"$regex": search, "$options": "i"}},
                    {"description": {"$regex": search, "$options": "i"}}]
    return await db.products.find(q, {"_id": 0}).to_list(500)


@api_router.get("/products/{slug}")
async def get_product(slug: str):
    doc = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    return doc


@api_router.get("/posts")
async def list_posts():
    return await db.posts.find({"published": True}, {"_id": 0, "content": 0}).sort("created_at", -1).to_list(100)


@api_router.get("/posts/{slug}")
async def get_post(slug: str):
    doc = await db.posts.find_one({"slug": slug, "published": True}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Post not found")
    return doc


@api_router.get("/faqs")
async def list_faqs():
    return await db.faqs.find({}, {"_id": 0}).sort("order", 1).to_list(100)


@api_router.get("/testimonials")
async def list_testimonials():
    return await db.testimonials.find({}, {"_id": 0}).sort("order", 1).to_list(100)


@api_router.get("/service-areas")
async def list_service_areas():
    return await db.service_areas.find({}, {"_id": 0}).sort("order", 1).to_list(100)


# ---------- Leads (non-PHI) ----------
class LeadCreate(BaseModel):
    model_config = ConfigDict(extra="allow")
    type: str  # contact | referral | campaign
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    message: Optional[str] = None


@api_router.post("/leads")
async def create_lead(body: LeadCreate):
    doc = body.model_dump()
    doc.update({"id": str(uuid.uuid4()), "status": "new", "created_at": now_iso()})
    await db.leads.insert_one(dict(doc))
    doc.pop("_id", None)
    return doc


class SubscriberCreate(BaseModel):
    name: str
    contact: str  # email or phone
    channel: str  # email | sms
    product_category: str
    cadence: str  # 30 | 60 | 90 days


@api_router.post("/subscribers")
async def create_subscriber(body: SubscriberCreate):
    doc = body.model_dump()
    doc.update({"id": str(uuid.uuid4()), "active": True, "created_at": now_iso()})
    await db.subscribers.insert_one(dict(doc))
    doc.pop("_id", None)
    return doc


# ---------- Admin CRUD ----------
@api_router.get("/admin/leads")
async def admin_leads(user=Depends(get_current_user)):
    return await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.put("/admin/leads/{lead_id}")
async def update_lead(lead_id: str, body: Dict[str, Any], user=Depends(get_current_user)):
    body.pop("_id", None)
    body.pop("id", None)
    res = await db.leads.update_one({"id": lead_id}, {"$set": body})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return await db.leads.find_one({"id": lead_id}, {"_id": 0})


@api_router.get("/admin/subscribers")
async def admin_subscribers(user=Depends(get_current_user)):
    return await db.subscribers.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.get("/admin/stats")
async def admin_stats(user=Depends(get_current_user)):
    leads = await db.leads.find({}, {"_id": 0, "type": 1, "status": 1}).to_list(5000)
    return {
        "products": await db.products.count_documents({}),
        "categories": await db.categories.count_documents({}),
        "posts": await db.posts.count_documents({}),
        "faqs": await db.faqs.count_documents({}),
        "testimonials": await db.testimonials.count_documents({}),
        "subscribers": await db.subscribers.count_documents({}),
        "leads_total": len(leads),
        "leads_new": sum(1 for l in leads if l.get("status") == "new"),
        "leads_by_type": {t: sum(1 for l in leads if l.get("type") == t) for t in ["contact", "referral", "campaign"]},
    }


@api_router.get("/admin/posts")
async def admin_posts(user=Depends(get_current_user)):
    return await db.posts.find({}, {"_id": 0}).to_list(500)


@api_router.post("/admin/{resource}")
async def admin_create(resource: str, body: Dict[str, Any], user=Depends(get_current_user)):
    if resource not in RESOURCES:
        raise HTTPException(status_code=404, detail="Unknown resource")
    body.pop("_id", None)
    body["id"] = body.get("id") or str(uuid.uuid4())
    body["created_at"] = now_iso()
    await db[RESOURCES[resource]].insert_one(dict(body))
    body.pop("_id", None)
    return body


@api_router.put("/admin/{resource}/{item_id}")
async def admin_update(resource: str, item_id: str, body: Dict[str, Any], user=Depends(get_current_user)):
    if resource not in RESOURCES:
        raise HTTPException(status_code=404, detail="Unknown resource")
    body.pop("_id", None)
    body.pop("id", None)
    coll = db[RESOURCES[resource]]
    res = await coll.update_one({"id": item_id}, {"$set": body})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return await coll.find_one({"id": item_id}, {"_id": 0})


@api_router.delete("/admin/{resource}/{item_id}")
async def admin_delete(resource: str, item_id: str, user=Depends(get_current_user)):
    if resource not in RESOURCES:
        raise HTTPException(status_code=404, detail="Unknown resource")
    res = await db[RESOURCES[resource]].delete_one({"id": item_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"ok": True}


@api_router.get("/")
async def root():
    return {"message": "CareFlex API"}


# ---------- Seed ----------
@app.on_event("startup")
async def seed():
    if await db.categories.count_documents({}) == 0:
        await db.categories.insert_many([{**c, "id": str(uuid.uuid4()), "created_at": now_iso()} for c in CATEGORIES])
    if await db.products.count_documents({}) == 0:
        await db.products.insert_many([{**p, "id": str(uuid.uuid4()), "created_at": now_iso()} for p in PRODUCTS])
    if await db.faqs.count_documents({}) == 0:
        await db.faqs.insert_many([{**f, "id": str(uuid.uuid4()), "created_at": now_iso()} for f in FAQS])
    if await db.testimonials.count_documents({}) == 0:
        await db.testimonials.insert_many([{**t, "id": str(uuid.uuid4()), "created_at": now_iso()} for t in TESTIMONIALS])
    if await db.service_areas.count_documents({}) == 0:
        await db.service_areas.insert_many([{**s, "id": str(uuid.uuid4()), "created_at": now_iso()} for s in SERVICE_AREAS])
    if await db.posts.count_documents({}) == 0:
        await db.posts.insert_many([{**p, "id": str(uuid.uuid4()), "created_at": now_iso()} for p in POSTS])


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
