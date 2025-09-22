from typing import Union
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import *
from routes.users import router
from routes.equipment_stock import router as equipment_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
        CORSMiddleware,
        allow_origins=  ["*"],  # Allows all origins'',
        allow_credentials=True,
        allow_methods=["*"],  # Allows all HTTP methods
        allow_headers=["*"],  # Allows all headers
    )
app.include_router(router, prefix="/api")
app.include_router(equipment_router)

@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()
