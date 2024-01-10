import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(public useAthuService: UserAuthService,
    private router: Router) { }


  ngOnInit(): void {
    throw new Error('Method not implemented.');

  }


  logout() {
    this.useAthuService.clear()
    this.router.navigate(["/home"])
  }
  isLoggedIn() {
    return this.useAthuService.isLoggedIn()
  }
}
