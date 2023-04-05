package scp.project.orderservice.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.stereotype.Service;
import scp.project.orderservice.model.MenuItem;
import scp.project.orderservice.model.Order;
import scp.project.orderservice.model.OrderLineItem;
import scp.project.orderservice.model.OrderResponse;
import scp.project.orderservice.repository.MenuItemRepository;
import scp.project.orderservice.repository.OrderRepository;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class OrderService {

    MenuItemRepository menuItemRepository;
    OrderRepository orderRepository;

    public OrderService(MenuItemRepository menuItemRepository, OrderRepository orderRepository) {
        this.menuItemRepository = menuItemRepository;
        this.orderRepository = orderRepository;
    }

    public void createOrder(JsonNode payload) {

        ArrayNode orderData = (ArrayNode) payload.get("orderedItems");
        Map<Integer, Integer> orderMap = new HashMap<>();

        orderData.elements().forEachRemaining(e -> orderMap.put(e.get("id").asInt(), e.get("amount").asInt()));

        List<OrderLineItem> orderLineItems = new ArrayList<>();

        AtomicReference<BigInteger> totalAmount = new AtomicReference<>(BigInteger.ZERO);

        orderMap.keySet().forEach(key -> {

            MenuItem menuItem = menuItemRepository.findById(key).orElseThrow();
            totalAmount.updateAndGet(v -> v.add(BigInteger.valueOf(orderMap.get(key))));
            OrderLineItem orderLineItem = new OrderLineItem();
            orderLineItem.setMenuItem(menuItem);
            orderLineItems.add(orderLineItem);
        });

        Order order = new Order();

        order.setOrderLineItems(orderLineItems);

        order.getOrderLineItems()
                .forEach(orderLineItem ->
                        orderLineItem.setOrder(order));


        order.setTotalAmount(totalAmount.get());

        orderRepository.save(order);

        System.out.println(orderMap);


    }


    public List<OrderResponse> retrieveOrder() {

//        return orderRepository.getOrderResponse();
        return null;

    }
}
