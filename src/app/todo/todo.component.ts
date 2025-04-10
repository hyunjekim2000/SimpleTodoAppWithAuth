import { Component, OnInit } from '@angular/core';
import { User, Todo } from '../interfaces/user';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  form!: FormGroup;
  todoList: Todo[] = [];
  completedList: Todo[] = [];
  incompleteList: Todo[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.form = this.fb.group({
      todo: [''],
    });

    this.todoList = this.userService.getCurrentUser()?.todoList || [];
    this.updateLists();
  }

  addTodo() {
    const newTodo: Todo = {
      todo: this.form.get('todo')?.value,
      completed: false,
    };
    this.todoList.push(newTodo);
    this.updateLists();
  }

  removeTodo(todo: Todo) {
    this.todoList = this.todoList.filter((t) => t !== todo);
    this.updateLists();
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateLists();
  }

  updateLists() {
    this.completedList = this.todoList.filter((t) => t.completed);
    this.incompleteList = this.todoList.filter((t) => !t.completed);
  }

  saveChanges() {
    const user = this.userService.getCurrentUser();
    user!.todoList = this.todoList;
    this.userService.setCurrentUser(user!);
  }
}
