import {Component, Output, EventEmitter, Input} from 'angular2/core';
import {Todo} from '../models/todo';
@Component({
  selector: 'todo-form',
  template: `
    <div class="callout primary">
    <h3 *ngIf="newTodo">New Todo</h3>
    <h3 *ngIf="!newTodo">Edit of Todo {{todo.id}}</h3>
    <form #f="ngForm" (ngSubmit)="submitTodo(f.value)">
      <input type="text" [value]="todo.text" size="30" ngControl="todoText"
             placeholder="add new todo here">
      <input class="button" type="submit" value="Save">
    </form>
    </div>`
})
export class TodoForm {
  @Output() formSubmitted = new EventEmitter<Todo>();
  @Input() todo : Todo;
  @Input() newTodo : boolean;

  submitTodo(form) {
    if (this.todo) {
      this.todo.text = form.todoText;
      this.newTodo = true;
      this.formSubmitted.emit(this.todo);
    }
  };
  addTodo() {
      this.formSubmitted.emit(this.todo);
  };
}
