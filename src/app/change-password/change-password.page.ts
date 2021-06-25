import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FireAuthService } from '../services/fire-auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  mainuser: AngularFirestoreDocument
  email
  password: string
  newpassword: string

  busy: boolean = false

  constructor(private db: AngularFirestore, private router: Router, private alertController: AlertController,
              private auth: FireAuthService) {

              this.mainuser = db.collection('utilizador').doc(this.auth.getUID());

              this.email = this.mainuser.valueChanges().subscribe(dados => {
                  this.email = dados.email
              });
  }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
        header: title,
        message: content,
        buttons: ['OK']
    })

    await alert.present()
  }

  async updateDetails() {
    this.busy = true

    if(!this.password) {
        this.busy = false
        return this.presentAlert('Error!', 'You have to enter a password')
    }

    try {
        await this.auth.reAuth(this.email, this.password)
    } catch(error) {
        this.busy = false
        return this.presentAlert('Error!', 'Wrong password!')
    }

    if(this.newpassword) {
        await this.auth.updatePassword(this.newpassword)
    }

    this.password = ""
    this.newpassword = ""
    this.busy = false

    await this.presentAlert('Done!', 'Your password was changed!')

    this.router.navigate(['/home'])
  }

}
