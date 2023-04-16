from mailjet_rest import Client
import json

def lambda_handler(event, context):
    
    response ={
        'status-code': 200,
        'message' : '',
        'body': [],
        'error': []
    }
    
    
    from_email=event.get('from-email') if event.get('from-email')!="" else response['error'].append("from-email empty")
    from_name=event.get('from-name') if (event.get('from-name') != None) and event.get('from-name')!="" else response['error'].append("from-name empty")
    subject=event.get('subject') if (event.get('subject') != None) and event.get('subject')!="" else response['error'].append("subject empty")
    text_part=event.get('text-part') if (event.get('text-part') != None) and event.get('text-part')!="" else response['error'].append("text-part empty")
    recipients=event.get('recipients') if ((event.get('recipients') != None) and (len(event.get('recipients')) > 0))  else response['error'].append("recipients empty")
    
    if len(response['error']) > 0 :
        response['status-code'] = 400
        response['message'] = 'error in the request'
        return response
    
    
    api_key = '48c2a38330143853a3112f4070ef3bd7'
    api_secret = 'f863de4c59a2efea5bfdf2f4542ac6f1'
    mailjet = Client(auth=(api_key, api_secret))
    data = {
    	'FromEmail': 'x21210403@student.ncirl.ie',
    	'FromName': from_name,
    	'Subject': subject,
    	'Text-part': text_part,
    	'Recipients': recipients
    }
    
    result = mailjet.send.create(data=data)
    print(result.status_code)
    print(result.json())
    
    
    response['body'] = result.json()
    
    if result.status_code == 200 :
        response['status-code'] = result.status_code
        response['message'] = 'lambda execution successful'    
    else :
        response['status-code'] = result.status_code
        response['message'] = 'lambda execution unsuccessful'
        
    
    return response


