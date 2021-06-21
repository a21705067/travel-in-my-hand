import {Component, OnInit, NgModule, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {FireAuthService} from '../services/fire-auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {RouterModule, Router} from '@angular/router';
import {LoadingController, IonInfiniteScroll} from '@ionic/angular';
import {FirestoreService} from '../services/firestore.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    tabId: string = 'Personal';
    travels
    user: string
    mainuser: AngularFirestoreDocument
    placeID: any

    showTab (tabIdPageName) {
       this.tabId = tabIdPageName;
    }

    loadData(event) {
        setTimeout(() => {
          console.log('Done');
          event.target.complete();

          if (this.travels.length == 5) {
            event.target.disabled = true;
          }
        }, 500);
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
      }

    constructor(public authService: FireAuthService, public router: Router,
                public loadingController: LoadingController, private db: AngularFirestore) {

               this.user = this.authService.getUID();
               this.mainuser = db.collection('utilizador').doc(this.user);

//                this.places = db.collection('places').get().subscribe()

//                this.travels = this.mainuser.collection('myTravels').get()
//                    .subscribe((querySnapshot) => {
//                      querySnapshot.forEach((dados: any) => {
//                      this.placeID.push(dados.placeID)
//                      });
//                });


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
