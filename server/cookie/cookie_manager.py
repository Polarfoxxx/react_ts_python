from fastapi import Request, Response
import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "tvoj_tajny_kluc"
ALGORITHM = "HS256"

class CookieManager():
    def __init__(self, request: Request):
        self.request_cookies = request

    def decode_jwt(self):
        if "foxxy_accesss_token" in self.request_cookies.cookies:
            token = self.request_cookies.cookies.get("foxxy_accesss_token")
            decoded_token = jwt.decode(token, "tvoj_tajny_kluc", algorithms=["HS256"])
            return decoded_token
        return None

    def verifycation_cookie(self):
        if "foxxy_accesss_token" in self.request_cookies.cookies:
            token = self.request_cookies.cookies.get("foxxy_accesss_token")
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            exp = payload.get("exp")
            if exp:
                #! Check if the token is expired
                if datetime.fromtimestamp(exp, timezone.utc) < datetime.now(timezone.utc): 
                    return {"message": "Cookie expired"}
                else:
                    return {"message": "Cookie verified"}
            else:
                return {"message": "Cookie not found"}
        return {"message": "Cookie not found"}

    def delete_cookie(self,):
        self.request_cookies.delete_cookie("foxxy_accesss_token")
        return {"message": "Cookie deleted"}
