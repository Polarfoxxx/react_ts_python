# context.py
class AppContext:
    def __init__(self):
        self.areaValue = None  # napríklad číslo ktoré príde z API

    def set_dialog(self, areaValue: int):
        self.areaValue = areaValue

    def get_dialog(self) -> int:
        return self.areaValue


# Globálna inštancia
app_context = AppContext()
