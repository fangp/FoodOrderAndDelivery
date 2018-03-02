import {Component, OnInit, ViewChild} from '@angular/core';
import {user} from "../../../models/user.model";
import {NgForm} from "@angular/forms";
import {OrderService} from "../../order.service";
import {order} from "../../../models/order.model";
import {UserService} from "../../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild('f') orderForm: NgForm;
  username = "";
  WarningMsg = "";
  constructor(private user:user,
              private OrderService: OrderService,
              private UserService: UserService,
              private router: Router) {
    if(!UserService.getStatus())
      router.navigate([""])
  }

  ngOnInit() {
    this.username = this.user.getUsername();
  }

  OnSubmit(){
    //console.log(1);
    let order: order = {
      username: this.orderForm.value.username,
      description:this.orderForm.value.description,
      address:this.orderForm.value.address,
      contact:this.orderForm.value.contact,
      status: "waiting"
    };
    this.OrderService.placeOrder(order).first().subscribe(
      ()=>{
        return this.OrderService.addToCurrentOders(order);
      },
      ()=>{
        console.log("errors");
        return this.WarningMsg = "errors!"
      }
    );
    this.router.navigate(["order-status"]);
  }

  getDefault(){
    var userdata = this.user.getOrderInfo();
    this.WarningMsg = "";
    this.orderForm.form.patchValue({
      address: userdata.address,
      contact: userdata.contact
    });
  }

  Reset(){
    this.WarningMsg = "";
    this.orderForm.form.patchValue({
      description: "",
      address: "",
      contact: ""
    });
  }

}
