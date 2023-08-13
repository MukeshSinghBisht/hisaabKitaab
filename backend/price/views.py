from django.http import JsonResponse
from .models import Item
import json
import os

def get_item(items, name):
    itemFound = ''
    for item in items:
        print(item)
        if item['name'] == name:
            itemFound = item
    return itemFound

def get_price(request):
    try:

        query = request.GET.get('query')
        print('query=========='+ query)
        file_name = 'items.json'
        full_path = os.path.join(os.getcwd(),'price', file_name)

        with open(full_path) as json_file:
            items = json.load(json_file)
            name = "bhains ka dudh"
            matching_item = get_item(items, name)
        if query is not None:
            # Do something with the 'query' parameter (e.g., fetch price for the item)
            # Replace this with your actual logic for processing the query

            data = {
                'item': 'bhains ka dudh',  # Replace with the actual item name
                'price': matching_item['price'],  # Replace with the actual price value
            }
            return JsonResponse(data)
        else:
            # Return an error response if 'query' parameter is missing
            return JsonResponse({'error': 'Missing query parameter'}, status=400)
    except Item.DoesNotExist:
        return JsonResponse({'error': 'Item not found'}, status=404)
