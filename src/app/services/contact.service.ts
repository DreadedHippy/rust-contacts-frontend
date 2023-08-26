import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../interfaces/contact';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactList: WritableSignal<Contact[]> = signal([]);

  constructor(private http: HttpClient, private toastCtrl: ToastController) { }

  getContacts(): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseUrl + "/contact").subscribe({
        next: (result: any) => {
          this.contactList.set(result.data);
          resolve(result.data)
        },
        error: (err) => {
          console.log(err);
          reject(err)
        }
      })
    })
  }

  createContacts(data: Contact) {
    return this.http.post(environment.baseUrl + '/contact/new', data);
  }

  deleteContact(id: number) {
    return this.http.get(environment.baseUrl + `/contact/${id}/delete`);
  }



  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
