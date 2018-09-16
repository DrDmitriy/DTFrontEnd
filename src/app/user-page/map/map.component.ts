import {Component, OnInit, ViewChild} from '@angular/core';
import {ROUTES} from '../map-content/testRoute';
import {MapEvent} from '../map-content/classes/MapEvent';
import {MapContentComponent} from '../map-content/map-content.component';
import {HttpClient} from '@angular/common/http';
import {EventConstructorComponent} from '../event-constructor/event-constructor.component';

import {Category} from '../map-content/classes/Category';
import {Route} from '../map-content/classes/Route';
import {RouteInfoPanelComponent} from '../panel/route-info-panel/route-info-panel.component';
import {EventInfoPanelComponent} from '../panel/event-info-panel/event-info-panel.component';
import {LatLng, LatLngLiteral} from '@agm/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  startPointLat = ROUTES.routes[ROUTES.routes.length - 1].route[0].lat;
  startPointLng = ROUTES.routes[ROUTES.routes.length - 1].route[0].lng;
  eventModeOn  = false;
  cursor = 'pointer';
  marker: any;
  neBorder: LatLng;
  swBorder: LatLng;
  neBorderLoad: LatLngLiteral;
  swBorderLoad: LatLngLiteral;
  expansionLat = 2;
  expansionLng = 4;
  showRoutes = true;
  showEvents = false;
  categoryArray: Category[] = [];
  selectedCategory: Category[];
  name: string = this.cookieService.get('name');
  surname: string = this.cookieService.get('surname');

  @ViewChild(MapContentComponent) mapContent: MapContentComponent;
  @ViewChild(EventConstructorComponent) eventConstructor: EventConstructorComponent;
  @ViewChild(EventInfoPanelComponent) eventInfoPanel: EventInfoPanelComponent;
  @ViewChild(RouteInfoPanelComponent) routeInfoPanel: RouteInfoPanelComponent;

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.eventConstructor.categoryService.httpGetCategories().subscribe(value => value.forEach(category =>
        this.categoryArray.push(category)));
    console.log('clt = ' + this.categoryArray.length);
    this.firstInitEvent();
  }
  onEventMode() {
    this.selectedCategory = [];
    this.showEvents = true;
    this.changeVisibleEventMarker();
    this.eventModeOn = true;
  }
  clickOnMap($event) {
    if (this.eventModeOn) {
      this.marker = this.mapContent.markerServices.addTempEventMarker(this.mapContent.markerManager, $event.coords.lat, $event.coords.lng );
      this.eventConstructor.setLatLng($event.coords.lat, $event.coords.lng);
      this.eventConstructor.display = true;
      this.eventModeOn = false;
      }
  }
  deleteMarker(event: MapEvent) {
    this.mapContent.markerServices.deleteMarker(this.mapContent.markerManager, this.marker );
    this.mapContent.addEventOnMap(event);
  }

  boundsChange($event) {
    this.neBorder = $event.getNorthEast();
    this.swBorder = $event.getSouthWest();

      if (this.neBorder.lng() > this.neBorderLoad.lng) {
        console.log('Расширение вправо ');
        console.log('Текущие гарницы :  NeBorderLoad.lat ' + this.neBorderLoad.lat  + ' NeBorderLoad.lng ' + this.neBorderLoad.lng );
        console.log('SwBorderLoad.lat ' + this.swBorderLoad.lat  + ' swBorderLoad.lng ' + this.swBorderLoad.lng );
        console.log('Отправляю запрос на сервер ')

          // this.mapContent.loadEvent({lat: this.swBorderLoad.lat, lng: this.neBorderLoad.lng}, {lat: this.neBorderLoad.lat, lng: this.neBorderLoad.lng + this.expansionLng});
        this.mapContent.loadEvent({lat: this.neBorderLoad.lat, lng: this.neBorderLoad.lng + this.expansionLng}, {lat: this.swBorderLoad.lat, lng: this.neBorderLoad.lng});
        this.neBorderLoad = {lat: this.neBorderLoad.lat, lng: this.neBorderLoad.lng + this.expansionLng};
        console.log('Обновленные гарницы :  NeBorderLoad.lat ' + this.neBorderLoad.lat  + ' NeBorderLoad.lng ' + this.neBorderLoad.lng );
        console.log('SwBorderLoad.lat ' + this.swBorderLoad.lat  + ' swBorderLoad.lng ' + this.swBorderLoad.lng );

      }
      if ( this.swBorder.lat() < this.swBorderLoad.lat ) {
        console.log('Расширение вниз ');
        console.log('Текущие гарницы :  NeBorderLoad.lat ' + this.neBorderLoad.lat  + ' NeBorderLoad.lng ' + this.neBorderLoad.lng );
        console.log('SwBorderLoad.lat ' + this.swBorderLoad.lat  + ' swBorderLoad.lng ' + this.swBorderLoad.lng );
        console.log('Отправляю запрос на сервер ')
        // this.mapContent.loadEvent({lat: this.swBorderLoad.lat - this.expansionLat, lng: this.swBorderLoad.lng}, {lat: this.swBorderLoad.lat, lng: this.neBorderLoad.lng});
        this.mapContent.loadEvent({lat: this.swBorderLoad.lat, lng: this.neBorderLoad.lng}, {lat: this.swBorderLoad.lat - this.expansionLat, lng: this.swBorderLoad.lng});
        this.swBorderLoad = { lat: this.swBorderLoad.lat - this.expansionLat, lng: this.swBorderLoad.lng};
        console.log('Обновленные гарницы :  NeBorderLoad.lat ' + this.neBorderLoad.lat  + ' NeBorderLoad.lng ' + this.neBorderLoad.lng );
        console.log('SwBorderLoad.lat ' + this.swBorderLoad.lat  + ' swBorderLoad.lng ' + this.swBorderLoad.lng );

      }
       if ( this.swBorder.lng() < this.swBorderLoad.lng ) {
         console.log('Расширение влево ');
         console.log('Текущие гарницы :  NeBorderLoad.lat ' + this.neBorderLoad.lat  + ' NeBorderLoad.lng ' + this.neBorderLoad.lng );
         console.log('SwBorderLoad.lat ' + this.swBorderLoad.lat  + ' swBorderLoad.lng ' + this.swBorderLoad.lng );
         console.log('Отправляю запрос на сервер ')

         this.mapContent.loadEvent({lat: this.neBorderLoad.lat, lng: this.swBorderLoad.lng}, {lat: this.swBorderLoad.lat, lng: this.swBorderLoad.lng - this.expansionLng});
         this.swBorderLoad = {lat: this.swBorderLoad.lat, lng: this.swBorderLoad.lng - this.expansionLng };
         console.log('Обновленные гарницы :  NeBorderLoad.lat ' + this.neBorderLoad.lat  + ' NeBorderLoad.lng ' + this.neBorderLoad.lng );
         console.log('SwBorderLoad.lat ' + this.swBorderLoad.lat  + ' swBorderLoad.lng ' + this.swBorderLoad.lng );

       }
       if ( this.neBorder.lat() > this.neBorderLoad.lat ) {
         console.log('Расширение вверх ');
         console.log('Текущие гарницы :  NeBorderLoad.lat ' + this.neBorderLoad.lat  + ' NeBorderLoad.lng ' + this.neBorderLoad.lng );
         console.log('SwBorderLoad.lat ' + this.swBorderLoad.lat  + ' swBorderLoad.lng ' + this.swBorderLoad.lng );
         console.log('Отправляю запрос на сервер ')
         this.mapContent.loadEvent({lat: this.neBorderLoad.lat + this.expansionLat, lng: this.neBorderLoad.lng}, {lat: this.neBorderLoad.lat, lng: this.swBorderLoad.lng});
         this.neBorderLoad = {lat: this.neBorderLoad.lat + this.expansionLat, lng: this.neBorderLoad.lng };
         console.log('Обновленные гарницы :  NeBorderLoad.lat ' + this.neBorderLoad.lat  + ' NeBorderLoad.lng ' + this.neBorderLoad.lng );
         console.log('SwBorderLoad.lat ' + this.swBorderLoad.lat  + ' swBorderLoad.lng ' + this.swBorderLoad.lng );

       }
  }

  firstInitEvent() {
    this.neBorderLoad = {lat: this.startPointLat , lng: this.startPointLng };
    this.swBorderLoad = {lat: this.startPointLat , lng: this.startPointLng };
    this.mapContent.loadEvent(this.neBorderLoad, this.swBorderLoad);
  }

  openEventInfoPanel(event: MapEvent) {
    this.eventInfoPanel.displayEventInfo(event);
  }
  openRouteInfoPanel(route: Route) {
    this.routeInfoPanel.displayRouteInfo(route);
  }

  public changeVisibleEventMarker() {
    console.log('changeVisibleEventMarker '  + this.showEvents);
    this.mapContent.changeVisibleEventMarker(this.showEvents);
    this.eventInfoPanel.clearDispaly();
    }
  public changeVisibleRoutes() {
    this.mapContent.cahangeVisibleRoutes(this.showRoutes);
    this.routeInfoPanel.clearDispaly();
  }

  showOnlySelectedEvents() {
    console.log('leng = ' + this.selectedCategory.length);
    if ( this.selectedCategory.length === 0 ) {
      this.changeVisibleEventMarker();
    } else {
      this.mapContent.showOnlySelectedEvents(this.selectedCategory);
    }
  }
  logout(){
    localStorage.removeItem('token');
    this.cookieService.deleteAll();
    this.router.navigateByUrl('/home');
  }
}
