import { Component, OnInit } from '@angular/core';
import {FireAuthService} from '../services/fire-auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-pasttravels',
  templateUrl: './pasttravels.page.html',
  styleUrls: ['./pasttravels.page.scss'],
})
export class PasttravelsPage implements OnInit {

  constructor(public authService: FireAuthService, public router: Router,
              public loadingController: LoadingController) { }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
  }
}
