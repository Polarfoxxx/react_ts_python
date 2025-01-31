from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Povolenie CORS pre frontend na http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/overit")
async def overit(dialog: str = None):
    if dialog:
        # Spracovanie prijatého čísla
        return {"stav": "úspech", "zadané_číslo": dialog}
    else:
        return {"stav": "chyba", "správa": "Žiadne číslo nebolo zadané"}
