import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment } from '../../models/responses/attachment';
import { ConfigurationService } from '../../../core/services/configuration/configuration.service';

@Component({
  selector: 'attahment-item',
  templateUrl: './attahment-item.component.html',
  styleUrl: './attahment-item.component.css'
})
export class AttahmentItemComponent {
  @Input() attachment : Attachment
  @Output() selected = new EventEmitter<Attachment>()

  @Output() detled = new EventEmitter<Attachment>()
  constructor(

    public config :ConfigurationService

  ){}
  onSelected() {
    this.selected.emit(this.attachment)
  }

  onDelete() {
    this.detled.emit(this.attachment);  
  }
    
}
