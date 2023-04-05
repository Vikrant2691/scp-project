package scp.project.orderservice.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_line_items")
public class OrderLineItem {

    @Id
    @GeneratedValue
    Integer id;

    @ManyToOne
    Order order;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "menu_id")
    MenuItem menuItem;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }

    @Override
    public String toString() {
        return "OrderLineItem{" +
                "id=" + id +
                ", order=" + order +
                ", menuItem=" + menuItem +
                '}';
    }
}
