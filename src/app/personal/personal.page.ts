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
    mainuser: AngularFirestoreDocument;
    userTravels

  constructor(public authService: FireAuthService,
              public loadingController: LoadingController, private db: AngularFirestore) {

              this.mainuser = db.collection('utilizador').doc(this.authService.getUID());

              this.mainuser.collection('myTravels').valueChanges().subscribe(dados => (this.userTravels = dados));
  }

  ngOnInit() {
  }

}
