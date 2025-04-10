import { Component, OnInit, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ValidatorService } from '../services/validator.service';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  debouncedUsername = signal<string>('');
  loginFailed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private validatorService: ValidatorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: [
        '',
        {
          validators: [],
          asyncValidators: [this.validatorService.userExistValidator()],
          updateOn: 'change',
        },
      ],
      password: ['', Validators.required],
    });

    this.form
      .get('username')!
      .valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => {
        this.debouncedUsername.set(value);
        console.log('Debounced username:', value);
      });
  }

  login() {
    const user: User = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };

    if (this.userService.login(user)) {
      this.loginFailed = false;
      console.log('login successful');
      this.router.navigate(['/todo']);
    } else {
      this.loginFailed = true;
      console.log('login unsuccessful');
    }
  }
}
