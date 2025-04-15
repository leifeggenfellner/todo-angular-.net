import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewChecked,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  lucideTrash2,
  lucideCheck,
  lucidePencil,
  lucidePencilOff,
  lucideSendHorizontal,
  lucideRedo2,
} from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Todo } from '@models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  providers: [
    provideIcons({
      lucideTrash2,
      lucideCheck,
      lucidePencil,
      lucidePencilOff,
      lucideSendHorizontal,
      lucideRedo2,
    }),
  ],
  imports: [CommonModule, NgIcon, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements AfterViewChecked {
  @Input() todo!: Todo;
  @ViewChild('editInput') editInput?: ElementRef<HTMLInputElement>;

  @Input() completed: boolean = false;

  @Output() complete = new EventEmitter<Todo>();
  @Output() uncomplete = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() cancelEdit = new EventEmitter<Todo>();
  @Output() update = new EventEmitter<Todo>();

  private shouldFocus = false;

  ngAfterViewChecked(): void {
    if (this.todo.editing && this.shouldFocus && this.editInput) {
      this.editInput.nativeElement.focus();
      this.shouldFocus = false;
    }
  }

  triggerFocus() {
    this.shouldFocus = true;
  }
}
