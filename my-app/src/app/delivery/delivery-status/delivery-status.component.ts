import {Component, DoCheck, OnInit} from '@angular/core';
import {DeliveryService} from "../../delivery.service";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delivery-status',
  templateUrl: './delivery-status.component.html',
  styleUrls: ['./delivery-status.component.css']
})
export class DeliveryStatusComponent implements OnInit, DoCheck {
  PickedupOrder;
  Pickedup = false;
  constructor(private DeliveryService: DeliveryService,
              private UserService: UserService,
              private router: Router) {
    if(!UserService.getStatus())
      router.navigate([""])
  }

  ngOnInit() {
  }

  ngDoCheck(){
    if(this.Pickedup!=this.DeliveryService.getOrderStatus())
      this.Pickedup = this.DeliveryService.getOrderStatus();
    if(this.PickedupOrder!= this.DeliveryService.getPickedOrder())
      this.PickedupOrder = this.DeliveryService.getPickedOrder();
  }
}
