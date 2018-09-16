import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../common/http.service';
import {ErrorHandler} from '../common/error-handler';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  displayErr:boolean;

  constructor(private httpService: HttpService, private router: Router, private errHandler: ErrorHandler) { }

  ngOnInit() {
    this.httpService.testTokenExpiration().subscribe(res => {
    }, err => this.displayErr = true);
  }

  route() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }

}
