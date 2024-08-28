import { Component, Input } from '@angular/core';
import { Track } from '../../../../tracks/models/responses/track';

@Component({
  selector: 'tracks-table',
  templateUrl: './track-row-item.component.html',
  styleUrl: './track-row-item.component.css'
})
export class TrackRowItemComponent {
  @Input() tracks : Track[]
}
