import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import {UserService} from "../../user.service";
import {user} from "../../../models/user.model";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import 'rxjs/add/operator/take'
import {Subscription} from "rxjs/Subscription";
import {role} from "../../../models/role.model";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  //@ViewChild("f") form:NgForm

  roles = role.roles;
  WarningMsg = "";
  constructor(private UserService: UserService,
              private user: user,
              private router: Router
              ) {
  }

  ngOnInit() {
    if(this.UserService.getStatus())
      this.router.navigate([""])
  }

  OnSubmit(form: NgForm){
    //console.log(form.value)
    this.user.update(form.value);
    //form.form.controls.username.invalid
    this.UserService.login().take(1).subscribe(
      (data) =>{
        this.DataHandler(data)
      },
      (err) =>{
        this.ErrHandler(err)
      }
    )
  }
  DataHandler(data) {
    this.user.update(data.user);
    if(data.token){
      localStorage.setItem("currentUser", data.token);
    }
    this.UserService.UserLogin();
    this.router.navigate([""]);
  }
  ErrHandler(err: HttpErrorResponse){
    this.WarningMsg = err.error.message;
  }

}
