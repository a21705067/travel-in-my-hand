import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FireAuthService } from '../services/fire-auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-partners-deals',
  templateUrl: './partners-deals.page.html',
  styleUrls: ['./partners-deals.page.scss'],
})
export class PartnersDealsPage implements OnInit {
  partnersDeals

  constructor(public authService: FireAuthService,
              public loadingController: LoadingController, private db: AngularFirestore) {

    db.collection('partnersDeals').valueChanges().subscribe(dados => (this.partnersDeals = dados));

  }

  ngOnInit() {
  }

}
