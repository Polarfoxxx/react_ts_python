import pymongo
import asyncio
import os
from dotenv import load_dotenv, dotenv_values 
load_dotenv() 

async def connect_to_db(card: int) -> bool:
    client = pymongo.MongoClient(os.getenv("MY_MONGO_CONNECTION_STRING"))
    db = client["PythonServer"]
    collection = db["cardNumber"]

    # Spustenie DB operácie v asynchrónnom vlákne
    result = await asyncio.to_thread(collection.find_one)

    if result is not None:
        stored_card_number = result.get("cardNumber")
        return stored_card_number == card
    return False
