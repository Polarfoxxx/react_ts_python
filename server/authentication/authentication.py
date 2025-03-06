from db.db_connection import connection_to_db
import asyncio
from fastapi import FastAPI, Response
from datetime import datetime, timedelta, timezone
import jwt
app = FastAPI()

SECRET_KEY = "tvoj_tajny_kluc"
ALGORITHM = "HS256"

def create_jwt(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta 
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def authentication(card: int, response: Response) -> dict:
    mongo_connection = connection_to_db()
    # Spustenie DB operácie v asynchrónnom vlákne
    result = await asyncio.to_thread(lambda: mongo_connection.find_one({"cardNumber": card}))
    if result:
        token = create_jwt({"sub": "user123"}, timedelta(hours=1))
        response.set_cookie(
            key="foxxy_accesss_token",
            value=token,
            expires=(datetime.now(timezone.utc) + timedelta(hours=1)).timestamp(),  # Expirácia v sekundách
            path="/"
        )
        return {"findNumber": "true", "message": "Number found"}
    
    return {"findNumber": "false", "message": "Number not found"}
