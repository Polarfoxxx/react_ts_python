from db.db_connection import connection_to_db
from fastapi import FastAPI, Response

def load_all_transactions():
    mongoo_connection = connection_to_db()

    # Nájdeme konkrétny dokument
    allTransaction = mongoo_connection.find_one({"cardNumber": 5317})
    if allTransaction is None:
        print("Nenájdený dokument!")
        return
    return allTransaction.get("all_transaction", [])
