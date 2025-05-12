import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../interfaces/Task';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.editForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description || ''],
      status: [data.status || 'TODO'],
      dueDate: [data.dueDate ? new Date(data.dueDate) : null]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.data._id) {
      const updatedTask = {
        ...this.editForm.value,
        _id: this.data._id
      };

      this.taskService.updateTask(this.data._id, this.editForm.value).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Failed to update task. Please try again.';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          console.error('Task update failed:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
