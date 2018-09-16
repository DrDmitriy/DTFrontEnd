import {Injectable} from '@angular/core';
import {Observable, throwError, of} from 'rxjs';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class ErrorHandler{

  constructor( private router: Router) {
  }

  public handleAuthError(err: HttpErrorResponse, marker: boolean): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      if (marker == false) {
        return of(err.message);
      } else {
        localStorage.removeItem("token");
        this.router.navigateByUrl("/home");
        return of(err.message);
      }
    }
    return throwError(err);
  }


}
