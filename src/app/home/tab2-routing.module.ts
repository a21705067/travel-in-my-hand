import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class Tab2PageRoutingModule {}