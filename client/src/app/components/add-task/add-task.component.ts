import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
 
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
 
export class AddTaskComponent implements OnInit {
 
  taskForm: FormGroup;
  submitted:boolean = false;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) { 
    this.taskForm = this.formBuilder.group({
      title: new FormControl("",Validators.required),     
      description: new FormControl("",Validators.required),   
      startTime: new FormControl("",Validators.required),   
      endTime: new FormControl("",Validators.required),   
      priority: new FormControl("",Validators.required),   
      status: new FormControl(false),   
    })
  }
 
  ngOnInit() { }
 
  onSubmit(): any {
    this.submitted = true; // disable patch
    if (this.taskForm.invalid) {
      return
    }
    this.crudService.AddBook(this.taskForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/tasks-list'))
      }, (err) => {
        console.log(err);
    });
  }
 
}