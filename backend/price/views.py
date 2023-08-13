from django.http import JsonResponse
from .models import Item
import json
import os
import spacy
from langdetect import detect
from googletrans import Translator
import re

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
        # ===
        queryData = get_query_data(query)
        print('query data',queryData)
        # =====
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

def extract_amount_unit_rest(sentence):
        nlp = spacy.load("en_core_web_sm")
        doc = nlp(sentence)
        
        amount2 = None
        unit = None
        rest = None
        
        for token in doc:
            if token.like_num and amount2 is None:
                amount2 = token.text
            elif token.text.lower() in ["kg", "g", "lbs", "pounds", "oz", "ml", "l", "liter", "litre"]:
                unit = token.text
                rest = " ".join([t.text for t in doc[token.i + 1:]])
                break
        print('amount',amount2, 'unit',unit, 'rest',rest)
        return amount2, unit, rest

def get_query_data(sentence):
    # itemFound = {
    #     amount: '',
    #     unit: '',
    #     productName: ''
    # }
    json_object = {
    "name": "John",
    "age": 30,
    "city": "New York"
    }
    possibleAmount = []

    # detect language and convert to english
        # Example Hinglish sentence
    # hinglish_sentence = "Mujhe 5 apples aur 2 bananas chahiye."
    hinglish_sentence = sentence;

    # Convert Hinglish to English
    english_sentence = convert_hinglish_to_english(hinglish_sentence)
    print("English Sentence:", english_sentence)

    # Extract numeric characters
    numeric_characters = extract_numeric_characters(english_sentence)
    print("Numeric Characters:", numeric_characters)
    

    

    # Example sentence
    # sentence = "I bought 2.5 kilograms of bananas."

    # Extract amount, unit, and rest from the sentence
    amount1, unit, rest = extract_amount_unit_rest(sentence)

    print("Amount:", amount1)
    print("Unit:", unit)
    print("Rest:", rest)
    return json_object



def convert_hinglish_to_english(sentence):
    translator = Translator()

    # Tokenize the sentence and detect language for each token
    tokens = sentence.split()
    translated_tokens = []

    for token in tokens:
        lang = detect(token)
        if lang == 'hi':
            translated_token = translator.translate(token, src='hi', dest='en').text
            translated_tokens.append(translated_token)
        else:
            translated_tokens.append(token)

    # Reconstruct the sentence from translated tokens
    translated_sentence = ' '.join(translated_tokens)

    return translated_sentence

def extract_numeric_characters(sentence):
    numeric_characters = re.findall(r'\d+', sentence)
    return numeric_characters

