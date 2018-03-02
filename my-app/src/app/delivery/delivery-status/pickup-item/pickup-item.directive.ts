import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appPickupItem]'
})
export class PickupItemDirective {
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
