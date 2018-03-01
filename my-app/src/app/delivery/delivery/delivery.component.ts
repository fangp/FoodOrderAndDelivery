import { Component, OnInit } from '@angular/core';
import {DeliveryService} from "../../delivery.service";
import {order} from "../../../models/order.model";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  types = [
    'username',
    'description',
    'address',
    'contact'
  ];
  orders: order[] = [];
  condition:string;
  selectedType:string = 'description';
  constructor(private DeliveryService: DeliveryService) { }

  ngOnInit() {
    this.orders = this.DeliveryService.getCurrentOrders();
  }

  OnChange(){
    //console.log()
    this.orders = this.DeliveryService.getCurrentOrders()
                        .filter((ele)=>{return String(ele[this.selectedType])
                          .indexOf(this.condition)>=0});
  }

  OnRefresh(){
    this.DeliveryService.updateCurrentOrders();
    this.orders = this.DeliveryService.getCurrentOrders();
    this.condition = "";
    this.selectedType = 'description';
  }

}
