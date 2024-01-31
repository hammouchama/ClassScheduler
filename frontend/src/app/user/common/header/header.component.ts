import { Router } from '@angular/router';
import { UserAuthService } from './../../../service/user-auth.service';
import { Component, HostListener, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerShadow: string | undefined;

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  username: String = '';

  headerSticky: boolean = false;
  showSidebar: boolean = false;
  showHomeDropdown: boolean = false;
  showCoursesDropdown: boolean = false;
  showBlogDropdown: boolean = false;
  showPagesDropdown: boolean = false;

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.headerSticky = true;
    } else {
      this.headerSticky = false;
    }
  }

  // handleSidebar
  handleSidebar() {
    this.showSidebar = true;
  }
  handleSidebarClose() {
    this.showSidebar = false;
  }

  // home dropdown
  homeDropdown() {
    this.showHomeDropdown = !this.showHomeDropdown;
  }
  // coursesDropdown
  coursesDropdown() {
    this.showCoursesDropdown = !this.showCoursesDropdown;
  }

  // blogDropdown
  blogDropdown() {
    this.showBlogDropdown = !this.showBlogDropdown;
  }
  // pagesDropDown
  pagesDropDown() {
    this.showPagesDropdown = !this.showPagesDropdown;
  }

  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userAuthService.isLoggedIn();
    this.isAdmin = this.userAuthService.isAdmmin();
    this.username = this.userAuthService.getRole() || '';
  }

  /**
   * Logout the user
   */
  logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']).then(() => {
      // Manually trigger a page refresh
      window.location.reload();
    });
  }
}
