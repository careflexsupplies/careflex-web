"""
CareFlex backend API tests.
Covers public content endpoints, lead/subscriber submission, auth, and admin CRUD.
"""
import os
import time
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://flex-health-lead.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

# Session token created via mongosh per /app/auth_testing.md
SESSION_TOKEN = os.environ.get("TEST_SESSION_TOKEN", "test_session_1784840316038")


@pytest.fixture(scope="session")
def s():
    ses = requests.Session()
    ses.headers.update({"Content-Type": "application/json"})
    return ses


@pytest.fixture(scope="session")
def auth_s():
    ses = requests.Session()
    ses.headers.update({
        "Content-Type": "application/json",
        "Authorization": f"Bearer {SESSION_TOKEN}",
    })
    return ses


# ---------- Public content ----------
class TestPublicContent:
    def test_categories(self, s):
        r = s.get(f"{API}/categories")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list) and len(data) == 4
        slugs = {c["slug"] for c in data}
        assert {"mobility-aids", "orthotics", "diabetes-care", "wound-care"} <= slugs

    def test_products_list(self, s):
        r = s.get(f"{API}/products")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 20, f"expected 20 seeded products, got {len(data)}"

    def test_products_filter_category(self, s):
        r = s.get(f"{API}/products", params={"category": "diabetes-care"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        assert all(p["category_slug"] == "diabetes-care" for p in data)

    def test_products_filter_coverage_cash(self, s):
        r = s.get(f"{API}/products", params={"coverage": "cash"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        assert all(p["coverage"] == "cash" for p in data)

    def test_products_filter_search(self, s):
        r = s.get(f"{API}/products", params={"search": "wheelchair"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        assert any("wheelchair" in p["name"].lower() or "wheelchair" in p.get("description", "").lower() for p in data)

    def test_products_filter_featured(self, s):
        r = s.get(f"{API}/products", params={"featured": "true"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        assert all(p.get("featured") is True for p in data)

    def test_product_detail(self, s):
        r = s.get(f"{API}/products/standard-wheelchair")
        assert r.status_code == 200
        d = r.json()
        assert d["slug"] == "standard-wheelchair"
        assert "features" in d and isinstance(d["features"], list)

    def test_product_detail_404(self, s):
        r = s.get(f"{API}/products/does-not-exist-xyz")
        assert r.status_code == 404

    def test_posts_list_no_content(self, s):
        r = s.get(f"{API}/posts")
        assert r.status_code == 200
        data = r.json()
        assert len(data) == 3
        # published posts, no content field in list
        assert all("content" not in p for p in data)

    def test_post_detail(self, s):
        r = s.get(f"{API}/posts/medicare-dme-coverage-guide")
        assert r.status_code == 200
        d = r.json()
        assert d["slug"] == "medicare-dme-coverage-guide"
        assert isinstance(d.get("content"), str) and len(d["content"]) > 100

    def test_faqs(self, s):
        r = s.get(f"{API}/faqs")
        assert r.status_code == 200
        assert len(r.json()) == 8

    def test_testimonials(self, s):
        r = s.get(f"{API}/testimonials")
        assert r.status_code == 200
        assert len(r.json()) == 4

    def test_service_areas(self, s):
        r = s.get(f"{API}/service-areas")
        assert r.status_code == 200
        assert len(r.json()) == 8


# ---------- Leads (contact, referral, campaign) ----------
class TestLeads:
    def test_create_contact_lead(self, s):
        payload = {"type": "contact", "name": "TEST_Contact", "email": "test@example.com", "message": "Hi"}
        r = s.post(f"{API}/leads", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["type"] == "contact"
        assert d["status"] == "new"
        assert "id" in d

    def test_create_referral_lead_with_organization(self, s):
        payload = {"type": "referral", "name": "TEST_Ref", "email": "r@example.com", "phone": "555", "organization": "Hosp"}
        r = s.post(f"{API}/leads", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["type"] == "referral"
        assert d.get("organization") == "Hosp"

    def test_create_campaign_lead_with_insurance(self, s):
        payload = {"type": "campaign", "name": "TEST_Camp", "phone": "555-1111", "insurance": "Medicare", "equipment_category": "mobility-aids"}
        r = s.post(f"{API}/leads", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["type"] == "campaign"
        assert d.get("insurance") == "Medicare"


# ---------- Subscribers ----------
class TestSubscribers:
    def test_create_subscriber(self, s):
        payload = {"name": "TEST_Sub", "contact": "sub@example.com", "channel": "email",
                   "product_category": "diabetes-care", "cadence": "30"}
        r = s.post(f"{API}/subscribers", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["name"] == "TEST_Sub"
        assert d["active"] is True
        assert "id" in d


# ---------- Auth ----------
class TestAuth:
    def test_me_without_token(self, s):
        r = s.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_me_with_bearer(self, auth_s):
        r = auth_s.get(f"{API}/auth/me")
        assert r.status_code == 200
        d = r.json()
        assert "email" in d and "user_id" in d
        assert "_id" not in d

    def test_admin_endpoints_require_auth(self, s):
        for path in ["/admin/leads", "/admin/subscribers", "/admin/stats", "/admin/posts"]:
            r = s.get(f"{API}{path}")
            assert r.status_code == 401, f"{path} did not 401: {r.status_code}"


# ---------- Admin CRUD ----------
class TestAdminCRUD:
    def test_admin_stats(self, auth_s):
        r = auth_s.get(f"{API}/admin/stats")
        assert r.status_code == 200
        d = r.json()
        for k in ["products", "categories", "posts", "faqs", "testimonials", "subscribers",
                  "leads_total", "leads_new", "leads_by_type"]:
            assert k in d
        assert d["products"] >= 20
        assert d["categories"] == 4

    def test_admin_leads_list(self, auth_s):
        r = auth_s.get(f"{API}/admin/leads")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_admin_subscribers_list(self, auth_s):
        r = auth_s.get(f"{API}/admin/subscribers")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_admin_posts_list(self, auth_s):
        r = auth_s.get(f"{API}/admin/posts")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_product_full_crud(self, auth_s):
        slug = f"TEST_product_{int(time.time())}"
        payload = {
            "name": "TEST_Product", "slug": slug, "category_slug": "mobility-aids",
            "coverage": "cash", "price": 99.99, "description": "Test", "features": ["a", "b"],
            "in_stock": True, "featured": False,
        }
        # CREATE
        r = auth_s.post(f"{API}/admin/products", json=payload)
        assert r.status_code == 200
        created = r.json()
        pid = created["id"]
        assert created["name"] == "TEST_Product"

        # Verify via public GET by slug
        r2 = requests.get(f"{API}/products/{slug}")
        assert r2.status_code == 200
        assert r2.json()["price"] == 99.99

        # UPDATE
        r3 = auth_s.put(f"{API}/admin/products/{pid}", json={"price": 55.55, "name": "TEST_Product_Updated"})
        assert r3.status_code == 200
        assert r3.json()["price"] == 55.55
        assert r3.json()["name"] == "TEST_Product_Updated"

        # DELETE
        r4 = auth_s.delete(f"{API}/admin/products/{pid}")
        assert r4.status_code == 200

        # Confirm gone
        r5 = requests.get(f"{API}/products/{slug}")
        assert r5.status_code == 404

    def test_admin_update_lead_status(self, auth_s, s):
        # Create a lead first
        r = s.post(f"{API}/leads", json={"type": "contact", "name": "TEST_LeadStatus", "email": "ls@ex.com"})
        assert r.status_code == 200
        lead_id = r.json()["id"]

        r2 = auth_s.put(f"{API}/admin/leads/{lead_id}", json={"status": "contacted"})
        assert r2.status_code == 200
        assert r2.json()["status"] == "contacted"

    def test_admin_unknown_resource_404(self, auth_s):
        r = auth_s.post(f"{API}/admin/unknown-thing", json={"foo": "bar"})
        assert r.status_code == 404


# Note: /auth/logout deletes session cookie; skipping to avoid killing shared test session token.
