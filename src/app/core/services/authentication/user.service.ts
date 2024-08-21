import { Injectable } from '@angular/core';
import { DataStorageService } from '../dataStorage/data-storage.service';
import { User } from '../../models/users/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private dataStorage : DataStorageService) { }
    
  getCurrentUser():User{
      return JSON.parse( this.dataStorage.getItem("userDetails"));
  }

  getEmployeeId() :number{
    return this.getCurrentUser().employeeId;
  }
  getUserFirstName():string{
      return JSON.parse( this.dataStorage.getItem("userDetails")).firstName;
  }
  getUserLastName():string{
    return JSON.parse( this.dataStorage.getItem("userDetails")).lastName;
}
}
