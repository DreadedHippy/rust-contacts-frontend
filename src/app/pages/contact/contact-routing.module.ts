import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactPage } from './contact.page';

const routes: Routes = [
  {
    path: '',
    component: ContactPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then( m => m.NewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactPageRoutingModule {}
