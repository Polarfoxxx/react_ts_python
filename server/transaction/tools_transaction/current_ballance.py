
from pymongo import MongoClient
from jsonschema import validate, ValidationError
from db.db_connection import connection_to_db
from fastapi import Request
import jwt
from jwt import InvalidTokenError
from cookie import *

def current_ballance(request: Request):
    decode_cookie = CookieManager(request).decode_jwt()
    user_logined = decode_cookie.get("cardNumber")

    #! Pripojenie k DB
    mongoo_connection = connection_to_db()

    #! Nájdeme konkrétny dokument
    logined_user_object = mongoo_connection.find_one({"cardNumber": user_logined})
    if logined_user_object is None:
        print("Nenájdený dokument!")
        return
    
    mytransaction = logined_user_object.get("all_transaction", [])
    if not mytransaction:
        print("Žiadne transakcie nenájdené!")
        return {"findError": "true", "message": "No transactions found!"}
    
    one_value =  0
    for transaction in mytransaction:
        if transaction["type_trns"] == "addition":
            one_value += transaction["value_trns"]
        elif transaction["type_trns"] == "deduction":
            one_value -= transaction["value_trns"]
    return {"findError": "false", "message": "Current balance calculated!", "current_balance": one_value}
