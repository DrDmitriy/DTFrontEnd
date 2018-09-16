import {AgmPolyline, PolylineManager} from '@agm/core';
import {PolylineOptions} from '@agm/core/services/google-maps-types';
import {WindowService} from './WindowService';
import {EventEmitter} from '@angular/core';
import {Route} from '../classes/Route';
import {MapEvent} from '../classes/MapEvent';
import {MapContentComponent} from '../map-content.component';

export class PolylineService {
  allRoute: Array<AgmPolyline> = new Array<AgmPolyline>();

  public getAllRoute() {
    return this.allRoute;
  }

  public addRoute(route: AgmPolyline) {
    this.allRoute.push(route);
  }

  public addPolylaneOnMap(route: Route , mapContent: MapContentComponent) {
    let polyline: AgmPolyline = new AgmPolyline(mapContent.polilineManager);
    mapContent.polilineManager.addPolyline(polyline);
    mapContent.polilineManager.setPolylineOptions(polyline, {
      path: route.route,
      strokeColor: 'black'
    });
    mapContent.polilineManager.createEventObservable('click', polyline).subscribe(() => {
      mapContent.windowServices.closeAllInfoWindows();
      this.unfocusedPolilanes(mapContent.polilineManager);
      this.focucedPolylane(mapContent.polilineManager, polyline);
      mapContent.openRoutePanel.emit(route);
    });
    this.addRoute(polyline);

    return polyline;
  }

  public unfocusedPolilanes(manager: PolylineManager) {
    this.allRoute.map(agm => this.changeColorPolilane(manager, agm, 'black'));
  }

  changeColorPolilane(manager: PolylineManager, polylane: AgmPolyline, color: string) {
    manager.setPolylineOptions(polylane, {
      strokeColor: color
    });
  }

  focucedPolylane(manager: PolylineManager, polylane: AgmPolyline) {
    manager.setPolylineOptions(polylane, {
      strokeColor: 'red'
    });
  }
}
