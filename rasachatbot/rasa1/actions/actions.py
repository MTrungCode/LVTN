# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action
from rasa_sdk.events import SlotSet
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
class ActionProductPrice(Action):
    def name(self) -> Text:
        return "action_product_price"
    def run(self, dispatcher, tracker, domain):
        import MySQLdb
        db = MySQLdb.connect("localhost", "root", "Admin0474@@)", "goods_export")
        con = db.cursor()
        productName = tracker.get_slot('productname')
        # query = "SELECT pro_price FROM products WHERE pro_name LIKE '%s';" % ("%" + productName + "%")
        query = "SELECT pro_price FROM product WHERE pro_name = '%s';" % (productName)
        con.execute(query)
        if con.execute(query) == 0:
            msg = "Xin lỗi, cửa hàng của chúng tôi không có sản phẩm này."
            dispatcher.utter_message(text=msg)
            return []
        result = con.fetchall()
        not all(result)
        for row in result:
            price = row[0]
            msg = f"Giá của sản phẩm {productName} là {price} đồng"
            dispatcher.utter_message(text=msg)
            return []