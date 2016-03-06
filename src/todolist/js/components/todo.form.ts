import {Component, Output, EventEmitter, OnInit} from 'angular2/core';
import {Todo} from '../models/todo';
import {TodoRepository} from '../services/todo.repository';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'todo-form',
  template: `
    <div *ngIf="todo">
    <div class="callout primary">
    <h3 *ngIf="!todo.id">New Todo</h3>
    <h3 *ngIf="todo.id">Edit of Todo {{todo.id}}</h3>
    <form #f="ngForm" (ngSubmit)="submitTodo(f.value)">
      <input type="text" [(ngModel)]="todo.text" size="30"
             placeholder="add new todo here">
      <input class="button" type="submit" value="Save">
    </form>
    </div>
    <a [routerLink]="['List']">Back</a>
    </div>`,
    directives: [ROUTER_DIRECTIVES]
})
export class TodoForm implements OnInit {

  private todo : Todo;

  constructor(private todoRepository: TodoRepository,  private routeParams: RouteParams, private router: Router) {}

  ngOnInit() {
    let id = +this.routeParams.get('id');
    if (id) {
      this.todoRepository.find(id).then(todo => this.todo = todo);
    } else {
      this.todo = {id: null, text: '', done: false};
    }
  }

  submitTodo(form) {
    if (this.todo) {
      this.saveTodo(this.todo);
    }
  }

  saveTodo(todo: Todo) {
    this.todoRepository.save(todo).then(todo => this.router.navigate(['List']));
  }
}
