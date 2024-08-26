import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FinancialSpending } from '../../models/responses/financialSpending';

@Component({
  selector: 'financial-item',
  templateUrl: './financial-item.component.html',
  styleUrl: './financial-item.component.css'
})
export class FinancialItemComponent {
  @Input() item :FinancialSpending

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
