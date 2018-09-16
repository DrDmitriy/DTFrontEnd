import {AgmInfoWindow, AgmMarker, LatLngLiteral, MarkerManager, PolygonManager, PolylineManager} from '@agm/core';
import {MarkerRoute} from '../classes/MarkerRoute';
import {MapEvent} from '../classes/MapEvent';
import {EventInfoPanelComponent} from '../../panel/event-info-panel/event-info-panel.component';
import {EventEmitter} from '@angular/core';
import {MapContentComponent} from '../map-content.component';
import {Route} from '../classes/Route';

export class MarkerService {
  eventMarkerArray: Array<AgmMarker> = new Array<AgmMarker>();
  allMarkerRoute: Array<MarkerRoute> = new Array<MarkerRoute>();


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
    marker.iconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Outside-Pink-icon.png';
    manager.addMarker(marker);
    return marker;
  }

  public deleteMarker(manager: MarkerManager, marker: AgmMarker) {
    manager.deleteMarker(marker);
  }

  public addEventMarkersOnMap(manager: MarkerManager, events: Array<MapEvent>, isVisible: boolean, eventEmetter: EventEmitter<MapEvent>) {
    events.forEach(event => {
      this.addEventMarkerOnMap(manager, event, isVisible,  eventEmetter);
    });
    return this.eventMarkerArray;
  }

  public addEventMarkerOnMap(manager: MarkerManager, event: MapEvent, isVisible: boolean, eventEmetter: EventEmitter<MapEvent>) {
    let eventMarker: AgmMarker = new AgmMarker(manager);
    eventMarker.latitude = event.latitude;
    eventMarker.longitude = event.longitude;
    eventMarker.visible = isVisible;
    // eventMarker.iconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Chartreuse-icon.png';
    eventMarker.iconUrl = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Pink-icon.png';
    manager.addMarker(eventMarker);
    manager.createEventObservable('click', eventMarker).subscribe(value => {
      this.unFocusEvent(manager);
      this.focusEvent(manager, eventMarker);
      eventEmetter.emit(event);
    });
    this.eventMarkerArray.push(eventMarker);

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
  }

  public changeVisibleAllEvents(manager: MarkerManager, status: boolean) {
    this.eventMarkerArray.forEach(value => {
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
