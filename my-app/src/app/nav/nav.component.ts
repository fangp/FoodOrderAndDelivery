import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import { UserService } from "../user.service";
import {user} from "../../models/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  LoggedIn = false;
  username = "";
  logout: Subscription;
  check: Subscription;
  constructor(private UserService: UserService,
              private user:user,
              private router: Router) {
  }

  ngOnInit() {
    this.check = this.UserService.check().subscribe(
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
    this.user.update(data.user)
    this.UserService.UserLogin();
    this.LoggedIn = true;
    this.check.unsubscribe();
  }

  ErrHandler(err: HttpErrorResponse){
    this.check.unsubscribe();
  }
  // ngOnChanges(){
  //   this.username = this.user.getUsername();
  //   this.LoggedIn = this.UserService.LoggedIn;
  //   console.log(this.username+this.LoggedIn)
  // }
  ngDoCheck(){
    if(this.username!=this.user.getUsername())
      this.username = this.user.getUsername()
    if(this.LoggedIn!=this.UserService.LoggedIn)
      this.LoggedIn = this.UserService.LoggedIn;
  }

  OnLogout(){
    this.logout = this.UserService.logout().subscribe(
      () =>{
        this.LogoutHandler();
      }
    )
  }

  LogoutHandler(){
    this.user = new user();
    this.UserService.UserLogout;
    console.log(user);
    this.logout.unsubscribe();
    this.router.navigate([""]);
  }

}
