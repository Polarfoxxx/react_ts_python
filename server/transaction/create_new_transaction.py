from pymongo import MongoClient
from jsonschema import validate, ValidationError
from db.db_connection import connection_to_db


def create_new_transaction(newTransaction):
    print(newTransaction)
    #! Pripojenie k DB
    mongoo_connection = connection_to_db()

    #! Nájdeme konkrétny dokument
    allTransaction = mongoo_connection.find_one({"cardNumber": 5317})
    if allTransaction is None:
        print("Nenájdený dokument!")
        return

    #! Získame existujúce transakcie
    mytransaction = allTransaction.get("all_transaction", [])
    
    #! vezmi všetky verejné premenné (atribúty) z objektu newTransaction a premeň ich na slovník (dict).
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
            {"cardNumber": 5317},
            {"$push": {"all_transaction": create_new_transaction}}
        )
        print("Používateľ bol uložený!")
        return {"findError": "false", "message": "Transaction was added!"}
    except ValidationError as e:
        print("Chyba validácie:", e)
    return {"findError": "false", "message": "Transaction was added!"}
