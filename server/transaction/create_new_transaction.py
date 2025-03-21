from pymongo import MongoClient
from jsonschema import validate, ValidationError
from db.db_connection import connection_to_db



def create_new_transaction():
    # Pripojenie k DB
    mongoo_connection = connection_to_db()


    # Nájdeme konkrétny dokument
    allTransaction = mongoo_connection.find_one({"cardNumber": 5317})
    if allTransaction is None:
        print("Nenájdený dokument!")
        return

    # Získame existujúce transakcie
    mytransaction = allTransaction.get("all_transaction", [])
    
    # Schéma pre validáciu
    schema = {
        "type": "object",
        "properties": {
            "create_time": {"type": "string"},
            "type_trns": {"type": "string"},
            "class_trns": {"type": "string"},
            "value_trns": {"type": "integer", "minimum": 0}
        },
        "required": ["create_time", "type_trns","class_trns", "value_trns"]
    }

    # Nová transakcia
    newTransaction = {
        "create_time": "25-5-2025",
        "type_trns": "deduction",
        "class_trns": "hobby",
        "value_trns": 55555555
    }

    # Pridanie transakcie a validácia
    try:
        validate(instance=newTransaction, schema=schema)
        
        # Aktualizácia databázy s novou transakciou
        mongoo_connection.update_one(
            {"cardNumber": 5317},
            {"$push": {"all_transaction": newTransaction}}
        )
        print("Používateľ bol uložený!")
    except ValidationError as e:
        print("Chyba validácie:", e)

    print("Transakcia bola úspešne pridaná!")

# Zavolanie funkcie
create_new_transaction()
