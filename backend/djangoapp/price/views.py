from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from .process_english_sentence import process_english
from django.db import connection
import json
import logging

allitems = [
{
    "id": 1,
    "name": "cow milk",
    "price": 55,
    "unit": "l"
},
{
    "id": 2,
    "name": "buffalo milk",
    "price": 65,
    "unit": "l"
},
{
    "id": 3,
    "name": "curd",
    "price": 100,
    "unit": "kg"
},
{
    "id": 4,
    "name": "cheese",
    "price": 340,
    "unit": "kg"
}
]
def get_item(items, name):
    # itemFound = None
    # for item in items:
    #     logging.info(item['name'])
    #     if item['name'] == name:
    #         itemFound = item
    with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM item WHERE name = %s', (name,))
            item = cursor.fetchone()
            # logging.info('item from supbase',item)
    _id, created_at, name, price, unit, image_url = item
    json_item = {
        'id': _id,
        'created_at': created_at.strftime('%Y-%m-%d %H:%M:%S') if created_at else None,
        'name': name,
        'price': float(price) if price is not None else None,
        'unit': unit,
        'image_url': image_url,
    }
    # logging.info('json_item from supbase',json_item)

    return json_item

def get_price(request):
    try:

        query = request.GET.get('query')
        logging.info('query========== %s', query)
        # ===
        queryData = get_query_data(query)
        # logging.info('query data',queryData)
        # =====
        items = allitems
        matching_item = get_item(items, queryData['name'])
        # logging.info('mmatching_item',matching_item)
        if matching_item is None:
            return JsonResponse({'error': 'Item not found'}, status=404)
        if query is not None:
            return JsonResponse(matching_item)
        else:
            # Return an error response if 'query' parameter is missing
            return JsonResponse({'error': 'Missing query parameter'}, status=400)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Item not found'}, status=404)


 # if hinglish words present
# def get_query_data_Old(sentence):
#     # nlp start
#     hinglish_sentence = "ek kilo gay ka dudh"
#     quantities, units, product_names = process_hinglish(hinglish_sentence)

#     logging.info("Quantities:", quantities)
#     logging.info("Units:", units)
#     logging.info("Product Names:", product_names)
#     # nlp ends
#     return json_object

# if english words present only
def get_query_data(sentence):
    # nlp start
    quantity, unit, product_name = process_english(sentence)

    # logging.info("Quantities:", quantity)
    # logging.info("Units:", unit)
    # logging.info("Product Names:", product_name)
    # nlp ends
    json_object = {
        "name": product_name,
        "unit": unit,
        "quantity": quantity
    }
    return json_object

def get_items(request):
    try:
        # items = allitems
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM item')
            items = cursor.fetchall()
        json_array = []

        for row in items:
            item = {
                'id': row[0],           # Replace with your actual column names
                'created_at': row[1],
                'name': row[2],
                'price': row[3],
                'unit': row[4],
                'image_url': row[5],
                # Add more key-value pairs as needed
            }
            json_array.append(item)
        if items is not None:
            response_data = {'data': json_array}
            return JsonResponse(response_data)
        else:
            # Return an error response if 'query' parameter is missing
                return JsonResponse({'error': 'Items not found'}, status=404)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Items not found'}, status=404)