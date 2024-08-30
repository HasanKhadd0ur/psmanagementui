import { Component, Input } from '@angular/core';

export interface NavItem {
  name : string ,
  isCollapsed:boolean
  requiredRole  : string ,
  icon : string ,
  isBar :boolean,
  queryParams: string
  routing : string 
}


@Component({
  selector: 'nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {
@Input()item:NavItem
}
