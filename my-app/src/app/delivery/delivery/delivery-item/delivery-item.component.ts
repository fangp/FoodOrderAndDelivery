import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.css']
})
export class DeliveryItemComponent implements OnInit {
  @Input() order;
  @Input() index;

  selected = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  OnSelected(){
    this.selected = true;
  }
  OnUnSelected(){
    this.selected = false;
  }
  OnClick(){

  }
}
