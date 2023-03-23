package scp.project.orderservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import scp.project.orderservice.service.QueueService;

@RestController
public class HelloController {

    @Autowired
    QueueService queueService;


    @GetMapping("/hello")
    String getHello(){
        return "Hello World";
    }

    @GetMapping("/sendMessage")
    void getSendMessage(){
        queueService.sendMessage();
    }


}
