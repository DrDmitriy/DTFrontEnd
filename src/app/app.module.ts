import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import {AccordionModule} from 'primeng/accordion';
import {DialogModule} from 'primeng/dialog';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ConfirmEqualValidatorDirective} from "./common/confirm-equal-validator.directive";
import { EntriesComponent } from './entrance/entries/entries.component';
import { RegistrationComponent } from './entrance/registration/registration.component';
import { InformationComponent } from './entrance/information/information.component';
import {TokenInterceptorService} from "./common/token.service";
import { EntranceComponent } from './entrance/entrance.component';
import {HttpService} from "./common/http.service";
import {authGuard} from "./common/auth-guard.service";
import {authGuardAdmin} from './common/auth-guard-admin.service';
import {ErrorHandler} from "./common/error-handler";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from 'primeng/toast';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {TableModule} from 'primeng/table';
import { CookieService } from 'ngx-cookie-service';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import { UserPageComponent } from './user-page/user-page.component';
import {RouteInfoPanelComponent} from './user-page/panel/route-info-panel/route-info-panel.component';
import {EventInfoPanelComponent} from './user-page/panel/event-info-panel/event-info-panel.component';
import {EventConstructorComponent} from './user-page/event-constructor/event-constructor.component';
import {MapContentComponent} from './user-page/map-content/map-content.component';
import {MapComponent} from './user-page/map/map.component';
import {DropdownModule, InputSwitchModule, InputTextareaModule, TabViewModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {CardModule} from 'primeng/card';
import {AgmCoreModule} from '@agm/core';
import {MenuItem} from 'primeng/api';
import {RouterModule} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';

const routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: EntranceComponent },
  {path: 'forgot-password/:token', component: ResetPasswordComponent },
  {path: 'admin/:id', component: AdminPageComponent, canActivate: [authGuardAdmin]},
  {path: 'user/:id', component: UserPageComponent, canActivate: [authGuard] },
  {path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    RegistrationComponent,
    InformationComponent,
    ConfirmEqualValidatorDirective,
    EntranceComponent,
    ResetPasswordComponent,
    AdminPageComponent,
    UserPageComponent,
    MapComponent,
    MapContentComponent,
    EventConstructorComponent,
    EventInfoPanelComponent,
    RouteInfoPanelComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
    CalendarModule,
    MultiSelectModule,
    RouterModule.forRoot(routes),
    BrowserModule, TabViewModule, FormsModule, HttpClientModule, CommonModule, DialogModule, BrowserAnimationsModule, DropdownModule,
    ButtonModule, AccordionModule, InputTextareaModule, CalendarModule, MultiSelectModule, InputSwitchModule, CardModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyB48P592kV2b7iq71QvnmfP66CF4uqUFZ8'}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB48P592kV2b7iq71QvnmfP66CF4uqUFZ8',
      libraries: ['geometry']
    })
  ],
  providers: [
    {provide: authGuardAdmin, useClass: authGuardAdmin},
    {provide: authGuard, useClass: authGuard},
    {provide: HttpService, useClass: HttpService},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    {provide: ErrorHandler, useClass: ErrorHandler},
    CookieService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
