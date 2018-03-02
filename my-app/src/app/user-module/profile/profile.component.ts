import { Component, OnInit } from '@angular/core';
import {user} from "../../../models/user.model";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isLoggedIn:boolean = false;
  isModified:boolean = false;
  username:string;
  address:string;
  contact:string;
  Msg:string = "";
  constructor(private user: user,
              private UserService: UserService) {
    this.isLoggedIn = UserService.getStatus();
    this.username = user.getUsername();
    this.address = user.getOrderInfo().address;
    this.contact = user.getOrderInfo().contact;
  }

  ngOnInit() {
  }

  OnUpdate(){
    this.isModified = true;
  }
  OnSave(){
    this.user.update({
      address: this.address,
      contact: this.contact
    });
    this.UserService.UserProfileUpdate((msg:string)=>{
      this.Msg = msg;
    });
    this.isModified = false;
  }
}
