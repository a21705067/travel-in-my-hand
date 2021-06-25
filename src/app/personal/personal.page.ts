import { Component, OnInit, NgModule } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FireAuthService } from '../services/fire-auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
    userTravels

  constructor(public authService: FireAuthService,
              public loadingController: LoadingController, private db: AngularFirestore) {

              db.collection('places').valueChanges().subscribe(dados => (this.userTravels = dados));
  }

  ngOnInit() {
  }

}
