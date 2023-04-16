import json
import boto3
import bcrypt


def lambda_handler(event, context):
    
    
    # define the DynamoDB table that Lambda will connect to
    tableName = "authentication_table"
    
    response = {
                'statusCode': 200,
                'body': json.dumps('default me')
                }

    # # create the DynamoDB resource
    dynamo = boto3.resource('dynamodb').Table(tableName)

    
    
    '''Provide an event that contains the following keys:

      - operation: one of the operations in the operations dict below
      - payload: a JSON object containing parameters to pass to the 
                 operation being performed
    '''
    def authenticate(x):
        response['body'] = authenticate_user(x,dynamo)
    
    def create_user(x):
        response['body'] = create_userdata(x,dynamo)
      
    def update_user(x):
        response['body'] = update_userdata(x,dynamo)
      
    
    def echo(x):
        return x

    operation = event['operation']

    operations = {
        'authenticate': authenticate,
        'create_user': create_user,
        'update_user': update_user,
        'echo': echo,
    }


    if operation in operations:
        operations[operation](event.get('payload'))
    else:
        raise ValueError('Unrecognized operation "{}"'.format(operation))

    return response


def authenticate_user(x,dynamo):
    

    userPasswordFromInput = x['password']

    data =  dynamo.get_item(Key = x['Key'])
    
    passwordFromDb = data['Item']['password']
    
    pass_bytes = userPasswordFromInput.encode('utf-8')

    return bcrypt.checkpw(pass_bytes, bytes(passwordFromDb))

    
def create_userdata(x, dynamo):
    
    try:
        user_data = x['Item']
        userPassword = user_data['password']
        
        hash = get_hash(userPassword)
        
        user_data['password'] = hash
        
        dynamo.put_item(Item = user_data)
        
        return True    
    
    except:
        return False
        

def update_userdata(x, dynamo):

    try:
        userPassword = x['AttributeUpdates']['password']['Value']
    
        hash = get_hash(userPassword)
        
        x['AttributeUpdates']['password']['Value'] = hash
        
        dynamo.update_item(**x)
        
        return True
        
    except:
        return False
    
    
def get_hash(password):

    # converting password to array of bytes
    bytes = password.encode('utf-8')
    
    # generating the salt
    salt = bcrypt.gensalt()
        
    # Hashing the password
    hash = bcrypt.hashpw(bytes, salt)
    
    return hash    
