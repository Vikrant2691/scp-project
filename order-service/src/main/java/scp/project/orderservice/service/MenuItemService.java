package scp.project.orderservice.service;

import org.springframework.stereotype.Service;
import scp.project.orderservice.model.MenuItem;
import scp.project.orderservice.repository.MenuItemRepository;

import java.util.List;


@Service
public class MenuItemService {


    MenuItemRepository menuItemRepository;

    MenuItemService(MenuItemRepository menuItemRepository){
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuItem> getOrders(){
        return menuItemRepository.findAll();
    }

}
