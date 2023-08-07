from django.http import JsonResponse
from .models import Item

def get_price(request):
    try:
        query = request.GET.get('query')
        print('query=========='+ query)
        
        if query is not None:
            # Do something with the 'query' parameter (e.g., fetch price for the item)
            # Replace this with your actual logic for processing the query

            data = {
                'item': 'gaay ka dudh',  # Replace with the actual item name
                'price': 55,  # Replace with the actual price value
            }
            return JsonResponse(data)
        else:
            # Return an error response if 'query' parameter is missing
            return JsonResponse({'error': 'Missing query parameter'}, status=400)
    except Item.DoesNotExist:
        return JsonResponse({'error': 'Item not found'}, status=404)
