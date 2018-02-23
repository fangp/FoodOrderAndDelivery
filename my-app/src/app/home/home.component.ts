import {Component, OnChanges, OnInit} from '@angular/core';
import { UserService } from "../user.service";
import {user} from "../../models/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = "";
  LoggedIn = false;
  constructor(private UserService: UserService,
              private user: user
              ) {
    this.LoggedIn = UserService.LoggedIn
  }

  ngOnInit() {
    this.username = this.user.getUsername()
    this.LoggedIn = this.UserService.LoggedIn
  }

}
