import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { UserAuthService } from '../../../service/user-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in-area',
  templateUrl: './sign-in-area.component.html',
  styleUrls: ['./sign-in-area.component.scss'],
})
export class SignInAreaComponent implements OnInit {
  hide: boolean = true;
  email: any;
  errorMessa: string = 'ddd';
  error: boolean = false;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }
  login(loginForm: NgForm) {
    //! console.log(loginForm.value)
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response)
        //? save the token and roles in localStorage
        this.userAuthService.setToken(response.token);
        const role = response.role;
        this.userAuthService.setRole(role);
        this.userAuthService.setUserId(response.id);
        this.userAuthService.setUserCity(response.city);

        //! redarect
        role === 'Admin'
          ? this.router.navigate(['/dashboard'])
          : role === 'Assistant'
            ? this.router.navigate(['/dashboard'])
            : this.router.navigate(['/']);
      },
      (error) => {
        this.error = true;
        this.errorMessa = error.error.message;
        console.log(error.error.message);
      }
    );
  }
}
