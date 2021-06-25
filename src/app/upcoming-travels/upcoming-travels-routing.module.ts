import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingTravelsPage } from './upcoming-travels.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingTravelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingTravelsPageRoutingModule {}
