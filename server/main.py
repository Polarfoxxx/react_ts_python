from fastapi import FastAPI, Response
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from starlette.requests import Request
from authentication import * 
from cookie import *
from transaction import *
from db import *

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

""" authentication.............................. """
@app.get("/fxb/welcome")
async def log_in(response: Response, dialog: int = None):
    if dialog is None:
        return {"findNumber": "nok", "message": "Missing 'dialog' parameter"}
    try:
        authen_response = await authentication(dialog, response)
        return authen_response
    except ValueError:
        return {"findNumber": "false", "message": "Invalid number format in file"}

""" transaction................................ """
@app.get("/fxb/load_all_transactions")
async def load_all_transaction():
    return load_all_transactions()

class Transaction(BaseModel):
    create_time: str
    type_trns: str
    class_trns: str
    value_trns: int
@app.get("/fxb/create_new_transactions")
async def create_transaction(item: Transaction):
    return create_new_transaction()



""" cookie....................................... """
@app.get("/cookie/delete")
async def delete_cookie(response: Response):
 return remove_cookie(response)


@app.get("/cookie/verify")
async def verify_cookie(request: Request):
  return verifycation_cookie(request)














""" @app.get("/fxb/home")
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

 """