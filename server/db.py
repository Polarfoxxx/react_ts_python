import pymongo
import asyncio

async def connect_to_db(card: int) -> bool:
    client = pymongo.MongoClient("mongodb+srv://suchovskymichal:z1PzyPDoR80XCXKN@cluster0.jhfpd8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client["PythonServer"]
    collection = db["cardNumber"]

    # Spustenie DB operácie v asynchrónnom vlákne
    result = await asyncio.to_thread(collection.find_one)

    if result is not None:
        stored_card_number = result.get("cardNumber")
        return stored_card_number == card
    
    return False
