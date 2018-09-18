import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AgmMarker, AgmPolygon,
  AgmPolyline,
  GoogleMapsAPIWrapper,
  InfoWindowManager, LatLng,
  LatLngLiteral,
  MarkerManager, PolygonManager,
  PolylineManager
} from '@agm/core';
import {ROUTES} from './testRoute';
import {AgmInfoWindow} from '@agm/core';
import {MarkerRoute} from './classes/MarkerRoute';
import {PolylineService} from './servises/PolylineService';
import {MarkerService} from './servises/MarkerService';
import {WindowService} from './servises/WindowService';
import {RouteInfoService} from './routeInfo/routeInfoService';
import {MapEvent} from './classes/MapEvent';
import {EventService} from './servises/EventService';
import {EventMarker} from './classes/EventMarker';
import {Category} from './classes/Category';
import {Route} from './classes/Route';

@Component({
  selector: 'app-map-content',
  template: ''
})
export class MapContentComponent implements OnInit {
  constructor(public mapApiWrapper: GoogleMapsAPIWrapper,
              public polilineManager: PolylineManager,
              public markerManager: MarkerManager,
              public infoWindowsManager: InfoWindowManager,
              public eventService: EventService,
              public polylineServices: PolylineService) {
  }

   // polylineServices = new PolylineService();
  windowServices = new WindowService();
  markerServices = new MarkerService();
  routeInfoService = new RouteInfoService(this.mapApiWrapper);
  isVisibleRoutes = true;
  isVisibleEvents = false;
  eventMarkerArray: Array<EventMarker> = [];
  eventIconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Pink-icon.png';
  verifyEventIconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Azure-icon.png';

  @Input() localEvent: MapEvent;
  @Output() openEventPanel = new EventEmitter<MapEvent>();
  @Output() openRoutePanel = new EventEmitter<Route>();

  ngOnInit() {
    this.polylineServices.httpGetMapRoute().subscribe(routesArr =>
      routesArr.forEach(coorsd => coorsd.route.forEach(point => {
        console.log('ROUTE LAT: ' + point.lat);
        console.log('ROUTE LNG: ' + point.lng);
      }))  );
    this.addContentOnMap();


  }

  public loadEvent(ne: LatLngLiteral, sw: LatLngLiteral) {
    this.eventService.neBorderLoad = ne;
    this.eventService.swBorderLoad = sw;
    this.httpRefreshEventArray();
    this.httpRefreshVerifyEventArray();
  }

 public addAllEventsOnMap() {
     this.markerServices.addEventMarkersOnMap(this, this.eventIconUrl);//this.markerManager, this.eventService.allShowEvent, this.isVisibleEvents, this.openEventPanel);

  }

  public addEventOnMap(mapEvent: MapEvent, iconEvent: string) {
    let marker = this.markerServices.addEventMarkerOnMap(this, mapEvent, iconEvent);// .markerManager, mapEvent, this.isVisibleEvents, this.openEventPanel);

    this.eventMarkerArray.push({event: mapEvent, marker: marker});

    return marker;
    }

  public httpRefreshEventArray() {
     this.eventService.httpGetMapEvent().subscribe(value => value.forEach(event => {
      this.eventService.addEvent(event);
      console.log("PPPP " + event.status );
      let marker = this.addEventOnMap(event, this.eventIconUrl);
      this.eventMarkerArray.push({event: event, marker: marker});
    }));
  }

  public httpRefreshVerifyEventArray() {
    this.eventService.httpGetUserVerifyEvents().subscribe(value => value.forEach(event => {
      this.eventService.addEvent(event);
      console.log("VVVV " + event.status );
      let marker = this.addEventOnMap(event, this.verifyEventIconUrl);
      this.eventMarkerArray.push({event: event, marker: marker});
    }));
  }

  async addContentOnMap() {
    for (let i = 0; i < ROUTES.routes.length; i++) {
      await this.routeInfoService.countDistance(ROUTES.routes[i]);
      this.routeInfoService.countDuration(ROUTES.routes[i]);
      const coordinate: Array<LatLngLiteral> = ROUTES.routes[i].route;

      let agmPoliline = this.polylineServices.addPolylaneOnMap(ROUTES.routes[i], this);

     // this.polilineManager.createEventObservable('click', agmPoliline).subscribe(() => this.clickPolyline(agmPoliline));
     // this.polylineServices.addRoute(agmPoliline);

      let startInfoWin: AgmInfoWindow = this.windowServices.addInfoWindowOnMap(this.infoWindowsManager, {
        position: coordinate[0],
        content: 'Distance: ' + ROUTES.routes[i].distance.toFixed(2) + ' km. \n' + 'Duration: ' + ROUTES.routes[i].duration
      });
      let endInfoWin: AgmInfoWindow = this.windowServices.addInfoWindowOnMap(this.infoWindowsManager, {
        position: coordinate[coordinate.length - 1],
        content: 'Distance: ' + ROUTES.routes[i].distance.toFixed(2) + ' km. \n' + 'Duration: ' + ROUTES.routes[i].duration
      });

      let markerA = this.markerServices.addMarkerOnMap(this.markerManager, coordinate[0], this, startInfoWin, ROUTES.routes[i]);
      let markerB = this.markerServices.addMarkerOnMap(this.markerManager, coordinate[coordinate.length - 1], this, endInfoWin, ROUTES.routes[i]);

      // this.markerManager.createEventObservable('click', markerA).subscribe(() => this.clickMarker(markerA, startInfoWin));
      // this.markerManager.createEventObservable('click', markerB).subscribe(() => this.clickMarker(markerB, endInfoWin));


      this.markerServices.addMarkerRoute(new MarkerRoute(agmPoliline, markerA, markerB));

      this.windowServices.addInfoWindow(startInfoWin);
      this.windowServices.addInfoWindow(endInfoWin);
    }
  }

  clickMarker(marker: AgmMarker, windows: AgmInfoWindow) {
    this.windowServices.openInfoWIndows(windows);
    this.markerServices.getAllMarker().filter((markerRoute) =>
      markerRoute.startPointMarker.id() === marker.id() || markerRoute.endPointMarker.id() === marker.id())
      .forEach((route) => {
        this.polylineServices.unfocusedPolilanes(this.polilineManager);
        this.windowServices.closeAllInfoWindows();
        this.polylineServices.focucedPolylane(this.polilineManager, route.route);
      });
  }

  /*clickPolyline(polyline: AgmPolyline) {
    console.log('clickPolyline');
    this.windowServices.closeAllInfoWindows();
    this.polylineServices.unfocusedPolilanes(this.polilineManager);
    this.polylineServices.focucedPolylane(this.polilineManager, polyline);
  }
*/
  public changeVisibleEventMarker(status: boolean) {
    this.isVisibleEvents = status;
    this.markerServices.changeVisibleAllEvents(this.markerManager, status);
  }

  public cahangeVisibleRoutes(status: boolean) {
    this.isVisibleRoutes = status;
    this.windowServices.closeAllInfoWindows();
    this.markerServices.changeVisibleAllRoutes(this.markerManager, this.polilineManager, status);
  }

  public showOnlySelectedEvents(selectedCategory: Category[]) {
    this.changeVisibleEventMarker(false);
    this.eventMarkerArray.forEach(eventMarker => eventMarker.event.categories.forEach(category => {
      for (let i = 0; i < selectedCategory.length; i++ ) {
        if ( category.categoryId === selectedCategory[i].categoryId ) {
          this.markerServices.changeVisibleEvent(eventMarker.marker, this.markerManager, true);
          break;
        }
      }
    } ));
  }
}


