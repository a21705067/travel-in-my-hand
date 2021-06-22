import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { PersonalPageModule } from '../personal/personal.module';
import { FollowingPageModule } from '../following/following.module';
import { PartnersDealsPageModule } from '../partners-deals/partners-deals.module';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    SuperTabsModule,
    PersonalPageModule,
    FollowingPageModule,
    PartnersDealsPageModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
