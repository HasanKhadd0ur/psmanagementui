import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment } from '../../models/responses/attachment';

@Component({
  selector: 'attahment-item',
  templateUrl: './attahment-item.component.html',
  styleUrl: './attahment-item.component.css'
})
export class AttahmentItemComponent {
  @Input() attachment : Attachment
  @Output() selected = new EventEmitter<Attachment>()

  onSelected() {
    this.selected.emit(this.attachment)
  }


}
