import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  createContactForm = new FormGroup({
    name: new FormControl("", Validators.required),
    number: new FormControl("", [Validators.required, Validators.minLength(10)]),
    img_src: new FormControl(""),
    email: new FormControl(""),
  })

  constructor(private contactSrv: ContactService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.createContactForm.value);
    let data: Contact = {
      name: this.createContactForm.controls.name.value || '',
      number: this.createContactForm.controls.number.value || '',
      img_src: this.createContactForm.controls.img_src.value || '',
      email: this.createContactForm.controls.email.value || ''
    }

    this.contactSrv.createContacts(data).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl("/");
        this.createContactForm.reset();
      },
      error: (err) => {
        if (err.error.message.includes("UNIQUE constraint failed")) {
          if (err.error.message.includes("contacts.number")) {
            this.contactSrv.presentToast("middle", "This number is already in your contacts list")
          }
          if (err.error.message.includes("contacts.name")) {
            this.contactSrv.presentToast("middle", "This name is already in your contacts list")
          }
        }
        console.log(err.error);
      },
      complete: () => {}
    })
  }

}
