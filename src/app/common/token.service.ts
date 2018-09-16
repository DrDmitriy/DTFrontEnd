import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Constants} from "./constants";
import {ErrorHandler} from "./error-handler";


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: HttpService, private errHandler: ErrorHandler) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== Constants.LOG_IN_URL && req.url !== Constants.SIGN_UP_URL) {
      if (HttpService.getToken() !== null) {
        req = req.clone({
          setHeaders: {
            Authorization: HttpService.getToken(),
          }
        });
      }
      if (HttpService.getTokenResetPassword() !== null) {
        req = req.clone({
          setHeaders: {
            Authorization: HttpService.getTokenResetPassword(),
          }
        });
      }
    }
    return next.handle(req);
  }
}
