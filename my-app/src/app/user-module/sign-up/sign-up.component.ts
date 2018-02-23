import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import {user} from "../../../models/user.model";
import {UserService} from "../../user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  roles = [
    "customer",
    "dirver",
    "both",
    "other"
  ]
  WarningMsg = "";
  signup: Subscription;
  constructor(private user: user,
              private UserService: UserService,
              private router: Router
            ) {
  }

  ngOnInit() {
    if(this.UserService.LoggedIn)
      this.router.navigate([""])
  }

  OnSubmit(form: NgForm){
    this.user.update(form.value)
    this.signup = this.UserService.signup().subscribe(
      (data) => {
        console.log(data)
        this.DataHandler(data)
      },
      (err) =>{
        console.log(err)
        this.ErrHandler(err)
      }
    )
  }
  DataHandler(data){
    if(data.status === 200) {
      this.UserService.LoggedIn = true;
      this.router.navigate([""]);
    }
  }
  ErrHandler(err: HttpErrorResponse){
    this.WarningMsg = err.error.message;
  }
  ngOnDestroy(){
    if(this.signup)
      this.signup.unsubscribe();
  }
}
