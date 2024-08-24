import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Track } from '../../models/responses/track';

@Component({
  selector: 'track-item',
  templateUrl: './track-item.component.html',
  styleUrl: './track-item.component.css'
})
export class TrackItemComponent {
  @Input() track :Track

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  
  onDelete() {
    this.delete.emit();
  }

}
