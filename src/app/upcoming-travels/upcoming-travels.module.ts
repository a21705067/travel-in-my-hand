import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingTravelsPageRoutingModule } from './upcoming-travels-routing.module';

import { UpcomingTravelsPage } from './upcoming-travels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingTravelsPageRoutingModule
  ],
  declarations: [UpcomingTravelsPage]
})
export class UpcomingTravelsPageModule {}
