import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PhotoService} from '../services/photo.service';
import {FireAuthService} from '../services/fire-auth.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(public photoService: PhotoService, public authService: FireAuthService, public router: Router,
              public loadingController: LoadingController) {
  }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
  }

  public async loading(): Promise<void> {
    const loading = await this.loadingController.create({message: 'Loading', translucent: true, spinner: 'circles'});
    await loading.present();
  }
}
