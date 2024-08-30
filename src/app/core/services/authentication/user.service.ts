import { Injectable } from '@angular/core';
import { DataStorageService } from '../dataStorage/data-storage.service';
import { User } from '../../models/users/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private dataStorage : DataStorageService) { }
  
  // this method responsible for get the current user details 
  getCurrentUser():User{
      return JSON.parse( this.dataStorage.getItem("userDetails"));
  }

  // this meth responsible le for get the current logged employee id 
  getEmployeeId() :number{
    return this.getCurrentUser().employeeId;
  }

  getCurrentUserRoles() {
    return this.getCurrentUser().roles;
  }

  // fo first name 
  getUserFirstName():string{
      return JSON.parse( this.dataStorage.getItem("userDetails")).firstName;
  }
  // for last name 
  getUserLastName():string{
    return JSON.parse( this.dataStorage.getItem("userDetails")).lastName;
  }

  // the method check fora given role 
  hasRole(roleName :string) : boolean{

    return this
    .getCurrentUser()
    .roles
    .filter(e => e.name == roleName)
    .length !=0; 
  }
  
}
