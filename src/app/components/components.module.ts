import {ModalComponent} from './modal/modal.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ModalComponent
  ],
  exports: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]

})
export class ComponentsModule { }
