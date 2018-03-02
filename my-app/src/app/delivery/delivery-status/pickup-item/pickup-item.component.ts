import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DeliveryService} from "../../../delivery.service";

@Component({
  selector: 'app-pickup-item',
  templateUrl: './pickup-item.component.html',
  styleUrls: ['./pickup-item.component.css']
})
export class PickupItemComponent implements OnInit {

  @Input() order;
  @Input() index;
  scope = this;
  WarningMsg = "";
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
    this.DeliveryService.finishOrder((msg:string)=> {
      if(msg == "success")
        this.router.navigate(["/delivery"]);
      else
        this.WarningMsg = msg;
    });
  }
  OnInit() {
  }

}
