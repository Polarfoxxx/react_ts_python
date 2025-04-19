from db.db_connection import connection_to_db
from fastapi import FastAPI, Response, Request
from cookie import *

def load_all_transactions(request: Request):
    decode_cookie = CookieManager(request).decode_jwt()
    user_logined = decode_cookie.get("cardNumber")

    #! Pripojenie k DB podmienka
    if user_logined is None:
        print("Nie je pripojený žiadny užívateľ!")
        return
    mongoo_connection = connection_to_db()

    #! Nájdeme konkrétny dokument
    logined_user_object = mongoo_connection.find_one({"cardNumber": user_logined})
    if logined_user_object is None:
        print("Nenájdený dokument!")
        return
    return logined_user_object.get("all_transaction", [])
