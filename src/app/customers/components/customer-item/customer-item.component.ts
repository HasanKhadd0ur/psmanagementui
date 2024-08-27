import { Component, Input } from '@angular/core';
import { Customer } from '../../models/responses/customer';

@Component({
  selector: 'customer-item',
  templateUrl: './customer-item.component.html',
  styleUrl: './customer-item.component.css'
})
export class CustomerItemComponent {

  @Input() customer : Customer ;
  
  constructor (){}

}
