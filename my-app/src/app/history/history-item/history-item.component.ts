import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.css']
})
export class HistoryItemComponent implements OnInit {
  @Input() order;
  constructor() { }

  ngOnInit() {
  }

}
