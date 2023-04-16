import json
import boto3

def lambda_handler(event, context):
    
    print(event)
    recieptHandler = event['Records'][0]['receiptHandle']
    
    delivery_sqs = boto3.client('sqs')
    q_response = delivery_sqs.delete_message(QueueUrl="https://sqs.us-east-1.amazonaws.com/902418539019/delivery-queue",
                                             ReceiptHandle=recieptHandler)
                                             
                                             
    
    body = json.loads(event['Records'][0]['body'])
    
    print(body)
    
    id = body["id"]
    email = body["user"]["email"]
    
    tableName = "order_table"
    
    # create the DynamoDB resource
    dynamo = boto3.resource('dynamodb').Table(tableName)
    
    
    update_packet =  {
         "Key": {
             "id": id
         },
         "UpdateExpression":"set orderStatus=:updated",
         "ExpressionAttributeValues":{':updated': 'Out For Delivery'}
     }
    
    response = dynamo.update_item(**update_packet)

    mail_payload= {
                      "from-email": "x21210403@student.ncirl.ie",
                      "from-name": "React Foods",
                      "subject": "Order Status : Out for Delivery",
                      "text-part": "This the order is out for delivery",
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
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
