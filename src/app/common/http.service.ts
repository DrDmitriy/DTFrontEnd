import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from './constants';
import {Router} from '@angular/router';
import {Events} from './Events';
import {Categories} from './Categories';
import {MapEvent} from '../user-page/map-content/classes/MapEvent';
import {map} from 'rxjs/operators';
import {LatLngLiteral} from '@agm/core';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(request: any) {
    return this.http.post(Constants.SIGN_UP_URL, JSON.stringify(request),
      {headers: {'Content-Type': 'application/json'}, observe: 'response'});
  }

  logIn(request: any) {
    return this.http.post(Constants.LOG_IN_URL, JSON.stringify(request), {observe: 'response', withCredentials: true});

  };

  getEvents() {
    return this.http.get(Constants.GET_VERIFY_EVENTS_URL)
      .toPromise()
      .then(res => <Events[]> res)
      .then(data => {
        return data;
      });
  }

  putStatusEvent(request: any) {
    return this.http.put(Constants.UPDATE_STATUS_EVENTS_URL, JSON.stringify(request), {
      headers: {'Content-Type': 'application/json'},
      observe: 'response'
    });
  }

  addEvent(request: any) {
    return this.http.post(Constants.ADD_EVENTS_URL, JSON.stringify(request),
      {headers: {'Content-Type': 'application/json'}, observe: 'response'});
  }

  deleteEvent(request: any) {
    return this.http.put(Constants.DELETE_EVENTS_URL, JSON.stringify(request),
      {headers: {'Content-Type': 'application/json'}, observe: 'response'});
  }

  sendEmail(request: any) {
    return this
      .http.post(Constants.SEND_EMAIL_URL, JSON.stringify(request), {
        headers: {'Content-Type': 'application/json'},
        observe: 'response'
      });
  }

  testTokenExpiration() {
    return this.http.get(Constants.TEST_URL);
  }

  testOnAdmin() {
    return this.http.get(Constants.TEST_ADMIN_URL);
  }

  putPassword(request: any) {
    return this.http.put(Constants.RESET_PASSWORD_URL, JSON.stringify(request), {
      headers: {'Content-Type': 'application/json'},
      observe: 'response'
    });
  }

  static getToken(): string {
    return localStorage.getItem('token');
  }

  static getTokenResetPassword(): string {
    return localStorage.getItem('token_reset_password');
  }

  requestFB(url) {
    return this.http.get(url);
  }

  getCategories() {
    return this.http.get(Constants.CATEGORIES_URL)
      .toPromise()
      .then(res => <Categories[]> res)
      .then(data => {
        return data;
      });
  }
}
