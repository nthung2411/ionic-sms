import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SmsPage } from './sms.page';
import { SmsDetailComponent } from './sms-detail/sms-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SmsPage
  },
  {
    path: ':id',
    component: SmsDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SmsPage,
    SmsDetailComponent
  ]
})
export class SmsPageModule { }
