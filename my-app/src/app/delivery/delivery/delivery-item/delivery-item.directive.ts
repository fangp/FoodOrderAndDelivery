import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appDeliveryItem]'
})
export class DeliveryItemDirective{
  @Output() selected = new EventEmitter();
  @Output() unselected = new EventEmitter();
  @HostListener("mouseenter") Enter(){
    this.active=true;
    this.selected.emit();
  }
  @HostListener("mouseleave") Leave(){
    this.active=false;
    this.unselected.emit();
  }
  @HostBinding("class.active") active = false;

  constructor() { }

}
