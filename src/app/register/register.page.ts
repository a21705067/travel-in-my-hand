import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireAuthService } from '../services/fire-auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public validationsForm: FormGroup;
  public errorMessage = '';
  public successMessage = '';
  public validationMessages = {
    fullName: [
          {type: 'required', message: 'Full Name is required.'}
    ],
    email: [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Enter a valid email.'}
    ],
    password: [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be at least 6 characters long.'}
    ]
  };

  constructor(
      private authService: FireAuthService,
      private formBuilder: FormBuilder,
      private router: Router,
      private db: AngularFirestore,
      private alertCtrl: AlertController
  ) {
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertCtrl.create({
        header: title,
        message: content,
        buttons: ['OK']
    })

    await alert.present();
  }

  public ngOnInit(): void {
    this.validationsForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  public tryRegister(value: { fullName: string, email: string, password: string }): void {
    this.authService.doRegister(value)
        .then(res => {
          console.log(res);
          this.errorMessage = '';
          this.db.collection('utilizador').doc(this.authService.getUID()).set({
            fullName: value.fullName,
            email: value.email,
            happy: null,
            picture: null,
            notifications: false,
            newsletter: false,
            camera: false,
            gallery: false,
            age: null
          });
          this.db.collection('utilizador').doc(this.authService.getUID()).collection('friends').doc(this.authService.getUID()).set({
            friendID: null,
            friendFullName: null,
            friendPicture: null
          });
          this.presentAlert('Success', 'Account created.');
          this.router.navigate(['/home']);
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = '';
        });
  }

  public goLoginPage(): void {
    this.router.navigate(['/login']);
  }


}
