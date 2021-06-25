import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FireAuthService } from '../services/fire-auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  mainuser: AngularFirestoreDocument;
  userTravels

  constructor(public authService: FireAuthService, public loadingController: LoadingController, private db: AngularFirestore) {

       this.mainuser = db.collection('utilizador').doc(this.authService.getUID());
       this.mainuser.collection('myTravels').valueChanges().subscribe(dados => (this.userTravels = dados));
  }

  ngOnInit() {
  }

}
