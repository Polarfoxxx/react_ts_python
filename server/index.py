from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import json
import time
from db import connect_to_db
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from starlette.requests import Request
from datetime import datetime, timezone, timedelta
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

@app.get("/fxb/welcome")
async def overit(response: Response, dialog: int = None):

    if dialog is None:
        return {"findNumber": "nok", "message": "Missing 'dialog' parameter"}
    try:
        card_number = await connect_to_db(dialog)
        print(card_number)
        if card_number:
            response.set_cookie(
                  key="foxxyFinance",
                  value="nic",
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
    response.delete_cookie("foxxyFinance")
    return {"message": "Cookie deleted"}

@app.get("/cookie/verify")
async def verify_cookie(request: Request):
    print(request.cookies)
    if "foxxyFinance" in request.cookies:
        return {"message": "Cookie verified"}
    return {"message": "Cookie not found"}
