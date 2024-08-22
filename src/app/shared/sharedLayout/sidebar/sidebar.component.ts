import { Component, Input, input, OnInit } from '@angular/core';
import { NavItem } from '../../componenets/nav-item/nav-item.component';
import { UserService } from '../../../core/services/authentication/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
  id : number 
  
  constructor(private userService : UserService){}
  @Input() isToggled: Boolean;  

  ngOnInit(): void {
    this.id= this.userService.getEmployeeId();
  }

}
