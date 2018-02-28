import {Component, OnInit, ViewChild} from '@angular/core';
import {user} from "../../../models/user.model";
import {NgForm} from "@angular/forms";
import {OrderService} from "../../order.service";
import {order} from "../../../models/order.model";

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.css']
})
export class OrderPlaceComponent implements OnInit {
  @ViewChild('f') orderForm: NgForm;
  username = "";
  WarningMsg = "";
  constructor(private user:user,
              private OrderService: OrderService) { }

  ngOnInit() {
    this.username = this.user.getUsername();
  }

  OnSubmit(){
    console.log(1);
    console.log(this.orderForm);
    let order: order = {
      username: this.orderForm.value.username,
      description:this.orderForm.value.description,
      address:this.orderForm.value.address,
      contact:this.orderForm.value.contact,
      status: "waiting"
    };
    this.OrderService.placeOrder(order).take(1).subscribe(
      ()=>{
        this.OrderService.addToCurrentOders(order);
      },
      ()=>{
        this.WarningMsg = "errors!"
      }
    );
  }

  getDefault(){
    var userdata = this.user.getOrderInfo();
    this.orderForm.form.patchValue({
      address: userdata.address,
      contact: userdata.contact
    });
  }

  Reset(){
    this.orderForm.form.patchValue({
      description: "",
      address: "",
      contact: ""
    });
  }

}
