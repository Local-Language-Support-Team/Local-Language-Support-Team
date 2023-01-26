from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
from rasa_sdk.events import FollowupAction
from rasa_sdk.events import BotUttered
import sqlite3
import base64

# change this to the location of your SQLite file
path_to_db = "actions/example.db"
path_to_new_db = "actions/convo-commerce.db"


class ActionProductSearch(Action):
    def name(self) -> Text:
        return "action_product_search"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        # connect to DB
        connection = sqlite3.connect(path_to_new_db)
        cursor = connection.cursor()

        # get slots and save as tuple
        prod_category_slot = tracker.get_slot("productCategory")
        prod_name_slot = tracker.get_slot("productName")
        prod = [("%" + str(prod_category_slot) + "%"),
                ("%" + str(prod_name_slot) + "%"),
                ("%" + str(prod_name_slot) + "%")]
        products_query = "SELECT ProdImg,ProdName,ProdCategory,InventorySize FROM products"

        print(f"Query: {products_query}; Category: {prod_category_slot}, Name:{prod_name_slot}")
        if prod_category_slot is None and prod_name_slot is None:
            cursor.execute(products_query)
            r = str([dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]).replace("'", '"')
        else:    
            cursor.execute(
                products_query + " WHERE ProdCategory like (?) or ProdName like (?) or Tags like (?) ",
                tuple(prod))
            r = str([dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]).replace("'", '"')
        
        dispatcher.utter_message(template="utter_in_stock", data=r)
        connection.close()
        slots_to_reset = ["productCategory","productName"]
        return [SlotSet(slot, None) for slot in slots_to_reset]


class ActionProductSearchFilter(Action):
    def name(self) -> Text:
        return "action_product_filter"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        # connect to DB
        connection = sqlite3.connect(path_to_new_db)
        cursor = connection.cursor()

        # get slots and save as tuple
        # prod_category_slot = tracker.get_slot("productCategory")
        # prod_name_slot = tracker.get_slot("productName")

        prod_category_slot = next(tracker.get_latest_entity_values("productCategory"), None)
        prod_name_slot = next(tracker.get_latest_entity_values("productName"), None)
        prod_inventory_size = next(tracker.get_latest_entity_values('number'), None)

        prod = [("%" + str(prod_category_slot) + "%"),
                ("%" + str(prod_name_slot) + "%"),
                ("%" + str(prod_name_slot) + "%"),
                (str(prod_inventory_size)),]
        products_query = "SELECT ProdImg,ProdName,ProdCategory,InventorySize FROM products"

        print(f"Query: {products_query}; Category: {prod_category_slot}, Name:{prod_name_slot}")
        if prod_category_slot is None and prod_name_slot is None:
            cursor.execute(products_query)
            r = str([dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]).replace("'", '"')
            dispatcher.utter_message(template="utter_no_stock")
        else:    
            cursor.execute(
                products_query + " WHERE (ProdCategory like (?) or ProdName like (?) or Tags like (?) AND InventorySize >= (?))",
                tuple(prod))
            r = str([dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]).replace("'", '"')
            dispatcher.utter_message(template="utter_in_stock", data=r)
        
        
        connection.close()
        slots_to_reset = ["productCategory","productName"]
        return [SlotSet(slot, None) for slot in slots_to_reset]


class ActionOrderSearchFilter(Action):
    def name(self) -> Text:
        return "action_order_filter"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        # connect to DB
        connection = sqlite3.connect(path_to_new_db)
        cursor = connection.cursor()

        # get slots and save as tuple
        prod_category_slot = tracker.get_slot("productCategory")
        prod_name_slot = tracker.get_slot("productName")
        prod_inventory_size = next(tracker.get_latest_entity_values('number'), None)

        prod = [("%" + str(prod_category_slot) + "%"),
                ("%" + str(prod_name_slot) + "%"),
                ("%" + str(prod_name_slot) + "%"),
                (str(prod_inventory_size)),]
        products_query = "SELECT ProdImg,ProdName,ProdCategory,InventorySize FROM products"

        print(f"Query: {products_query}; Category: {prod_category_slot}, Name:{prod_name_slot}")
        if prod_category_slot is None and prod_name_slot is None:
            dispatcher.utter_message(template="utter_no_stock")
            # r = str([dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]).replace("'", '"')
        else:    
            cursor.execute(
                products_query + " WHERE (ProdCategory like (?) or ProdName like (?) or Tags like (?) AND InventorySize <= (?))",
                tuple(prod))
            r = str([dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]).replace("'", '"')
            dispatcher.utter_message(template="utter_in_stock", data=r)
        
        
        connection.close()
        slots_to_reset = ["productCategory","productName"]
        return [SlotSet(slot, None) for slot in slots_to_reset]


