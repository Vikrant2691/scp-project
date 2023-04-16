import json
import boto3
import requests


def lambda_handler(event, context):
    # TODO implement
    
    # define the DynamoDB table that Lambda will connect to
    tableName = "order_table"
    
    # create the DynamoDB resource
    dynamo = boto3.resource('dynamodb').Table(tableName)
    
    
    print("event:")
    print(event)
    
    order_status = 'Submitted'
    payment_status = True
    status_code = 200
    request_data = event.get("Item")
    
    card_holder = request_data['user']['name']
    card_number = request_data['user']['cardNumber']
    print('card_number')
    print(request_data)
    end_date = request_data['user']['endDate']
    cvv = request_data['user']['cvv']

    url = 'https://xggk9jqpj0.execute-api.eu-west-1.amazonaws.com/payment'
    myobj = {
            'CARD_NUMBER': card_number,
            'CARD_HOLDER': card_holder,
            'END_DATE': end_date,
            'CVV': cvv,
            'AMT': '10'
            }
    
    print('myobj')
    print(myobj)
    
    x = requests.post(url, json = myobj)
    response = x.json()
    status_code = response['RESPONSE_CODE']
    if status_code != 200 :
        
        order_status ='Payment Declined'
        payment_status = False
           
        
    
    order_data = {
        "id" : request_data["id"],
        "order" : request_data["orderedItems"],
        "orderStatus" : order_status
        }
    
    print(order_data)
    
    

    
    from decimal import Decimal
    request_data = json.loads(json.dumps(request_data), parse_float=Decimal)
    
    print(request_data)

    email = request_data['user']['email']
    
    request_data['orderStatus'] = order_status
    
    print(request_data)

    response_data = dynamo.put_item(Item = request_data)

    if payment_status:
        sqs = boto3.client('sqs')
        sqs.send_message(
            QueueUrl="https://sqs.us-east-1.amazonaws.com/902418539019/order-queue",
            MessageBody=json.dumps(order_data)
        )
        mail_payload= {
                      "from-email": "x21210403@student.ncirl.ie",
                      "from-name": "React Foods",
                      "subject": "Order Status : Submitted",
                      "text-part": "This the order is now submitted",
                      "recipients": [
                        {
                          "Email": email
                        }
                      ]
                    }
    else :
        mail_payload= {
                      "from-email": "x21210403@student.ncirl.ie",
                      "from-name": "React Foods",
                      "subject": "Order Status : Payment Declined",
                      "text-part": "Payment Delined... Please try again",
                      "recipients": [
                        {
                          "Email": email
                        }
                      ]
                    }
    
    
    
    lambda_client = boto3.client('lambda', region_name="us-east-1",)
    lambda_client.invoke(
        FunctionName="email-service",
        InvocationType='Event',
        Payload=json.dumps(mail_payload)
        )
        
    return {
        'statusCode': status_code,
        'body': json.dumps(order_data)
    }
