import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Todo } from '@models/todo.model';
import { TodoItemComponent } from '@components/display/todo-item/todo-item.component';
import { NgFor, CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPaperAirplaneSolid } from '@ng-icons/heroicons/solid';

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
  todos = [
    { id: 1, text: 'Learn Angular', completed: false },
    { id: 2, text: 'Learn TypeScript', completed: false },
    { id: 3, text: 'Learn RxJS', completed: false },
    { id: 4, text: 'Learn NgRx', completed: false },
    { id: 5, text: 'Learn NgRx Store', completed: false },
    { id: 6, text: 'Learn NgRx Effects', completed: false },
    { id: 7, text: 'Learn NgRx Router Store', completed: false },
  ];

  completed_todos = new Array<Todo>();

  addTodo() {
    if (this.todo_input.trim() === '') {
      return;
    }

    const newTodo = {
      id: this.todos.length + 1,
      text: this.todo_input,
      completed: false,
    };

    this.todos.push(newTodo);
    this.todo_input = '';
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.completed_todos = this.completed_todos.filter(
      (todo) => todo.id !== id
    );
  }

  completeTodo(todo: Todo) {
    if (todo) {
      todo.completed = true;
      this.completed_todos.push(todo);
      this.todos = this.todos.filter((_todo) => _todo.id !== todo.id);
    }
  }

  uncompleteTodo(todo: Todo) {
    if (todo) {
      todo.completed = false;
      this.todos.push(todo);
      this.completed_todos = this.completed_todos.filter(
        (_todo) => _todo.id !== todo.id
      );
    }
  }

  editTodo(todo: Todo) {
    this.todo_input_pre_edit = todo.text;
    todo.editing = true;
  }

  cancelEdit(todo: Todo) {
    todo.text = this.todo_input_pre_edit;
    todo.editing = false;
  }

  updateTodo(todo: Todo) {
    if (todo.text.trim() === '') {
      return;
    }

    todo.editing = false;
  }

  trackById(index: number, item: Todo) {
    return item.id;
  }
}
