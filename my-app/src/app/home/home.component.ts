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
    this.LoggedIn = UserService.getStatus();
  }

  ngOnInit() {
    this.username = this.user.getUsername();
    this.LoggedIn = this.UserService.getStatus();
  }

  ngDoCheck(){
    if(this.user.getUsername()&&this.username!=this.user.getUsername())
      this.username = this.user.getUsername();
    else if(!this.user.getUsername())
      this.username = "";
    if(this.LoggedIn!=this.UserService.getStatus())
      this.LoggedIn = this.UserService.getStatus();
  }

}
