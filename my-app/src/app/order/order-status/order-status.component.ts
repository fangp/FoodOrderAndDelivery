import {Component, DoCheck, OnInit} from '@angular/core';
import {order} from "../../../models/order.model";
import {OrderService} from "../../order.service";

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit, DoCheck {
  orders: order[] = [];
  constructor(private OrderService: OrderService) {
    console.log("build orders");
    this.OnRefresh();
  }

  ngOnInit() {
  }

  OnRefresh(){
    console.log("fresh orders");
    this.OrderService.updateCurrentOrder();
  }

  ngDoCheck(){
    if(this.orders!=this.OrderService.getCurrentOrders())
      this.orders = this.OrderService.getCurrentOrders();
  }
}
