
class CookieManager:
    def __init__(self):
        self.cookies = {}

    def set_cookie(self, name, value, max_age=None):
        self.cookies[name] = {
            'value': value,
            'max_age': max_age
        }

    def get_cookie(self, name):
        return self.cookies.get(name, {}).get('value')

    def delete_cookie(self, name):
        if name in self.cookies:
            del self.cookies[name]

    def clear_cookies(self):
        self.cookies.clear()    