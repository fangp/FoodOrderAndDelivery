import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import { UserService } from "../user.service";
import {user} from "../../models/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  username = "";
  LoggedIn = false;
  constructor(private UserService: UserService,
              private user: user
              ) {
    this.LoggedIn = UserService.LoggedIn
  }

  ngOnInit() {
    this.username = this.user.username
    this.LoggedIn = this.UserService.LoggedIn
  }

  ngDoCheck(){
    if(this.user.username&&this.username!=this.user.username)
      this.username = this.user.username
    else if(!this.user.username)
      this.username = "";
    if(this.LoggedIn!=this.UserService.LoggedIn)
      this.LoggedIn = this.UserService.LoggedIn;
  }

}
