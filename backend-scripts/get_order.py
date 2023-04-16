import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    
    # define the DynamoDB table that Lambda will connect to
    tableName = "order_table"
    
    # create the DynamoDB resource
    dynamo = boto3.resource('dynamodb').Table(tableName)

    response_data = dynamo.scan()
    
    order_items = response_data['Items']
    
    max_id = 0
    max_date = 0

    print(order_items)

    for item in order_items:
        if item['date']>max_date:
            max_id = item['id']
            max_date = item['date']
    
    filtered_list = list(filter(lambda order_item: order_item['date'] == max_date, order_items))

    
    return {
        'statusCode': 200,
        'body': filtered_list
    }
