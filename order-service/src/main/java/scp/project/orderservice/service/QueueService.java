package scp.project.orderservice.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.CreateQueueRequest;
import com.amazonaws.services.sqs.model.MessageAttributeValue;
import com.amazonaws.services.sqs.model.SendMessageRequest;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

//@Service
public class QueueService {

    AmazonSQS sqs;
    String standardQueueUrl;

    QueueService(){

        // Set up the client
        this.sqs = AmazonSQSClientBuilder.standard()
//                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.US_EAST_1)
                .build();

        // Create a standard queue

        CreateQueueRequest createStandardQueueRequest = new CreateQueueRequest("baeldung-queue");
        this.standardQueueUrl = sqs.createQueue(createStandardQueueRequest)
                .getQueueUrl();
    }

    public void sendMessage(){

        Map<String, MessageAttributeValue> messageAttributes = new HashMap<>();

        messageAttributes.put("AttributeOne", new MessageAttributeValue().withStringValue("This is an attribute")
                .withDataType("String"));

        SendMessageRequest sendMessageStandardQueue = new SendMessageRequest().withQueueUrl(standardQueueUrl)
                .withMessageBody("A simple message.")
                .withDelaySeconds(30) // Message will arrive in the queue after 30 seconds. We can use this only in standard queues
                .withMessageAttributes(messageAttributes);
    }




}
