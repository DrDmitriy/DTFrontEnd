import {
  Component,
  OnInit,
  ElementRef,
  HostListener
} from '@angular/core';
import {User} from '../../common/User';
import {HttpService} from '../../common/http.service';
import {Constants} from '../../common/constants';
import {MessageService} from 'primeng/api';
import {ErrorHandler} from '../../common/error-handler';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  hide: boolean;
  showErrFirst: boolean;
  showErrLast: boolean;
  showErrMail: boolean;
  showErrPass: boolean;
  showErrConfPass: boolean;
  reqStr: any;
  isExist: boolean;
  win: Window;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    this.hide = this.eref.nativeElement.contains(event.target);
  }

  constructor(private httpService: HttpService, private eref: ElementRef, private router: Router,
              private cookieService: CookieService, private activatedRoute: ActivatedRoute,
              private messageService: MessageService, private errHandler: ErrorHandler) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['email'] != undefined) {
        const joinRequest = {
          email: params['email'],
        };
        console.log(params['email']);
        this.httpService.logIn(joinRequest).subscribe(response => {
          localStorage.setItem('token', response.headers.get(Constants.TOKEN_NAME));
          window.opener.location.href = this.router.navigate(['/user',this.cookieService.get('id')]);
          window.close();
        }, err => {
          this.errHandler.handleAuthError(err, false);
        });
      }
    });
  }

  clickFirst() {
    this.showErrFirst = true;
    this.showErrLast = false;
    this.showErrMail = false;
    this.showErrPass = false;
    this.showErrConfPass = false;
  }

  clickLast() {
    this.showErrFirst = false;
    this.showErrLast = true;
    this.showErrMail = false;
    this.showErrPass = false;
    this.showErrConfPass = false;
  }

  clickMail() {
    this.showErrFirst = false;
    this.showErrLast = false;
    this.showErrMail = true;
    this.showErrPass = false;
    this.showErrConfPass = false;
    this.isExist = false;
  }

  clickPassword() {
    this.showErrFirst = false;
    this.showErrLast = false;
    this.showErrMail = false;
    this.showErrPass = true;
    this.showErrConfPass = false;
  }

  clickConfPassword() {
    this.showErrFirst = false;
    this.showErrLast = false;
    this.showErrMail = false;
    this.showErrPass = false;
    this.showErrConfPass = true;
  }

  registration(email: string, password: string, name: string, surname: string) {
    const request = {
      email: email,
      password: password,
      name: name,
      surname: surname
    };
    this.httpService.signUp(request).subscribe(req => {
        const joinRequest = {
          email: email,
          password: password,
        };
        this.httpService.logIn(joinRequest).subscribe(response => {
          localStorage.setItem('token', response.headers.get(Constants.TOKEN_NAME));
          let role = this.cookieService.get('role');
          if (role == 'ADMIN') {
            this.router.navigate(['/admin',this.cookieService.get('id')]);
          } else {
            this.router.navigate(['/user',this.cookieService.get('id')]);
          }
        }, err => {
          this.messageService.add({severity: 'error', summary: 'Access', detail: 'Wrong login or password'});
          this.errHandler.handleAuthError(err, false);
        });

      },
      err => {
        this.isExist = true;
        this.showErrMail = true;
      });
  }


  joinFacebook() {
    this.win = window.open(Constants.FACEBOOK_URL, '_blank', 'width=600,height=500');
  }
}


