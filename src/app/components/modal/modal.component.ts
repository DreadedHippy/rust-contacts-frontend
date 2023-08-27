import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  confirm(){
    return this.modalCtrl.dismiss('delete', 'confirm')
  }

  cancel(){
    return this.modalCtrl.dismiss('return', 'dismiss')
  }

}
