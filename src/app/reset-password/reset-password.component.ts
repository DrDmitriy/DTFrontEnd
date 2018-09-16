import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {User} from "../common/User";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../common/http.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user: User = new User();
  hide: boolean;
  showErrPass: boolean;
  showErrConfPass: boolean;
  press: boolean;
  displayErr: boolean;
  displayGood: boolean;

  constructor(private eref: ElementRef, private activatedRoute: ActivatedRoute,private httpService: HttpService , private router: Router) {
  }

  ngOnInit() {
    localStorage.setItem("token_reset_password", this.activatedRoute.snapshot.url[1].path);
    this.httpService.testTokenExpiration().subscribe(resp => {
    }, err => {
      if (err.status === 401 || err.status === 403) {
        this.displayErr=true;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    this.hide = this.eref.nativeElement.contains(event.target);
  }

  clickPassword() {
    this.showErrPass = true;
    this.showErrConfPass = false;
  }

  clickConfPassword() {
    this.showErrPass = false;
    this.showErrConfPass = true;
  }

  resetPassword(password:string) {
    this.press = true;
    const request = {
      password: password,
    };
    this.httpService.putPassword(request).subscribe(res => {
      this.displayGood = true;
      this.press = false;
    }, err => {
      if (err.status === 401 || err.status === 403) {
        this.displayErr=true;
      }
      this.press = false;
    });
  }

  route(){
    localStorage.removeItem("token_reset_password");
    this.router.navigateByUrl("/home");
  }
}
