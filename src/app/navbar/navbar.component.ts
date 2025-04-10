import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private userService: UserService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!this.userService.getCurrentUser();
  }

  logout() {
    this.userService.logout();
  }
}
