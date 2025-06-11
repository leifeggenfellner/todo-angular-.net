import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Todo, newTodo } from '@models/todo.model';
import { TodoItemComponent } from '@components/display/todo-item/todo-item.component';
import { NgFor, CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPaperAirplaneSolid } from '@ng-icons/heroicons/solid';
import { TodoService } from '@services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoItemComponent, NgFor, CommonModule, NgIcon, FormsModule],
  providers: [provideIcons({ heroPaperAirplaneSolid })],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  todo_input = '';
  todo_input_pre_edit = '';
  todos: Todo[] = [];
  completed_todos: Todo[] = [];

  private todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.getTodos().subscribe({
      next: (fetchedTodos: Todo[]) => {
        this.todos = fetchedTodos.filter((todo) => !todo.isCompleted);
        this.completed_todos = fetchedTodos.filter((todo) => todo.isCompleted);
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
      },
    });
  }

  addTodo() {
    if (this.todo_input.trim() === '') {
      return;
    }

    const newTodo: newTodo = {
      title: this.todo_input,
      isCompleted: false,
    };

    this.todoService.addTodo(newTodo).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.todo_input = '';
      },
      error: (error) => {
        console.error('Error adding todo:', error);
      },
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.completed_todos = this.completed_todos.filter(
          (todo) => todo.id !== id
        );
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      },
    });
  }

  toggleTodoCompletion(todo: Todo) {
    if (!todo) return;

    todo.isCompleted = !todo.isCompleted;

    this.todoService.updateTodo(todo).subscribe({
      next: () => {
        if (todo.isCompleted) {
          this.completed_todos.push(todo);
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        } else {
          this.todos.push(todo);
          this.completed_todos = this.completed_todos.filter(
            (t) => t.id !== todo.id
          );
        }
      },
      error: (error) => {
        console.error('Error updating todo:', error);
        todo.isCompleted = !todo.isCompleted;
      },
    });
  }

  editTodo(todo: Todo) {
    this.todo_input_pre_edit = todo.title;
    todo.editing = true;
  }

  cancelEdit(todo: Todo) {
    todo.title = this.todo_input_pre_edit;
    todo.editing = false;
  }

  updateTodo(todo: Todo) {
    if (todo.title.trim() === '') {
      return;
    }

    this.todoService.updateTodo(todo).subscribe({
      next: () => {
        todo.title = todo.title.trim();
        todo.editing = false;
        this.todo_input_pre_edit = '';
      },
      error: (error) => {
        console.error('Error updating todo:', error);
        todo.title = this.todo_input_pre_edit;
        todo.editing = false;
        this.todo_input_pre_edit = '';
      },
    });
  }

  trackById(index: number, item: Todo) {
    return item.id;
  }
}
