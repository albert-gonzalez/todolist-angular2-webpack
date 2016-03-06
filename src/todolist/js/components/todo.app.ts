import {Component} from 'angular2/core';
import {Todo} from '../models/todo';
import {TodoList} from './todo.list';
import {TodoForm} from './todo.form';
import {TodoRepository} from '../services/todo.repository';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
  selector: 'todo-app',
  template: `
    <div class="row">
    <div class="columns small-10 small-centered">
    <router-outlet></router-outlet>
    </div>
    </div>`,
  styles:['a { cursor: pointer; cursor: hand; }'],
  directives: [ROUTER_DIRECTIVES],
  providers:[TodoRepository, ROUTER_PROVIDERS]
})
@RouteConfig([
  {
    path: '/list',
    name: 'List',
    component: TodoList,
    useAsDefault: true
  },
  {
    path: '/new',
    name: 'New',
    component: TodoForm
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: TodoForm
  }
])
export class TodoApp {
}
