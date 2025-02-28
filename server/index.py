from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import json
import time
from db import connect_to_db
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from starlette.requests import Request
from datetime import datetime, timedelta, timezone
import jwt
app = FastAPI()

origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.options("/{path:path}")
async def options_handler(request: Request):
    response = JSONResponse()
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, DELETE, PUT"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return



SECRET_KEY = "tvoj_tajny_kluc"
ALGORITHM = "HS256"

def create_jwt(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta 
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@app.get("/fxb/welcome")
async def overit(response: Response, dialog: int = None):
    if dialog is None:
        return {"findNumber": "nok", "message": "Missing 'dialog' parameter"}
    try:
        card_number = await connect_to_db(dialog)
        print(card_number)
        if card_number:
            token = create_jwt({"sub": "user123"}, timedelta(hours=1))
            response.set_cookie(
                  key="foxxy_accesss_token",
                  value=token,
                  expires=datetime.now(timezone.utc) + timedelta(hours=1),  # Expirácia za 1 hodinu
                  path="/"
            )
            return {"findNumber": "true", "message": "Number found"}
    except ValueError:
        return {"findNumber": "false", "message": "Invalid number format in file"}
    return {"findNumber": "false", "message": "Number not found"}

@app.get("/fxb/home")
async def overit(dialogVZ: int = None, dialogOP: int = None):
    print(dialogVZ, dialogOP)
    if dialogVZ and dialogOP is None:
        return {"findVZorfindOP": "true", "message": "chybna kombinacia parametrov"}

    try:
        with open("./vz_number.json", "r") as file:
            data = json.load(file)
            # Prístup k zoznamu "emp_details"
            for item in data["emp_details"]:
                print(f"VZ: {item['VZ']}, OP: {item['OP']}, State: {item['state']}")
    except ValueError:
        return {"findError": "false", "message": "Invalid number format in file"}

    return {"findError": "false", "message": "Number not found"}




@app.get("/cookie/delete")
async def delete_cookie(response: Response):
    response.delete_cookie("foxxy_accesss_token")
    return {"message": "Cookie deleted"}

@app.get("/cookie/verify")
async def verify_cookie(request: Request):
    if "foxxy_accesss_token" in request.cookies:
        token = request.cookies.get("foxxy_accesss_token")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp = payload.get("exp")
        print(exp)
        return {"message": "Cookie verified"}
    return {"message": "Cookie not found"}
