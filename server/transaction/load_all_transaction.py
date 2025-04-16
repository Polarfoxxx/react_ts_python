from db.db_connection import connection_to_db
from fastapi import FastAPI, Response, Request
from cookie import *

def load_all_transactions(request: Request):
    decode_cookie = CookieManager(request).decode_jwt()
    user_logined = decode_cookie.get("cardNumber")

    #! Pripojenie k DB
    mongoo_connection = connection_to_db()

    #! Nájdeme konkrétny dokument
    allTransaction = mongoo_connection.find_one({"cardNumber": user_logined})
    if allTransaction is None:
        print("Nenájdený dokument!")
        return
    return allTransaction.get("all_transaction", [])
