import {AgmInfoWindow, AgmMarker, LatLngLiteral, MarkerManager, PolygonManager, PolylineManager} from '@agm/core';
import {MarkerRoute} from '../classes/MarkerRoute';
import {MapEvent} from '../classes/MapEvent';
import {EventInfoPanelComponent} from '../../panel/event-info-panel/event-info-panel.component';
import {EventEmitter} from '@angular/core';
import {MapContentComponent} from '../map-content.component';
import {Route} from '../classes/Route';

export class MarkerService {
  eventMarkerArray: Array<AgmMarker> = new Array<AgmMarker>();
  verifyMarkerArray: Array<AgmMarker> = new Array<AgmMarker>();
  allMarkerRoute: Array<MarkerRoute> = new Array<MarkerRoute>();
  eventIconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Pink-icon.png';
  verifyEventIconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Azure-icon.png';


  public getAllMarker() {
    return this.allMarkerRoute;
  }
  public addMarkerRoute(markerRote: MarkerRoute) {
    this.allMarkerRoute.push(markerRote);
  }
  public addMarkerOnMap(manager: MarkerManager, coordinate: LatLngLiteral, mapContent: MapContentComponent, infoWindow: AgmInfoWindow, route: Route) {
    let marker: AgmMarker = new AgmMarker(manager);
    marker.latitude = coordinate.lat;
    marker.longitude = coordinate.lng;
    manager.addMarker(marker);
    manager.createEventObservable('click', marker).subscribe(() => {
      mapContent.clickMarker(marker, infoWindow);
      mapContent.openRoutePanel.emit(route);
    });
    return marker;
  }


  public addTempEventMarker(manager: MarkerManager, lat: number, lng: number){
    let marker: AgmMarker = new AgmMarker(manager);
    marker.latitude = lat;
    marker.longitude = lng;
    marker.iconUrl = this.verifyEventIconUrl;
    manager.addMarker(marker);
    return marker;
  }

  public deleteMarker(manager: MarkerManager, marker: AgmMarker) {
    manager.deleteMarker(marker);
  }

  public addEventMarkersOnMap(mapContent: MapContentComponent, iconEvent: string){ // manager: MarkerManager, events: Array<MapEvent>, isVisible: boolean, eventEmetter: EventEmitter<MapEvent>) {
    mapContent.eventService.allShowEvent.forEach(event => {
      this.addEventMarkerOnMap(mapContent, event, iconEvent);
    });
    return this.eventMarkerArray;
  }

  public addEventMarkerOnMap(mapContent: MapContentComponent, event: MapEvent, iconEvent: string ){//manager: MarkerManager, event: MapEvent, isVisible: boolean, eventEmetter: EventEmitter<MapEvent>) {
    let eventMarker: AgmMarker = new AgmMarker(mapContent.markerManager);
    eventMarker.latitude = event.latitude;
    eventMarker.longitude = event.longitude;
    eventMarker.visible = mapContent.isVisibleEvents;
    // eventMarker.iconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Pink-icon.png';
    eventMarker.iconUrl = iconEvent;
    mapContent.markerManager.addMarker(eventMarker);
    mapContent.markerManager.createEventObservable('click', eventMarker).subscribe(value => {
      this.unFocusEvent(mapContent.markerManager);
      this.focusEvent(mapContent.markerManager, eventMarker);
      mapContent.openEventPanel.emit(event);
    });
    if (event.status === 'publish') {

      this.eventMarkerArray.push(eventMarker);
    } else {
      this.verifyMarkerArray.push(eventMarker);
    }

    return eventMarker;
  }
  public focusEvent (manager: MarkerManager, event: AgmMarker ) {
    event.iconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Chartreuse-icon.png';
    manager.updateIcon(event);
  }
  public unFocusEvent(manager: MarkerManager) {
    this.eventMarkerArray.forEach(event => {
      event.iconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Pink-icon.png';
      manager.updateIcon(event);
    });
    this.verifyMarkerArray.forEach(event => {
      event.iconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Azure-icon.png';
      manager.updateIcon(event);
    });
  }

  public changeVisibleAllEvents(manager: MarkerManager, status: boolean) {
    this.eventMarkerArray.forEach(value => {
      value.visible = status;
      this.unFocusEvent(manager);
      manager.updateVisible(value);
    });
    this.verifyMarkerArray.forEach(value => {
      value.visible = status;
      manager.updateVisible(value);
    });
  }

  public changeVisibleAllRoutes(markerManager: MarkerManager, polylineManager: PolylineManager, status: boolean) {
    this.allMarkerRoute.forEach(value => {
      value.startPointMarker.visible = status;
      value.endPointMarker.visible = status;
      value.route.visible = status;

      markerManager.updateVisible(value.startPointMarker);
      markerManager.updateVisible(value.endPointMarker);
      polylineManager.setPolylineOptions(value.route, {
        visible: status
      });

    });
  }
  public changeVisibleEvent(markerEvent: AgmMarker, manager: MarkerManager, status: boolean) {
    markerEvent.visible = status;
    manager.updateVisible(markerEvent);
  }
}
