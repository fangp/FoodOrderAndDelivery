import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import { UserService } from "../user.service";
import {user} from "../../models/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/operator/take"
import {DeliveryService} from "../delivery.service";
import {OrderService} from "../order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  LoggedIn = false;
  username = "";
  type = "";
  check: Subscription;
  constructor(private UserService: UserService,
              private user:user,
              private DeliveryService: DeliveryService,
              private OrderService: OrderService,
              private router: Router
              ) {
  }

  ngOnInit() {
    this.check = this.UserService.check().take(1).subscribe(
      (data) =>{
        this.DataHanlder(data)
      },
      (err) =>{
        this.ErrHandler(err)
      }
    );
    //this.LoggedIn = this.UserService.LoggedIn;
  }

  DataHanlder(data){
    console.log(data);
    this.user.update(data.user);
    this.UserService.UserLogin();
    this.LoggedIn = true;
  }

  ErrHandler(err: HttpErrorResponse){

  }
  // ngOnChanges(){
  //   this.username = this.user.getUsername();
  //   this.LoggedIn = this.UserService.LoggedIn;
  //   console.log(this.username+this.LoggedIn)
  // }
  ngDoCheck(){
    if(this.username!=this.user.getUsername())
      this.username = this.user.getUsername();
    if(this.type!=this.user.getUserType())
      this.type = this.user.getUserType();
    if(this.LoggedIn!=this.UserService.getStatus())
      this.LoggedIn = this.UserService.getStatus();
  }

  OnLogout(){
    localStorage.removeItem("currentUser");
    this.username = "";
    this.type = "";
    this.UserService.UserLogout();
    this.DeliveryService.clear();
    this.OrderService.clear();
    this.router.navigate([""]);
  }

}
