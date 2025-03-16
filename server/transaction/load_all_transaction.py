from ..db import connection_to_db


async def load_all_transaction():
    print(connection_to_db())

