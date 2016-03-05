import {Component, Input, EventEmitter, Output} from 'angular2/core';
import {Todo} from '../models/todo';
import {TodoForm} from './todo.form';
import {TodoRepository} from '../services/todo.repository';

@Component({
  selector: 'todo-list',
  styles: [`
    .done-true {
      text-decoration: line-through;
      color: grey;
    }`
  ],
  template: `
    <div class="callout primary">
    <h3>List of Todos</h3>
    <ul class="unstyled">
      <li *ngFor="#todo of todos">
        <input #done type="checkbox" [ngModel]="todo.done" (change)="saveTodo(todo, done.checked)">
        <span (click)="editTodo(todo)" class="done-{{todo.done}}">{{todo.text}}</span>
      </li>
    </ul>
    </div>`
})
export class TodoList {
  constructor (todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }
  @Input() todos: Todo[];
  @Output() selectedTodo = new EventEmitter<Todo>();
  todoRepository: TodoRepository;

  saveTodo (todo: Todo, done: boolean) {
    todo.done = done;
    this.todoRepository.save(todo);
  }

  editTodo(todo: Todo) {
    this.selectedTodo.emit(todo);
  }
}
