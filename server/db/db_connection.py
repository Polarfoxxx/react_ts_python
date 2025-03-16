from pymongo import MongoClient
from dotenv import load_dotenv
import pymongo
import os
load_dotenv() 

def connection_to_db() -> MongoClient:
    # Pripojenie k MongoDB
    client = pymongo.MongoClient(os.getenv("MY_MONGO_CONNECTION_STRING"))
    db = client["PythonServer"]
    collection = db["cardNumber"]
    return collection
