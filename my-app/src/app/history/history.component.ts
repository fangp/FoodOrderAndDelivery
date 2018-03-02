import {Component, DoCheck, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {order} from "../../models/order.model";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, DoCheck {
  orders: order[] = [];
  constructor(private OrderService: OrderService) {
    this.OrderService.updateHistoryOrder();
  }

  ngOnInit() {
  }

  OnRefresh(){
    this.OrderService.updateHistoryOrder();
  }

  ngDoCheck(){
    if(this.orders!=this.OrderService.getHistoryOrders()){
      this.orders = this.OrderService.getHistoryOrders();
      console.log(this.OrderService.getHistoryOrders());
    }
  }
}
