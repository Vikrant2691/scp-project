package scp.project.orderservice.model;


import org.springframework.beans.factory.annotation.Value;

public interface OrderResponses {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.total_amount}")
    String getTotalAmount();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.price}")
    String getPrice();

}
