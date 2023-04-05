package scp.project.orderservice.model;

import jakarta.persistence.*;

import java.math.BigInteger;
import java.time.Instant;


//@Entity
//@SqlResultSetMapping(
//        name = "userEntityMapping",
//        classes = {
//                @ConstructorResult(
//                        targetClass = OrderResponse.class,
//                        columns = {
//                                @ColumnResult(name = "campId", type = Integer.class),
//                                @ColumnResult(name = "userCount", type = Byte.class),
//                                @ColumnResult(name = "modifiedAt", type = Instant.class)
//                        }
//                )
//        }
//)
//@NamedNativeQuery(
//        name = "UserEntity.getStatsDTO",
//        query = """
//                SELECT o.id, total_amount , mi.name, mi.price from (SELECT * from scp_project.orders o LIMIT 1) o\s
//                join scp_project.order_line_items oli on (o.id=oli.order_id)\s
//                join scp_project.menu_items mi on (mi.id =oli.menu_id)""",
//        resultSetMapping = "userEntityMapping"
//)
public class OrderResponse {
    Integer id;
    BigInteger total_amount;
    String name;
    BigInteger price;

    public OrderResponse() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigInteger getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(BigInteger total_amount) {
        this.total_amount = total_amount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigInteger getPrice() {
        return price;
    }

    public void setPrice(BigInteger price) {
        this.price = price;
    }


    @Override
    public String toString() {
        return "OrderResponse{" +
                "id=" + id +
                ", total_amount=" + total_amount +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
