import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../services/photo.service';
import {Observable} from 'rxjs';
import {FireAuthService} from '../services/fire-auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    public images: Observable<Array<Observable<any>>>;

    constructor(public photoService: PhotoService, public authService: FireAuthService, public router: Router,
                public loadingController: LoadingController) {
    }

    public ngOnInit() {
        this.images = this.photoService.loadSaved();
    }

    public logout(): void {
        this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
    }

    public async loading(): Promise<void> {
        const loading = await this.loadingController.create({message: 'Loading', translucent: true, spinner: 'circles'});
        loading.present();
    }

    public profile(): void {
        this.router.navigate(['/profile']);
    }

    public travels(): void {
        this.router.navigate(['/mytravels']);
    }

    public map(): void {
        this.router.navigate(['/map']);
    }

    public search(): void {
        this.router.navigate(['/search']);
    }
}
