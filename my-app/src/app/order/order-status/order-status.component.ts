import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  orders = [
    {
      status: "waiting",
      description: "1",
      address:"2",
      driver:"none",
      contact: "3"
    },
    {
      status: "delivering",
      description: "2",
      address:"2",
      driver:"haha",
      contact: "3"
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
