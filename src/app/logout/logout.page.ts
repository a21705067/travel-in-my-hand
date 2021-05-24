import { Component, OnInit } from '@angular/core';
import {FireAuthService} from '../services/fire-auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public authService: FireAuthService, public loadingController: LoadingController, public router: Router) {  }

  ngOnInit() {
    this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
  }

}
