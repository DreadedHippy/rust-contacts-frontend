import { Component, OnInit, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contact!: Contact
  contacts: Contact[] = [];
  private activatedRoute = inject(ActivatedRoute);

  constructor(
    private router: Router,
    private contactSrv: ContactService,
    private modalCtrl: ModalController
    ) {
    effect(() => {
      this.contacts = contactSrv.contactList();
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id') as string);
    if (this.contacts.length < 1) {
      this.router.navigateByUrl("/home");
      return
    }
    let data = this.contacts.find((elem) => elem.id == id);
    if (data){
      this.contact = data;
    } else {
      this.router.navigateByUrl("/home");
    }

  }

  deleteContact() {
    this.contactSrv.deleteContact(this.contact.id!).subscribe({
      next: (res) => {
        console.log(res)
        this.contactSrv.getContacts();
        this.router.navigateByUrl("/home");
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      breakpoints: [0.25, 0.5, 0.75, 1],
      initialBreakpoint: 0.25
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.deleteContact();
    }
  }
}
