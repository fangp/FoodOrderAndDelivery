import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.css']
})
export class OrderEntryComponent implements OnInit {

  @Input() order;
  constructor() { }

  ngOnInit() {
  }

}
