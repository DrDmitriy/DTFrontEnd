import {AgmPolyline, PolylineManager} from '@agm/core';
import {PolylineOptions} from '@agm/core/services/google-maps-types';
import {WindowService} from './WindowService';
import {EventEmitter, Injectable} from '@angular/core';
import {Route} from '../classes/Route';
import {MapEvent} from '../classes/MapEvent';
import {MapContentComponent} from '../map-content.component';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolylineService {
  allRoute: Array<AgmPolyline> = new Array<AgmPolyline>();
  private routeUrl = 'http://localhost:8080/routes';
  private routeUrlParam = 'http://localhost:8080/routes';

  constructor(private http: HttpClient) {
  }

  httpGetMapRoute() {
    this.routeUrlParam = this.routeUrl;
/*    this.param[0] = '?neLat=' + this.neBorderLoad.lat;
    this.param[1] = '&neLng=' + this.neBorderLoad.lng;*/

  //  this.param.forEach(value => this.eventsUrlParam += value);

    console.log('httpGetMapRoute ' + this.routeUrlParam);

    return this.http.get(this.routeUrlParam).pipe(map(value => value as Route[]));


  }
  public getAllRoute() {
    return this.allRoute;
  }

  public addRoute(route: AgmPolyline) {
    this.allRoute.push(route);
  }

  public addPolylaneOnMap(route: Route , mapContent: MapContentComponent) {
    let polyline: AgmPolyline = new AgmPolyline(mapContent.polilineManager);
    polyline.visible = true;
    mapContent.polilineManager.addPolyline(polyline);
    mapContent.polilineManager.setPolylineOptions(polyline, {
      path: route.route,
      strokeColor: 'black'
    });
    this.addRoute(polyline);
    mapContent.polilineManager.createEventObservable('click', polyline).subscribe(() => {
      mapContent.windowServices.closeAllInfoWindows();
      this.unfocusedPolilanes(mapContent.polilineManager);
      this.focucedPolylane(mapContent.polilineManager, polyline);
      mapContent.openRoutePanel.emit(route);
    });


    return polyline;
  }

  public unfocusedPolilanes(manager: PolylineManager) {
    console.log("LLLLLLLL " + this.allRoute.length);
    this.allRoute.forEach(agm => {console.log(agm);
      this.changeColorPolilane(manager, agm, 'black');
    });
  }

  changeColorPolilane(manager: PolylineManager, polylane: AgmPolyline, color: string) {
    console.log("ERROR");
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
