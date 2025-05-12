import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, MatIconModule, MatButtonModule, MatTooltipModule, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  constructor(public dialog: MatDialog){}

  openNewTaskDialog(){
    this.dialog.open(NewTaskComponent)
  }
}
