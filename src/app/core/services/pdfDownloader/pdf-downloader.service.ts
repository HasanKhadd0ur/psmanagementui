import { Injectable } from '@angular/core';

import domToImage from 'dom-to-image';
import jsPDF from 'jspdf';
import moment from 'moment';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfDownloaderService {

  constructor() { }
  public downloadAsPdf(identifier :string){
    const element = document.getElementById(`${identifier}`);
    const customFont = 'data:font/truetype;base64,https://fonts.googleapis.com/icon?family=Material+Icons';
   
    if (element) {
      html2canvas(element, { scale: 3, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'p',
          unit: 'mm',
          format: 'a4',
          putOnlyUsedFonts: true}); // Enable Unicode text

        pdf.addFileToVFS('CustomFont.ttf', customFont);
        pdf.addFont('CustomFont.ttf', 'CustomFont', 'normal');
        pdf.setFont('CustomFont');
       
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('download.pdf'); // Save the PDF
      });
    } 
  
  }

}
