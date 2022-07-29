import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { formatDate } from '@angular/common';
 
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
 
export class TaskDetailComponent implements OnInit {
 
  getId: any;
  updateForm: FormGroup;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
 
    this.crudService.GetBook(this.getId).subscribe(res => {
      this.updateForm.setValue({
        title: res['title'],
        description: res['description'],
        startTime: formatDate(res.startTime, 'yyyy-MM-dd', 'en'),
        endTime: formatDate(res.endTime, 'yyyy-MM-dd', 'en'),
        priority: res['priority'],
        status: res['status'],
      });
    });
    
    this.updateForm = this.formBuilder.group({
      title: [''],
      description: [''],
      startTime: [''],
      endTime: [''],
      priority: [''],
      status: true,
    })


    this.updateForm.disable();
  }
 
  ngOnInit() { }
 
  onUpdate(): any {
    let model = {
      title : this.updateForm.value.title,
      description : this.updateForm.value.description,
      startTime : this.updateForm.value.startTime,
      endTime : this.updateForm.value.endTime,
      priority : this.updateForm.value.priority,
      status: true
    }
    this.crudService.updateBook(this.getId, model)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/tasks-list'))
      }, (err) => {
        console.log(err);
    });
  }

 
}