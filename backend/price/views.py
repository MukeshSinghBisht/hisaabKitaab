from django.http import JsonResponse
from .models import Item
import json
import os
from .process_english_sentence import process_english

def get_item(items, name):
    itemFound = None
    for item in items:
        print(item)
        if item['name'] == name:
            itemFound = item
    return itemFound

def get_price(request):
    try:

        query = request.GET.get('query')
        print('query=========='+ query)
        # ===
        queryData = get_query_data(query)
        print('query data',queryData)
        # =====
        file_name = 'items.json'
        full_path = os.path.join(os.getcwd(),'price', file_name)

        with open(full_path) as json_file:
            items = json.load(json_file)
            matching_item = get_item(items, queryData['name'])
            print('mmatching_item',matching_item)
            if matching_item is None:
                return JsonResponse({'error': 'Item not found'}, status=404)
            if query is not None:
                return JsonResponse(matching_item)
            else:
                # Return an error response if 'query' parameter is missing
                return JsonResponse({'error': 'Missing query parameter'}, status=400)
    except Item.DoesNotExist:
        return JsonResponse({'error': 'Item not found'}, status=404)


 # if hinglish words present
# def get_query_data_Old(sentence):
#     # nlp start
#     hinglish_sentence = "ek kilo gay ka dudh"
#     quantities, units, product_names = process_hinglish(hinglish_sentence)

#     print("Quantities:", quantities)
#     print("Units:", units)
#     print("Product Names:", product_names)
#     # nlp ends
#     return json_object

# if english words present only
def get_query_data(sentence):
    # nlp start
    quantity, unit, product_name = process_english(sentence)

    print("Quantities:", quantity)
    print("Units:", unit)
    print("Product Names:", product_name)
    # nlp ends
    json_object = {
        "name": product_name,
        "unit": unit,
        "quantity": quantity
    }
    return json_object

