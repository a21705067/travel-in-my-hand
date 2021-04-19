import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MytravelsPage } from './mytravels.page';
import {ProfilePage} from '../profile/profile.page';

const routes: Routes = [
  {
    path: '',
    component: MytravelsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: MytravelsPage }])
  ],
  declarations: [MytravelsPage]
})
export class MytravelsPageModule {}
