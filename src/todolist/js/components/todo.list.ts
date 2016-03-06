import {Component, EventEmitter, OnInit} from 'angular2/core';
import {Todo} from '../models/todo';
import {TodoForm} from './todo.form';
import {TodoRepository} from '../services/todo.repository';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';

@Component({
  selector: 'todo-list',
  styles: [`
    .done-true {
      text-decoration: line-through;
      color: grey;
    }`
  ],
  template: `
    <span>{{remaining}} of {{todos.length}} remaining [ <a (click)="archive()">archive</a> ]</span>
    <div class="row callout primary">
    <h3>List of Todos</h3>
    <ul class="unstyled">
      <li *ngFor="#todo of todos">
        <input #done type="checkbox" [ngModel]="todo.done" (change)="saveTodo(todo, done.checked)">
        <span (click)="editTodo(todo)" class="done-{{todo.done}}">{{todo.text}}</span>
      </li>
    </ul>
    </div>
    <div class="row">
    <div class="columns small-6 medium-4 small-centered">
    <a class="button expanded" [routerLink]="['New']">New Todo</a>
    </div></div>`,
    directives: [ROUTER_DIRECTIVES]
})
export class TodoList implements OnInit {
  constructor (private todoRepository: TodoRepository, private router: Router) {
  }

  private todos: Todo[] = [];

  ngOnInit() {
    this.todoRepository.all().then(todos => this.todos = todos);
  }

  get remaining() {
    return this.todos.reduce((count: number, todo: Todo) => count + +!todo.done, 0);
  }

  editTodo(todo: Todo) {
    this.router.navigate(['Edit', {id: todo.id}])
  }

  saveTodo(todo: Todo, checked: boolean) {
    todo.done = checked;
    this.todoRepository.save(todo).then(todo => this.router.navigate(['List']));
  }

  archive(): void {
    var oldTodos = this.todos;
    this.todos = [];
    oldTodos.forEach((todo: Todo) => {
      if (!todo.done) {
        this.todos.push(todo);
      } else {
        this.todoRepository.delete(todo.id);
      }
    });
  }
}
