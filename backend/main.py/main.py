from fastapi import FastAPI
from routes.risk_routes import router

app = FastAPI()

app.include_router(router)

@app.get("/")
def home():
    return {"message": "RESQ.AI Backend Running"}
