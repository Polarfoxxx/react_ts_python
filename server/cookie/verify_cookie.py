import jwt
from fastapi import Request

SECRET_KEY = "tvoj_tajny_kluc"
ALGORITHM = "HS256"

def verifycation_cookie(request: Request):
    if "foxxy_accesss_token" in request.cookies:
        token = request.cookies.get("foxxy_accesss_token")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp = payload.get("exp")
        print(exp)
        return {"message": "Cookie verified"}
    return {"message": "Cookie not found"}
   