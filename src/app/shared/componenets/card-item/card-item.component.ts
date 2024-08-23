import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-item',
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {

  @Input() item : {
    navigate : string ,
    icon :String ,
    name :string ,
    params : any []
  }
}
