import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data: Array<Contact> = [
    {id: 1, name: "John Doe", number: "08012345678", img_src: "https://ionicframework.com/docs/img/demos/card-media.png"},
    {id: 2, name: "Test2", number: "08012445678", img_src: "https://ionicframework.com/docs/img/demos/card-media.png"},
    {id: 3, name: "Test3", number: "08016445678", img_src: "https://ionicframework.com/docs/img/demos/card-media.png"},
  ]

  constructor() { }

  getData(id: number): Contact {
    let data = this.data.find(elem => elem.id == id);

    if(data){
      return data
    }else {
      return {id: 0, name: "Testname", number: "09193232", img_src: "https://ionicframework.com/docs/img/demos/card-media.png"}
    }
  }

}
