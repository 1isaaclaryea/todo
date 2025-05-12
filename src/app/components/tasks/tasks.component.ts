import { Component, OnInit } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TaskService } from '../../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../interfaces/Task';
  
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule, 
    NewTaskComponent,
    HttpClientModule
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  tasks: Task[] = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  openNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.loadTasks();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log('User Tasks:', tasks);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }
}
