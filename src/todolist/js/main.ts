import 'es6-shim';
import 'es6-promise';
import 'angular2/bundles/angular2-polyfills';

import {bootstrap} from 'angular2/platform/browser';
import {TodoApp}   from './components/todo.app';

require('../css/todolist.scss');

document.addEventListener('DOMContentLoaded', function () {
  bootstrap(TodoApp)
});
