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

  windowServices = new WindowService();
  markerServices = new MarkerService();
  routeInfoService = new RouteInfoService(this.mapApiWrapper);
  isVisibleRoutes = true;
  isVisibleEvents = false;
  eventMarkerArray: Array<EventMarker> = [];
  eventIconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Pink-icon.png';
  verifyEventIconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Azure-icon.png';
  options = { year: 'numeric', month: 'short',
    day: 'numeric', hour: 'numeric', minute: 'numeric' };
  @Input() localEvent: MapEvent;
  @Output() openEventPanel = new EventEmitter<MapEvent>();
  @Output() openRoutePanel = new EventEmitter<Route>();

  ngOnInit() {
    console.log('%%%%%' + this.polylineServices.allRoute.length);
    this.addContentOnMap();
  }

  public loadEvent(ne: LatLngLiteral, sw: LatLngLiteral) {
    this.eventService.neBorderLoad = ne;
    this.eventService.swBorderLoad = sw;
    this.httpRefreshEventArray();
    this.httpRefreshVerifyEventArray();
  }

 public addAllEventsOnMap() {
     this.markerServices.addEventMarkersOnMap(this, this.eventIconUrl);
  }

  public addEventOnMap(mapEvent: MapEvent, iconEvent: string) {
    let marker = this.markerServices.addEventMarkerOnMap(this, mapEvent, iconEvent);
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

  addContentOnMap() {
     this.polylineServices.httpGetMapRoute().subscribe(routesArr =>
      routesArr.forEach(route => {

        // await
        this.routeInfoService.countDistance(route);
      this.routeInfoService.countDuration(route);
      const coordinate: Array<LatLngLiteral> = route.route;

      let agmPoliline = this.polylineServices.addPolylaneOnMap(route, this);

      let startInfoWin: AgmInfoWindow = this.windowServices.addInfoWindowOnMap(this.infoWindowsManager, {
        position: coordinate[0],
       // content: 'Distance: ' + route.distance.toFixed(2) + ' km. \n' + 'Duration: ' + route.duration
        content: 'Start: ' + new Date(route.route[0].date).toLocaleTimeString('RU', this.options)
      });
      let endInfoWin: AgmInfoWindow = this.windowServices.addInfoWindowOnMap(this.infoWindowsManager, {
        position: coordinate[coordinate.length - 1],
       // content: 'Distance: ' + route.distance.toFixed(2) + ' km. \n' + 'Duration: ' + route.duration
        content: 'Finish: ' + new Date(route.route[route.route.length-1].date).toLocaleTimeString('RU',this.options)
      });

      let markerA = this.markerServices.addMarkerOnMap(this.markerManager, coordinate[0], this, startInfoWin, route);
      let markerB = this.markerServices.addMarkerOnMap(this.markerManager, coordinate[coordinate.length - 1], this, endInfoWin, route);

      this.markerServices.addMarkerRoute(new MarkerRoute(agmPoliline, markerA, markerB));

      this.windowServices.addInfoWindow(startInfoWin);
      this.windowServices.addInfoWindow(endInfoWin);
    }));
  }

  clickMarker(marker: AgmMarker, windows: AgmInfoWindow) {
    this.windowServices.openInfoWIndows(windows); // Do not delete this line
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


