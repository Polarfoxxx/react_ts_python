from ..db import *  # ✅ Absolútny import


def load_all_transaction():
    print(connection_to_db())

load_all_transaction()