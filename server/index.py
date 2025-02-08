from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from db import connect_to_db
app = FastAPI()

# Povolenie CORS pre frontend na http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def hi(dialog: int = None):
    return {"message": "Hello World"}


@app.get("/drm/welcome")
async def overit(dialog: int = None):
    if dialog is None:
        return {"findNumber": "nok", "message": "Missing 'dialog' parameter"}
    try:
        card_number = await connect_to_db(dialog)
        if card_number:
            return {"findNumber": "true", "message": "Number found"}
    except ValueError:
        return {"findNumber": "false", "message": "Invalid number format in file"}

    return {"findNumber": "false", "message": "Number not found"}


@app.get("/drm/home")
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
