import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      status: ['Not started', Validators.required],
      description: [''],
      dueDate: [null]
    });
  }

  ngOnInit(): void {
    // Here you would typically load the task data and patch the form
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      console.log('Updated task:', this.taskForm.value);
    }
  }

  onCancel(): void {
    console.log('Edit cancelled');
    // Here you would typically handle navigation back
  }
}
