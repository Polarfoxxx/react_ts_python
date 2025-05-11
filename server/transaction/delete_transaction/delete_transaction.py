from cookie import *
from db.db_connection import connection_to_db


def delete_transaction(delete_transaction, request):
    decode_cookie = CookieManager(request).decode_jwt()
    user_logined = decode_cookie.get("cardNumber")

    if not user_logined:
        return {"status": "error", "message": "no user logined"}
    
    if not delete_transaction.transaction_id:
        return {"status": "error", "message": "transaction_id is required"}
     
    try:
        mongoo_connection = connection_to_db()

        #! Nájdeme konkrétny dokument
        logined_user_object = mongoo_connection.find_one({"cardNumber": user_logined})
        if logined_user_object is None:
            print("Nenájdený dokument!")
            return
        mytransaction = logined_user_object.get("all_transaction", [])
        #! Odstránenie transakcie
        transaction_id = delete_transaction.transaction_id
        transaction_to_delete = next((tr for tr in mytransaction if tr["id"] == transaction_id), None)
        if transaction_to_delete:
            #! Odstránenie transakcie z databázy
            mongoo_connection.update_one(
                {"cardNumber": user_logined},
                {"$pull": {"all_transaction": {"id": transaction_id}}}
            )
            return {"status": "ok", "message": "Transaction deleted successfully!"}
        else:
            return {"status": "error", "message": "Transaction not found!"}
        
    

    except Exception as e:
        return {"status": "error", "message": str(e)}