package scp.project.orderservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import scp.project.orderservice.model.MenuItem;


@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {
}
