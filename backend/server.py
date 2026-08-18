# CareFlex is now a static frontend-only website.
# The backend and database were removed at the user's request (June 2026).
# Forms send submissions by email via FormSubmit (see frontend/src/lib/api.js).
# This stub only keeps the container's supervisor service healthy.
from fastapi import FastAPI

app = FastAPI()


@app.get("/api/")
def root():
    return {"message": "CareFlex is a static frontend-only site. This backend is unused."}
