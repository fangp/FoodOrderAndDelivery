import {Component, DoCheck, OnInit} from '@angular/core';
import {DeliveryService} from "../../delivery.service";
import {order} from "../../../models/order.model";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit, DoCheck {

  types = [
    'username',
    'description',
    'address',
    'contact'
  ];
  CurrentOrders: order[] = [];
  orders: order[] = [];
  condition:string;
  selectedType:string = 'description';
  pickedup:boolean = false;
  constructor(private DeliveryService: DeliveryService,
              private router: Router,
              private UserService: UserService) {
    if(!UserService.getStatus())
      router.navigate([""])
    this.DeliveryService.updateCurrentOrders();

  }

  ngOnInit() {

  }

  OnChange(){
    //console.log()
    if(this.condition)
      this.orders = this.CurrentOrders
                        .filter((ele)=>{return String(ele[this.selectedType])
                          .indexOf(this.condition)>=0});
    else
      this.orders = this.CurrentOrders;
  }

  OnRefresh(){
    this.DeliveryService.updateCurrentOrders();
    this.condition = null;
    this.selectedType = 'description';
    //console.log(this.DeliveryService.getCurrentOrders())
  }

  ngDoCheck(){
    if(this.pickedup!=this.DeliveryService.getOrderStatus())
      this.pickedup = this.DeliveryService.getOrderStatus();
    if(this.CurrentOrders!=this.DeliveryService.getCurrentOrders()){
      this.CurrentOrders = this.DeliveryService.getCurrentOrders();
      this.OnChange();
    }
  }

}
