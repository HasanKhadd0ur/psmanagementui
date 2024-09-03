import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/responses/department';
import { EmployeesService } from '../../../employees/services/employees.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetProjecByFilterRequest } from '../../models/requests/project-requests/getProjectAttachmentsRequest';

@Component({
  selector: 'filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent implements OnInit{

  departments : Department[]

  request : GetProjecByFilterRequest
  constructor(
    private employeeService :EmployeesService,
    private activeModal :NgbActiveModal
  ) {
    
  }

  ngOnInit(): void {
    
    this.request= {
      projectName:'',
      proposerName:'',
      teamLeaderName:'',
      departmentName:''
    }
      this
      .employeeService
      .getDepartments()
      .subscribe({

        next:(data)=>{
          this.departments=data
        }
      });
  }

  onSubmit(){

    this
    .activeModal
    .close(this.request);
  }

  onClose(){
    this.activeModal.close();
  }
}
