import { Component, Input } from '@angular/core';

export interface NavItem {
  name : string ,
  child : NavItem []| null,
  haschild:boolean

}
@Component({
  selector: 'nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {
@Input()item:NavItem
}
