import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {User} from "../common/User";
import {MessageService} from "primeng/api";
import {HttpService} from "../common/http.service";

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css'],
  providers: [MessageService]
})
export class EntranceComponent implements OnInit{

  display: boolean = false;
  press: boolean = false;
  user: User = new User();

  constructor(private httpService: HttpService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  show(comp) {
    comp ? this.display = true : this.display = false;
  }

  submit(err, email) {
    this.press = true;
    if (err == false) {
      this.messageService.add({severity:'error', summary: 'Error Message', detail:'No correct email address'});
      this.display = true;
      this.press = false;
    } else {
      const request = {
        email: email
      };
      this.httpService.sendEmail(request).subscribe(res =>{
        this.display = false;
      });
      this.messageService.add({severity:'success', summary: 'Check Email', detail:'You\'ve successfully request a new password reset'});
    }
  }

  cancel()  {
    this.press = false;
    this.user.email = "";
  }
}
