import { Component, OnInit } from '@angular/core';
import { FireAuthService } from '../services/fire-auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})


export class PasswordPage implements OnInit {

  public validationsForm: FormGroup;
  public errorMessage = '';
  public successMessage = '';
  public validationMessages = {
    email: [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Enter a valid email.'}
    ]
  };

  constructor(
      private formBuilder: FormBuilder,
      private authService: FireAuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  resetPassword(): void {
    const email = this.validationsForm.controls['email'].value;

    this.authService.resetPassword(email)
        .then(() => {
          alert('A password reset link has been sent to your email address');
          this.router.navigate(['/login']);
        }, err => {
          this.errorMessage = err.message;
          console.log(err);
        });
  }

  public goLoginPage(): void {
      this.router.navigate(['/login']);
  }

}
