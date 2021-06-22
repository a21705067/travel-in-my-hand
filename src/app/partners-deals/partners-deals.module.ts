import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PartnersDealsPage } from './partners-deals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [PartnersDealsPage],
  entryComponents: [PartnersDealsPage]
})
export class PartnersDealsPageModule {}
