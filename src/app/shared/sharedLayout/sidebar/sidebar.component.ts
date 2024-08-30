import { Component, Input, input, OnInit } from '@angular/core';
import { NavItem } from '../../componenets/nav-item/nav-item.component';
import { UserService } from '../../../core/services/authentication/user.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
  id : number 
 


  roles :string[]
  
  constructor(private userService : UserService){}
  @Input() isToggled: Boolean;  

  ngOnInit(): void {
    this.roles=this.userService.getCurrentUser().roles.map(e => e.name)
    this.id= this.userService.getEmployeeId();
  }



  hasRole(roleName: string): boolean {
    return this.roles.filter(e => e == roleName).length != 0 
  }
    
}
