import {Directive, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appOrderStatus]'
})
export class OrderStatusDirective implements OnInit{

  @HostBinding("style.color") color:string;
  @Input() status:string;
  constructor() { }

  ngOnInit(){
    if(this.status == "waiting")
      this.color = "red";
    if(this.status == "delivering")
      this.color = "blue";
    if(this.status == "finished")
      this.color = "green";
  }

}
