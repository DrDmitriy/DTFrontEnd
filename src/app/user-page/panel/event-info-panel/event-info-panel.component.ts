import { Component, OnInit } from '@angular/core';
import {MapEvent} from '../../map-content/classes/MapEvent';
import {e} from '@angular/core/src/render3';

@Component({
  selector: 'app-info-panel',
  templateUrl: './event-info-panel.component.html',
  styleUrls: ['./event-info-panel.component.css']
})
export class EventInfoPanelComponent implements OnInit {
  selectEvent: boolean;
  event: MapEvent;
  startDate: string;
  endDate: string;
  categories: string;
  options = { weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric' };

  constructor() { }

  ngOnInit() {
  this.clearDispaly();
  }
  public displayEventInfo(event: MapEvent) {
    this.event = event;
    this.startDate = new Date(event.startEvent).toLocaleTimeString('RU', this.options);
    this.endDate = new Date(event.endEvent).toLocaleTimeString('RU', this.options);
    this.categories = '';
    event.categories.forEach(cat => this.categories += ' ' + cat.categoryName + ',' );
    this.categories = this.categories.substring(0, this.categories.length - 1);
    this.selectEvent = true;
  }

  public clearDispaly() {
    this.event = new MapEvent('', '', 0, 0, '', null, null, null);
    this.startDate = '';
    this.endDate = '';
    this.categories = '';
  }
}
