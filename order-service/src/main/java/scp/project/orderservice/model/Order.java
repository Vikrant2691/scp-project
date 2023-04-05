package scp.project.orderservice.model;


import jakarta.persistence.*;

import java.math.BigInteger;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue
    Integer id;

    @OneToMany(cascade = CascadeType.ALL)
    List<OrderLineItem> orderLineItems;

    BigInteger totalAmount;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<OrderLineItem> getOrderLineItems() {
        return orderLineItems;
    }

    public void setOrderLineItems(List<OrderLineItem> orderLineItems) {
        this.orderLineItems = orderLineItems;
    }

    public BigInteger getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigInteger totalAmount) {
        this.totalAmount = totalAmount;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", orderLineItems=" + orderLineItems +
                ", totalAmount=" + totalAmount +
                '}';
    }
}
