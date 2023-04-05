package scp.project.orderservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import scp.project.orderservice.model.OrderLineItem;


@Repository
public interface OrderLineItemRepository extends JpaRepository<OrderLineItem, Integer> {
}
