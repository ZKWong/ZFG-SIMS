import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  user1: User;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.user1 = JSON.parse(localStorage.getItem('user'));
      this.alertify.success('Login Successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/mainpage']);
    });
  }

  loggedIn() {
    const isLogin = this.authService.loggedIn();
    if (isLogin) {
      this.user1 = JSON.parse(localStorage.getItem('user'));
    }
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.model.password = '';
    this.model.username = '';
    this.authService.decodedToken = null;
    this.alertify.message('Logout Succesfully');
    this.router.navigate(['/home']);
  }

}
