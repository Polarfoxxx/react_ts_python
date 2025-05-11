from db.db_connection import connection_to_db
from fastapi import FastAPI, Response, Request
from cookie import *

class AppContext:
    def __init__(self):
        self.areaValue = None  #! napríklad číslo ktoré príde z API

    def set_dialog(self, areaValue, request: Request) -> dict:
        decode_cookie = CookieManager(request).decode_jwt()
        user_logined = decode_cookie.get("cardNumber")
        self.areaValue = areaValue

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
        options = logined_user_object.get("options", {})

        #! Prepíš hodnotu "transaction_area"
        options["transaction_area"] = self.areaValue  # <- nové číslo, ktoré chceš nastaviť

        #! Aktualizuj dokument v databáze
        mongoo_connection.update_one(
            {"cardNumber": user_logined},  # filter
            {"$set": {"options.transaction_area": options["transaction_area"]}}  # aktualizácia
        )


    def get_dialog(self) -> dict:
        return self.areaValue


#! Globálna inštancia
app_context = AppContext()
