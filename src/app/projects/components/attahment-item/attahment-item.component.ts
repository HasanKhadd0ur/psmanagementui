//#region  Imports
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment } from '../../models/responses/attachment';
import { ConfigurationService } from '../../../core/services/configuration/configuration.service';
import { ProjectService } from '../../services/project.service';
import { last } from 'rxjs';
//#endregion  Imports


@Component({
  selector: 'attahment-item',
  templateUrl: './attahment-item.component.html',
  styleUrl: './attahment-item.component.css'
})
export class AttahmentItemComponent {

  //#region  Dependencies
  @Input() attachment : Attachment
  @Output() selected = new EventEmitter<Attachment>()
  @Output() detled = new EventEmitter<Attachment>()
  //#endregion  Dependencies
  
  //#region  Constructor
  constructor(
    private projectService :ProjectService,
    public config :ConfigurationService

  ){}

  //#endregion  Constructor
  
  
  //#region  Selction
  onSelected() {
    this.selected.emit(this.attachment)
  }
  //#endregion  Selction
 
  //#region  Download
  onDelete() {
    this.detled.emit(this.attachment);  
  }

  download() {
    this
    .projectService
    .getAttacmenfFile(this.attachment.id,this.attachment.attachmentUrl)
    .subscribe({
      next: (response) => {
        const fileName =this.attachment.attachmentName+"."+this.attachment.attachmentUrl.split('.').reverse()[0];

        // Create a new Blob object using the response data
        const blob = new Blob([response], { type: response.type });

        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Set the file name for download
        document.body.appendChild(a); // Append the link to the body
        a.click(); // Simulate a click on the link to start download
        document.body.removeChild(a); // Remove the link from the body
        window.URL.revokeObjectURL(url); // Clean up the URL object
      }
      , 
      error:(error) => {
        console.error('Error downloading file', error);
      
      
      }

    });
  }
  //#endregion  Download
  

}
