import { Component, OnInit } from '@angular/core';
import {Route} from '../../map-content/classes/Route';
import {MapEvent} from '../../map-content/classes/MapEvent';

@Component({
  selector: 'app-route-info-panel',
  templateUrl: './route-info-panel.component.html',
  styleUrls: ['./route-info-panel.component.css']
})
export class RouteInfoPanelComponent implements OnInit {
  route: Route;
  distance: string;
  duration: string;
  start: string;
  finish: string;
  options = {year: 'numeric', month: 'short',
    day: 'numeric'};

  constructor() { }

  ngOnInit() {
    this.clearDispaly();
  }

  public displayRouteInfo(route: Route) {
    this.route = route;
    this.distance = route.distance.toFixed(2) + 'km.';
    this.duration = route.duration;
    this.start = new Date(route.route[0].date).toLocaleTimeString('RU', this.options);
    this.finish = new Date(route.route[route.route.length - 1 ].date).toLocaleTimeString('RU', this.options);
    // this.selectEvent = true;
  }
  public clearDispaly() {
    this.route = new Route(null);
    this.distance = '';
    this.duration = '';
    this.start = '';
    this.finish = '';

  }

}
