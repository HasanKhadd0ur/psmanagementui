import { Component, Input, input } from '@angular/core';
import { NavItem } from '../../componenets/nav-item/nav-item.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  items : NavItem[ ]=[
    {
      name: "الصفحة الرئيسية",
      haschild:false,
      child:[]
    }

  ]
  @Input() isToggled: Boolean;  
}
