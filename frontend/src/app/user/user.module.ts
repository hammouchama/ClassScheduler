import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './common/footer/footer.component';
import { AboutAreaComponent } from './common/about-area/about-area.component';
import { BrandAreaComponent } from './common/brand-area/brand-area.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { CourseGridComponent } from './common/course-grid/course-grid.component';
import { CourseListComponent } from './common/course-list/course-list.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { RelatedCourseComponent } from './common/related-course/related-course.component';
import { BlogSidebarComponent } from './common/blog-sidebar/blog-sidebar.component';
import { SignInMainComponent } from './sign-in/sign-in-main/sign-in-main.component';
import { SignInAreaComponent } from './sign-in/sign-in-area/sign-in-area.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './home/home-main/home.component';
import { FormsModule } from '@angular/forms';
import { HeroAreaComponent } from './home/hero-area/hero-area.component';
import { ServiceAreaComponent } from './home/service-area/service-area.component';
import { CoursesComponent } from './home/courses/courses.component';
import { WhatAreaComponent } from './home/what-area/what-area.component';
import { WhyAreaComponent } from './home/why-area/why-area.component';
import { CounterAreaComponent } from './home/counter-area/counter-area.component';
import { TestimonialAreaComponent } from './home/testimonial-area/testimonial-area.component';
import { BlogComponent } from './home/blog/blog.component';
import { CtaAreaComponent } from './home/cta-area/cta-area.component';
import { CompanyAreaComponent } from './common/company-area/company-area.component';
import { TrustedbyAreaComponent } from './home/trustedby-area/trustedby-area.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeroAreaComponent,ServiceAreaComponent,CoursesComponent,WhatAreaComponent,WhyAreaComponent,CounterAreaComponent,TestimonialAreaComponent,BlogComponent,CtaAreaComponent,CompanyAreaComponent,TrustedbyAreaComponent,
    HomeComponent,
    AboutAreaComponent,
    BrandAreaComponent,
    BreadcrumbComponent,
    CourseGridComponent,
    CourseListComponent,
    PaginationComponent,
    RelatedCourseComponent,
    BlogSidebarComponent,
    SignInMainComponent,
    SignInAreaComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    SwiperModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
