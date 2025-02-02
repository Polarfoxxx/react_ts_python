from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Povolenie CORS pre frontend na http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/drm/login")
async def overit(dialog: int = None):
    if dialog is None:
        return {"findNumber": "nok", "message": "Missing 'dialog' parameter"}

    try:
        with open("./card_number_list.txt", "r") as file:
            for line in file:
                if dialog == int(line.strip()):
                    return {"findNumber": "true", "message": "Number is in DB"}
    except ValueError:
        return {"findNumber": "false", "message": "Invalid number format in file"}

    # Ak číslo nebolo nájdené
    return {"findNumber": "nok", "message": "Number not found"}
