import {Component, Input} from 'angular2/core';
import {Todo} from '../models/todo';

@Component({
  selector: 'todo-list',
  styles: [`
    .done-true {
      text-decoration: line-through;
      color: grey;
    }`
  ],
  template: `
    <div class="panel">
    <h3>List of Todos</h3>
    <ul class="unstyled">
      <li *ngFor="#todo of todos">
        <input type="checkbox" [(ngModel)]="todo.done">
        <span class="done-{{todo.done}}">{{todo.text}}</span>
      </li>
    </ul>
    </div>`
})
export class TodoList {
  @Input() todos: Todo[];
}
