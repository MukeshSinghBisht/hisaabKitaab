from django.http import JsonResponse
from .models import Item

def get_price(request, item_name):
    try:
        item = Item.objects.get(name=item_name)
        data = {
            'item': item.name,
            'price': str(item.price),
        }
        return JsonResponse(data)
    except Item.DoesNotExist:
        return JsonResponse({'error': 'Item not found'}, status=404)
