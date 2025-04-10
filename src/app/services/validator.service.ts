import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(private userService: UserService) {}

  userExistValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const username = control.value;
      return of(this.userService.userExist(username)).pipe(
        map((exists) => (exists ? null : { userNotFound: true }))
      );
    };
  }
}
