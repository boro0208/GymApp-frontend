import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user!: any;
  message = 'Dashboard';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("access_token");
    const tokenInfo = this.authService.getDecodedAccessToken(this.user);
    console.log(tokenInfo.sub);
  }


}
