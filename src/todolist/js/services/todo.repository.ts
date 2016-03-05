import {Injectable} from 'angular2/core';
import {Todo} from '../models/todo';

const KEY = 'todoStorage';

@Injectable()
export class TodoRepository {
  private currentIdentity : number = 0;
  private todoData: Todo[];
  constructor() {
    if (!localStorage.getItem(KEY)) {
      this.saveJsonData([]);
    } else {
      this.currentIdentity = this.getJsonData()
        .reduce((maxId: number, todo: Todo) => todo.id > maxId ? todo.id : maxId, 0)
    }

    this.todoData = this.getJsonData();
  }

  private nextIdentity(): number {
    return ++this.currentIdentity;
  }

  private getJsonData(): Todo[] {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  }

  private saveJsonData(data) : void {
    this.todoData = data;
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  private findInLocalStorage(id: number) : Todo {
    var todoData = this.todoData;
    return todoData.find(storedTodo => storedTodo.id === id);
  }

  save(todo: Todo) : Promise<Todo> {
    var todoData = this.todoData;
    if (!todo.id) {
      todo.id = this.nextIdentity();
      todoData.push(todo);
    } else {
        var storedTodo = this.findInLocalStorage(todo.id)
          storedTodo.text = todo.text;
          storedTodo.done = todo.done;
    }

    this.saveJsonData(todoData);

    return Promise.resolve(todo);
  }

  all() : Promise<Todo[]> {
    return Promise.resolve(this.getJsonData());
  }

  find(id: number) : Promise<Todo> {
    return Promise.resolve(this.findInLocalStorage(id));
  }

  delete(id: number) : Promise<{deleted: boolean}> {
    var todoData = this.todoData;

    this.saveJsonData(todoData.filter(storedTodo => storedTodo.id !== id));
    return Promise.resolve({deleted: todoData !== this.getJsonData()});
  }
};
