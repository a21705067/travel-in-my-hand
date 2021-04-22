import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    IonicModule
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
