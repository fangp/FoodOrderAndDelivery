import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {DeliveryService} from "../../../delivery.service";

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.css']
})
export class DeliveryItemComponent implements OnInit {
  @Input() order;
  @Input() index;
  WarningMsg:string = "";
  selected = false;
  constructor(private router: Router,
              private DeliveryService: DeliveryService) { }

  ngOnInit() {
  }

  OnSelected(){
    this.selected = true;
  }
  OnUnSelected(){
    this.selected = false;
  }
  OnClick(){
    this.DeliveryService.pickupOrder(this.order, this.MsgHandler);
  }
  MsgHandler(msg: string){
    if(msg == "success")
      this.router.navigate(["/delivery-status"]);
    else
      this.WarningMsg = msg;
  }
}
