import {Component} from 'angular2/core';
import {Todo} from '../models/todo';
import {TodoList} from './todo.list';
import {TodoForm} from './todo.form';
import {TodoRepository} from '../services/todo.repository';

@Component({
  selector: 'todo-app',
  template: `
    <div class="row">
    <div class="columns small-10 small-centered">
    <div>
    <span>{{remaining}} of {{todos.length}} remaining</span>
    [ <a (click)="archive()">archive</a> ]
    <todo-list [todos]="todos" (selectedTodo)="editTodo($event)"></todo-list>
    </div>
    <div class="columns small-6 medium-4 small-centered">
    <button class="button expanded" type="button" (click)="createNewTodo()">New Todo</button>
    </div>
    <todo-form (formSubmitted)="saveTodo($event)" [todo]="todo" [newTodo]="newTodo"></todo-form>
    </div>
    </div>`,
  styles:['a { cursor: pointer; cursor: hand; }'],
  directives: [TodoList, TodoForm],
  providers:[TodoRepository],
})
export class TodoApp {
  todoRepository: TodoRepository
  todo: Todo = {id: null, text: '', done: false};
  selectedTodo: Todo = null;
  newTodo: Boolean = true;
  todos: Todo[] = [];

  constructor(todoRepository: TodoRepository) {
      this.todoRepository = todoRepository;
      this.todoRepository.all().then(todos => this.todos = todos);
  }
  get remaining() {
    return this.todos.reduce((count: number, todo: Todo) => count + +!todo.done, 0);
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
  saveTodo(todo: Todo) {
    if (this.todo != this.selectedTodo) {
      this.todoRepository.save(todo).then(todo => this.todos.push(todo));
    } else {
        this.todoRepository.save(todo).then();
    }

    this.createNewTodo();
  }
  editTodo(todo: Todo) {
    this.selectedTodo = todo;
    this.todo = this.selectedTodo;
    this.newTodo = false;
  }
  createNewTodo() {
    this.todo = {id: null, text: '', done: false};
    this.newTodo = true;
  }
}
