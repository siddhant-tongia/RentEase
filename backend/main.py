from fastapi import FastAPI
from database.connection import check_database_connection
from routes.health import router as health_router
from routes.auth import router as auth_router
from routes.properties import router as property_router

app = FastAPI(title="RentEase API")

@app.on_event("startup")
async def startup_event():
    await check_database_connection()

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(property_router)


