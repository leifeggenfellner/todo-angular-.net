import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newTodo, Todo } from '@models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/todo';

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/details/${id}`);
  }

  addTodo(todo: newTodo): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/create`, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/edit/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
