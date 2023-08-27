import { Component, OnInit, effect } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/interfaces/contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  image = "../../../assets/icon/favicon.png"
  contacts: Contact[] = [];
  displayedContacts: Contact[] = [];

  constructor(private contactSrv: ContactService, private router: Router) {
    effect(() => {
      this.contacts = contactSrv.contactList()
      this.displayedContacts = [...this.contacts];
    })
  }

  ngOnInit() {
    this.getContacts();
  }

  seeContactDetails(id: number) {
    this.router.navigateByUrl(`/contact/${id}`)
  }

  async getContacts() {
    this.contacts = await this.contactSrv.getContacts();
  }

  onSearchChange(e: any) {
    const query = e.target.value.toLowerCase();
    this.displayedContacts = this.contacts.filter((elem) =>
      elem.name.toLowerCase().indexOf(query) > -1 || elem.number.toLowerCase().indexOf(query) > -1
    );
  }

}

// interface Contact {
//   id: number,
//   name: string,
//   number: string,
//   img_src: string

// }
