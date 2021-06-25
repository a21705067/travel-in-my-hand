import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FireAuthService } from '../services/fire-auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RouterModule, Router } from '@angular/router';
import { LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { PersonalPage } from '../personal/personal.page';
import { FollowingPage } from '../following/following.page';
import { PartnersDealsPage } from '../partners-deals/partners-deals.page';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
    personalPage = PersonalPage;
    followingPage = FollowingPage;
    partnersDealsPage = PartnersDealsPage;

    travels
    userTravels
    friendsTravels
    partnersDeals
    mainuser: AngularFirestoreDocument

    constructor(public authService: FireAuthService, public router: Router,
                public loadingController: LoadingController, private db: AngularFirestore) {

               this.mainuser = db.collection('utilizador').doc(this.authService.getUID());

               db.collection('places').valueChanges().subscribe(dados => (this.userTravels = dados));
    }

    public ngOnInit(

    ) {}

    public logout(): void {
        this.authService.doLogout().then(() => this.router.navigate(['/login']), err => console.log(err));
    }

    public async loading(): Promise<void> {
        const loading = await this.loadingController.create({message: 'Loading', translucent: true, spinner: 'circles'});
        loading.present();
    }

}