class ActionProductAdd(Action):
    def name(self) -> Text:
        return "action_product_add"

    def run(
            self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        # connect to DB
        connection = sqlite3.connect(path_to_new_db)
        cursor = connection.cursor()

        # get slots and save as tuple
        # prod_inventory_size = tracker.get_slot("inventorySize")
        prod_inventory_size = next(tracker.get_latest_entity_values('number'), None)
        prod_name_slot = tracker.get_slot("productName")

        prod = [(str(prod_inventory_size)), ("%" + str(prod_name_slot) + "%")]

        cursor.execute("SELECT ProdName FROM products WHERE ProdName like (?)",
                       tuple(("%" + str(prod_name_slot) + "%", )))
        data_row = cursor.fetchone()

        if data_row:
            cursor.execute("update products set InventorySize = InventorySize + (?) where ProdName like (?)",
                           tuple(prod))
            connection.commit()
            print("UPDATING", tuple(prod))
            cursor.execute("select ProdName,InventorySize from products where ProdName like (?)",
                           tuple(("%" + str(prod_name_slot) + "%",)))
            r = str([dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in
                     cursor.fetchall()]).replace("'", '"')
        else:
            cursor.execute("insert into products (InventorySize, ProdName) values (?,?)",
                           tuple(prod))
            connection.commit()
            cursor.execute("select ProdName, InventorySize from products where ProdName like (?)",
                           tuple(("%" + str(prod_name_slot) + "%",)))
            r = str([dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in
                     cursor.fetchall()]).replace("'", '"')
            print("UPDATING", tuple(prod), r)

        dispatcher.utter_message(template="utter_add_stock", pdata=r)
        connection.close()
        slots_to_reset = ["inventorySize", "productName"]
        return [SlotSet(slot, None) for slot in slots_to_reset]


class SurveySubmit(Action):
    def name(self) -> Text:
        return "action_survey_submit"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(template="utter_open_feedback")
        dispatcher.utter_message(template="utter_survey_end")
        return [SlotSet("survey_complete", True)]


class OrderStatus(Action):
    def name(self) -> Text:
        return "action_order_status"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        # connect to DB
        connection = sqlite3.connect(path_to_new_db)
        cursor = connection.cursor()

        # name = tracker.get_slot("name")
        name = next(tracker.get_latest_entity_values('name'), None)

        prod = [("%" + str(name) + "%")]

        print("person name", name)

        if name is not None:
            cursor.execute("SELECT CustomerName,Area,Status FROM orders WHERE CustomerName like (?)", prod)
            r = str([dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in
                     cursor.fetchall()]).replace("'", '"')
            dispatcher.utter_message(template="utter_order_status", status=r)

            connection.close()
            slots_to_reset = ["name"]
            return [SlotSet(slot, None) for slot in slots_to_reset]
        else:
            # db didn't have an entry with this email
            cursor.execute("SELECT CustomerName,Area,Status FROM orders")
            r = str([dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in
                     cursor.fetchall()]).replace("'", '"')

            dispatcher.utter_message(template="utter_order_status", status=r)
            connection.close()
            slots_to_reset = ["name"]
            return [SlotSet(slot, None) for slot in slots_to_reset]


class CancelOrder(Action):
    def name(self) -> Text:
        return "action_cancel_order"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        # connect to DB
        connection = sqlite3.connect(path_to_db)
        cursor = connection.cursor()

        # get email slot
        order_email = (tracker.get_slot("email"),)

        # retrieve row based on email
        cursor.execute("SELECT * FROM orders WHERE order_email=?", order_email)
        data_row = cursor.fetchone()

        if data_row:
            # change status of entry
            status = [("cancelled"), (tracker.get_slot("email"))]
            cursor.execute("UPDATE orders SET status=? WHERE order_email=?", status)
            connection.commit()
            connection.close()

            # confirm cancellation
            dispatcher.utter_message(template="utter_order_cancel_finish")
            return []
        else:
            # db didn't have an entry with this email
            dispatcher.utter_message(template="utter_no_order")
            connection.close()
            return []


class ReturnOrder(Action):
    def name(self) -> Text:
        return "action_return"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        # connect to DB
        connection = sqlite3.connect(path_to_db)
        cursor = connection.cursor()

        # get email slot
        order_email = (tracker.get_slot("email"),)

        # retrieve row based on email
        cursor.execute("SELECT * FROM orders WHERE order_email=?", order_email)
        data_row = cursor.fetchone()

        if data_row:
            # change status of entry
            status = [("returning"), (tracker.get_slot("email"))]
            cursor.execute("UPDATE orders SET status=? WHERE order_email=?", status)
            connection.commit()
            connection.close()

            # confirm return
            dispatcher.utter_message(template="utter_return_finish")
            return []
        else:
            # db didn't have an entry with this email
            dispatcher.utter_message(template="utter_no_order")
            connection.close()
            return []


class GiveName(Action):
    def name(self) -> Text:
        return "action_give_name"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        evt = BotUttered(
            text = "my name is bot? idk", 
            metadata = {
                "nameGiven": "bot"
            }
        )

        return [evt]

class OpenScanner(Action):
    def name(self) -> Text:
        return "action_open_scanner"

    def run(
            self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        with open("actions/scanner.png", "rb") as image_file:
            image = base64.b64encode(image_file.read()).decode('utf-8')

        dispatcher.utter_message(image)
        return []

class SayAmount(Action):
    def name(self) -> Text:
        return "action_say_amount"

    def run(
            self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        with open("actions/money.png", "rb") as image_file:
            image = base64.b64encode(image_file.read()).decode('utf-8')

        dispatcher.utter_message(image)
        return []

class AccountSelection(Action):
    def name(self) -> Text:
        return "action_select_account"

    def run(
            self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        with open("actions/chooseAcc.png", "rb") as image_file:
            image = base64.b64encode(image_file.read()).decode('utf-8')

        dispatcher.utter_message(image)
        return []

class AddRemarks(Action):
    def name(self) -> Text:
        return "action_add_remarks"

    def run(
            self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        with open("actions/remarks.png", "rb") as image_file:
            image = base64.b64encode(image_file.read()).decode('utf-8')

        dispatcher.utter_message(image)
        return []

class AddToFavourites(Action):
    def name(self) -> Text:
        return "action_add_to_favourites"

    def run(
            self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        with open("actions/addfav.png", "rb") as image_file:
            image = base64.b64encode(image_file.read()).decode('utf-8')

        dispatcher.utter_message(image)
        return []

class MakePayment(Action):
    def name(self) -> Text:
        return "action_make_payment"

    def run(
            self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        with open("actions/pay.png", "rb") as image_file:
            image = base64.b64encode(image_file.read()).decode('utf-8')

        dispatcher.utter_message(image)
        return []