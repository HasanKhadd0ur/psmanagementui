import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  setItem(key : string , value : string){
      localStorage.setItem(key,value);
  }
  getItem(key : string ):any{
    return localStorage.getItem(key);
  }
  clear(){
    localStorage.clear();
  }
}
