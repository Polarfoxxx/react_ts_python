from pymongo import MongoClient
from jsonschema import validate, ValidationError
from db.db_connection import connection_to_db
from fastapi import Request
import jwt
from jwt import InvalidTokenError
from cookie import *

def create_new_transaction(newTransaction: dict, request: Request):
    decode_cookie = CookieManager(request).decode_jwt()
    user_logined = decode_cookie.get("cardNumber")

    #! Pripojenie k DB
    mongoo_connection = connection_to_db()

    #! Nájdeme konkrétny dokument
    allTransaction = mongoo_connection.find_one({"cardNumber": user_logined})
    if allTransaction is None:
        print("Nenájdený dokument!")
        return
    
    #! vezmi všetky verejné premenné (atribúty) z objektu newTransaction a premeň ich na slovník (dict).
    #! premeníme na dictionary, aby sme mohli pridať do databázy
    newTransaction = newTransaction.__dict__ 
    

    create_new_transaction = {
    "type_trns": newTransaction["type_trns"],
    "value_trns": newTransaction["value_trns"],
    "name_event": newTransaction["name_event"],
    "create_time": newTransaction["create_time"]
}

    
    #! Schéma pre validáciu
    schema = {
        "type": "object",
        "properties": {
            "type_trns": {"type": "string"},
            "value_trns": {"type": "integer", "minimum": 0},
            "name_event": {"type": "string"},
            "create_time": {"type": "string"},
        },
        "required": ["type_trns", "value_trns","name_event", "create_time"]
    }

    #! Pridanie transakcie a validácia
    try:
        validate(instance=create_new_transaction, schema=schema)
        
        #! Aktualizácia databázy s novou transakciou
        mongoo_connection.update_one(
            {"cardNumber": user_logined},
            {"$push": {"all_transaction": create_new_transaction}}
        )
         #! Získame existujúce transakcie
        mongoo_connection = connection_to_db()
        allTransaction = mongoo_connection.find_one({"cardNumber": user_logined})
        mytransaction = allTransaction.get("all_transaction", [])
        return {"findError": "false", "message": "Transaction was added!", "Alltransaction": mytransaction}
    except ValidationError as e:
        print("Chyba validácie:", e)
        return {"findError": "true", "message": "Transaction was not added!"}
