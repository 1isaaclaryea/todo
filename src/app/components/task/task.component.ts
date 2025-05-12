import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { Task } from '../../interfaces/Task';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'task',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    DatePipe
  ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<Task>();

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  updateTaskStatus(completed: boolean): void {
    if (this.task._id) {
      const newStatus = completed ? 'completed' : 'pending';
      
      this.taskService.updateTask(this.task._id, { status: newStatus }).subscribe({
        next: (updatedTask) => {
          this.task = updatedTask;
          this.taskUpdated.emit(updatedTask);
          this.snackBar.open(`Task marked as ${newStatus}`, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Failed to update task status. Please try again.';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          console.error('Task status update failed:', error);
        }
      });
    }
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '400px',
      data: { ...this.task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(this.task, result);
        this.taskUpdated.emit(this.task);
        this.snackBar.open('Task updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      }
    });
  }

  deleteTask(): void {
    if (this.task._id) {
      this.taskService.deleteTask(this.task._id).subscribe({
        next: () => {
          this.snackBar.open('Task deleted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.taskDeleted.emit();
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Failed to delete task. Please try again.';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          console.error('Task deletion failed:', error);
        }
      });
    }
  }
}
