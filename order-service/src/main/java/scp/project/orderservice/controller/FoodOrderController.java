package scp.project.orderservice.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import scp.project.orderservice.model.MenuItem;
import scp.project.orderservice.model.Order;
import scp.project.orderservice.model.OrderResponse;
import scp.project.orderservice.service.MenuItemService;
import scp.project.orderservice.service.OrderService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class FoodOrderController {

    MenuItemService menuItemService;
    OrderService orderService;

    public FoodOrderController(MenuItemService menuItemService, OrderService orderService) {
        this.menuItemService = menuItemService;
        this.orderService = orderService;
    }

    @GetMapping("/menu")
    public ResponseEntity<List<MenuItem>> retrieveOrders() {
        List<MenuItem> menuItems = menuItemService.getOrders();
        menuItems.forEach(System.out::println);
        return ResponseEntity.ok(menuItems);
    }

    @PostMapping(value = "/order", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createOrder(@RequestBody JsonNode payload) {

        orderService.createOrder(payload);

        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/order")
    public ResponseEntity<List<OrderResponse>> retrieveOrder() {

        List<OrderResponse> orderResponse = orderService.retrieveOrder();
        System.out.println(orderResponse);
        return ResponseEntity.of(Optional.of(orderResponse));
    }

}
