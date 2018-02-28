import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private UserService: UserService,
              private router: Router) {
    if(!UserService.getStatus())
      router.navigate([""])
  }

  ngOnInit() {
  }

}
