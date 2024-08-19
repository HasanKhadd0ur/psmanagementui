import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../core/services/loading/loading-service.service';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
  isLoading$: Observable<boolean> = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) {

  }
}
