import json
import psycopg2
from datetime import datetime

# import spacy
# from spacy.matcher import Matcher
# from .process_english_sentence import process_english

import os
# from supabase import create_client

def serialize_datetime(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    return str(obj)

def list(event, context):
    if "queryStringParameters" in event:
        # Access query parameters
        query_params = event["queryStringParameters"]
        
        # Check if specific parameter exists
        param_value = query_params.get("query")
        # queryData = get_query_data(param_value)
        # Your logic here based on the query parameters
        supabase_url = "https://olsuhufpdhrjxiobqvxm.supabase.co"
        supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc3VodWZwZGhyanhpb2JxdnhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDYxNzI4NywiZXhwIjoyMDEwMTkzMjg3fQ.tsnJE08B-Miobofboo4vobJ7QtW2ORY31FqhHKRZ014"

        # Create a Supabase client
        supabase = create_client(supabase_url, supabase_key)

        # Sample PostgreSQL query
        sql = "SELECT * FROM item"

        # Execute the query
        response = supabase.table('item').select("*").execute()

        # Access the results
        # data = response.get("data", [])
        # print("Query result:", data)

        # Your business logic here...

        lambda_response = {
        'statusCode': 200,
        'body':json.dumps({
            'message': 'Lambda function executed successfully',
            'data': response.data,
            'count': response.count
        }),
    }

    return lambda_response
def getPrice(event, context):
    try:
        if "queryStringParameters" in event:
            query_params = event["queryStringParameters"]
            param_value = query_params.get("query")
            # queryData = get_query_data(param_value)
            # Your logic here based on the query parameters
            db_params = {
                'host': 'db.olsuhufpdhrjxiobqvxm.supabase.co',
                'port': '5432',
                'user': 'postgres',
                'password': 'bZh663@d4%Zc9yS',
                'database': 'postgres'
            }

            connection = psycopg2.connect(**db_params)

            # Create a cursor to interact with the database
            cursor = connection.cursor()
            # query = "SELECT * FROM item"
            query = "SELECT * FROM item WHERE similarity(name, %s) > 0.6;"
            cursor.execute(query, (param_value,))
            raw = cursor.fetchall()
            resp = []
            for line in raw:
                resp.append(line)
            converted_data = [
                {
                    "id": item[0],
                    "created_at": item[1],
                    "name": item[2],
                    "price": item[3],
                    "unit": item[4],
                    "image_url": item[5]
                }
                for item in resp
            ]
            lambda_response = {
                'statusCode': 200,
                'body':json.dumps(converted_data, default=serialize_datetime),
                 "headers": {
                    "Content-Type": "application/json"
                }
            };
            print("Response Data:", lambda_response)
        return lambda_response
    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal Server Error'}),
        }