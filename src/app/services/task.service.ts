import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';
import { AuthService } from './auth.service';
  
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Helper method to create headers with auth token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get all tasks
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // Get a single task by ID
  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Create a new task
  createTask(taskData: { title: string; description?: string; status?: string; dueDate?: Date }): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, taskData, {
      headers: this.getHeaders()
    });
  }

  // Update a task
  updateTask(id: string, taskData: { title?: string; description?: string; status?: string; dueDate?: Date }): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, taskData, {
      headers: this.getHeaders()
    });
  }

  // Delete a task
  deleteTask(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
