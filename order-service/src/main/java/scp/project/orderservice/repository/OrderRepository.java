package scp.project.orderservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import scp.project.orderservice.model.Order;
import scp.project.orderservice.model.OrderResponse;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {


//    @Query(value = """
//            SELECT o.id, total_amount , mi.name, mi.price from (SELECT * from scp_project.orders o LIMIT 1) o\s
//            join scp_project.order_line_items oli on (o.id=oli.order_id)\s
//            join scp_project.menu_items mi on (mi.id =oli.menu_id)""", nativeQuery = true)
//    List<OrderResponse> getOrderResponse();


}
