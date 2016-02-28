import {Component, Output, EventEmitter} from 'angular2/core';
import {Todo} from '../models/todo';
@Component({
  selector: 'todo-form',
  template: `
    <div class="panel">
    <h3>New Todo</h3>
    <form (ngSubmit)="addTodo()">
      <input type="text" [(ngModel)]="task" size="30"
             placeholder="add new todo here">
      <input class="button" type="submit" value="add">
    </form>
    </div>`
})
export class TodoForm {
  @Output() newTask = new EventEmitter<Todo>();
  task: string = '';
  addTodo() {
    if (this.task) {
      this.newTask.next({text:this.task, done:false});
    }
    this.task = '';
  }
}
