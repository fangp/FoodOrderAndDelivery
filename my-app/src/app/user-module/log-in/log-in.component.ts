import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import {UserService} from "../../user.service";
import {user} from "../../../models/user.model";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {

  //@ViewChild("f") form:NgForm

  WarningMsg = "";
  login: Subscription;
  constructor(private UserService: UserService,
              private user: user,
              private router: Router
              ) {
  }

  ngOnInit() {
    if(this.UserService.LoggedIn)
      this.router.navigate([""])
  }

  OnSubmit(form: NgForm){
    //console.log(form.value)
    this.user.update(form.value);
    //form.form.controls.username.invalid
    this.login = this.UserService.login().subscribe(
      (data) =>{
        this.DataHandler(data)
      },
      (err) =>{
        this.ErrHandler(err)
      }
    )
  }
  DataHandler(data) {
    this.user.update(data);
    this.UserService.UserLogin();
    this.router.navigate([""]);
  }
  ErrHandler(err: HttpErrorResponse){
    this.WarningMsg = err.error.message;
  }

  ngOnDestroy(){
    if(this.login)
      this.login.unsubscribe();
  }

}
