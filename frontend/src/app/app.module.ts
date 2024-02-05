import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AssistantComponent } from './assistant/assistant.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './service/user.service';
import { ListAssistanComponent } from './admin/list-assistan/list-assistan.component';
import { MatTableModule } from '@angular/material/table';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserModule } from './user/user.module';
import { GlobalErrorHandler } from './error-handler/error-handler.service';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AssistantComponent,
    ListAssistanComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    SweetAlert2Module,
    MatPaginatorModule,
    FormsModule,
    UserModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
