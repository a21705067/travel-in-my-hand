import { Component, OnInit } from '@angular/core';
import {PhotoService} from '../services/photo.service';
import {FireAuthService} from '../services/fire-auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-mytravels',
  templateUrl: './mytravels.page.html',
  styleUrls: ['./mytravels.page.scss'],
})
export class MytravelsPage implements OnInit {
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
    loading.present();
  }

  geostar() {
    this.router.navigate(['']);
  }

  topatlantico() {
    this.router.navigate(['']);
  }

  abreu() {
    this.router.navigate(['']);
  }

  besttravel() {
    this.router.navigate(['']);
  }

  public home(): void {
      this.router.navigate(['/home']);
  }

  public map(): void {
      this.router.navigate(['/map']);
  }

  public search(): void {
      this.router.navigate(['/search']);
  }

  public camera(): void {
          this.router.navigate(['/camera']);
  }
}
