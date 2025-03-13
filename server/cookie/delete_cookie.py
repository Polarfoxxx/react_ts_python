
def remove_cookie(response):
   response.delete_cookie("foxxy_accesss_token")
   return {"message": "Cookie deleted"}