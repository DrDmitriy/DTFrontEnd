import {MapEvent} from '../classes/MapEvent';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LatLng, LatLngLiteral} from '@agm/core';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private _allShowEvent: Array<MapEvent> = new Array<MapEvent>();
  private _neBorderLoad: LatLngLiteral;
  private _swBorderLoad: LatLngLiteral;
  private param: Array<String> = new Array<String>();
  private eventsUrl = 'http://localhost:8080/events';
  private eventsUrlParam = 'http://localhost:8080/events';
  private verifyEventsUrl = 'http://localhost:8080/myEvents';

  constructor(private http: HttpClient) {
  }

  addEvent(event: MapEvent) {
    this._allShowEvent.push(event);
  }

  get allShowEvent(): Array<MapEvent> {
    return this._allShowEvent;
  }

  set allShowEvent(value: Array<MapEvent>) {
    this._allShowEvent = value;
  }

  httpGetMapEvent() {
    this.eventsUrlParam = this.eventsUrl;
    this.param[0] = '?neLat=' + this.neBorderLoad.lat;
    this.param[1] = '&neLng=' + this.neBorderLoad.lng;
    this.param[2] = '&swLat=' + this.swBorderLoad.lat;
    this.param[3] = '&swLng=' + this.swBorderLoad.lng;
    this.param.forEach(value => this.eventsUrlParam += value);

    console.log('httpGetMapEvent ' + this.eventsUrlParam);

    return this.http.get(this.eventsUrlParam).pipe(map(value => value as MapEvent[]));
  }

  httpGetUserVerifyEvents() {
    console.log('httpGetUserVerifyEvents ' + this.eventsUrlParam);
    return this.http.get(this.verifyEventsUrl).pipe(map(value => value as MapEvent[]));
  }

  addMapEvent(mapEvent: MapEvent) {
    console.log('SEND POST');
    return this.http.post<MapEvent>(this.eventsUrl, mapEvent, httpOptions);
  }


  get neBorderLoad(): LatLngLiteral {
    return this._neBorderLoad;
  }

  set neBorderLoad(value: LatLngLiteral) {
    this._neBorderLoad = value;
  }

  get swBorderLoad(): LatLngLiteral {
    return this._swBorderLoad;
  }

  set swBorderLoad(value: LatLngLiteral) {
    this._swBorderLoad = value;
  }
}
