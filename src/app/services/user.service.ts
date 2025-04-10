import { Injectable } from '@angular/core';
import { User, Todo } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    { username: 'antra1', password: 'password' },
    { username: 'antra2', password: 'password' },
    { username: 'antra3', password: 'password' },
  ];

  constructor() {}

  userExist(username: string): boolean {
    return this.users.filter((u) => u.username === username).length > 0;
  }

  login(user: User): boolean {
    const foundUser = this.findUser(user);
    if (foundUser) {
      this.setCurrentUser(foundUser);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('auth_user');
  }

  getTodo(user: User): Todo[] {
    if (user.todoList) {
      return user.todoList;
    }
    return [];
  }

  findUser(user: User) {
    return this.users.find(
      (u) => u.username === user.username && u.password === user.password
    );
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('auth_user');
    if (!userJson) return null;

    const { username, todoList } = JSON.parse(userJson);
    const baseUser = this.users.find((u) => u.username === username);
    if (!baseUser) return null;

    return {
      ...baseUser,
      todoList: todoList || [],
    };
  }

  setCurrentUser(user: User) {
    localStorage.setItem(
      'auth_user',
      JSON.stringify({
        username: user.username,
        todoList: user.todoList || [],
      })
    );
  }
}
