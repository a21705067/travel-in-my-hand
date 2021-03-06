import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FirestoreService } from './firestore.service';
import { RouterModule, Router } from '@angular/router';
import { auth } from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  authState: any = null;

  constructor(private firebaseService: FirestoreService, public afAuth: AngularFireAuth, public router: Router) {
  }

  public doRegister(value: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password);
  }

  public doLogin(value: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(value.email, value.password);
  }

  public doLogout(): Promise<void> {
    this.firebaseService.unsubscribeOnLogout();
    return this.afAuth.auth.signOut();
  }

  public resetPassword(email: string): Promise<void> {
    console.log(email);
    return firebase.auth().sendPasswordResetEmail(email);
  }

  public getUID() {
    return firebase.auth().currentUser.uid;
  }

  public getUsername() {
  	return firebase.auth().currentUser;
  }

  public reAuth(email: string, password: string) {
  	return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password));
  }

  public updatePassword(newpassword: string) {
  	return this.afAuth.auth.currentUser.updatePassword(newpassword);
  }

}
