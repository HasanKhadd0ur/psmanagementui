import { Component, Input } from '@angular/core';
import { FinancialSpending } from '../../../projects/models/responses/financialSpending';

@Component({
  selector: 'financial-spend-table',
  templateUrl: './financial-spend-table.component.html',
  styleUrl: './financial-spend-table.component.css'
})
export class FinancialSpendTableComponent {

  @Input() financialSpending:FinancialSpending[]
}
