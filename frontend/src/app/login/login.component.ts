import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserAuthService } from '../service/user-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: any;
  email: any;
  errorMessa: string = "ddd"
  error: boolean = false

  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router) { }

  ngOnInit(): void {

  }
  login(loginForm: NgForm) {
    //! console.log(loginForm.value)
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        //console.log(response)
        //? save the token and roles in localStorage
        this.userAuthService.setToken(response.token)
        const role = response.role
        this.userAuthService.setRole(role)
        //! redarect 
        role === "Admin"
          ? this.router.navigate(['/admin'])
          : role === "assistant" ?
            this.router.navigate(['/assistant'])
            : this.router.navigate(['/user'])
      },
      (error) => {
        this.error = true
        this.errorMessa = error.error.message
        console.log(error.error.message)
      }
    )
  }

}
