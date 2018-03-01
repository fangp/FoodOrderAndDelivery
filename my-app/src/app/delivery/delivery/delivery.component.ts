import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  origin_orders = [
    {
      username:"hah",
      description: "1",
      contact: "22222",
      address: "33"
    },
    {
      username:"ggg",
      description: "1",
      contact: "21",
      address: "32222"
    }
  ];
  types = [
    'username',
    'description',
    'address',
    'contact'
  ];
  orders = [];
  condition:string;
  selectedType:string = 'description';
  constructor() { }

  ngOnInit() {
    this.orders = this.origin_orders;
  }

  OnChange(){
    //console.log()
    this.orders = this.origin_orders
                        .filter((ele)=>{return String(ele[this.selectedType])
                          .indexOf(this.condition)>=0});
  }

  OnRefresh(){

  }

}
