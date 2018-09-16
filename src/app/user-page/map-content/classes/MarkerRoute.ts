import {AgmMarker, AgmPolyline} from '@agm/core';

export class MarkerRoute {
  route: AgmPolyline;
  startPointMarker: AgmMarker;
  endPointMarker: AgmMarker;
  categoryId: number;

  constructor(route: AgmPolyline, startPointMarker: AgmMarker, endPointMarker: AgmMarker) {
    this.route = route;
    this.startPointMarker = startPointMarker;
    this.endPointMarker = endPointMarker;
  }
}
