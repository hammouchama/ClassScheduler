import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "../service/user-auth.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
     providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

     constructor(private userAuthService: UserAuthService,
          private router: Router) { }

     intercept(
          req: HttpRequest<any>,
          next: HttpHandler
     ): Observable<HttpEvent<any>> {

          if (req.headers.get("No-Auth") === 'True') {
               return next.handle(req.clone());
          }

          const token = this.userAuthService.getToken();
          if (token) {
               req = this.addToken(req, token);
               //req = this.addCorsHeaders(req); // Add CORS headers
          }

          return next.handle(req).pipe(
               catchError(
                    (err: HttpErrorResponse) => {
                         console.log(err.status);
                         if (err.status === 401) {
                              this.router.navigate(['/login']);
                         } else if (err.status === 403) {
                              this.router.navigate(['/forbidden']);
                         }
                         return throwError("Something is wrong");
                    }
               )
          );
     }

     private addToken(request: HttpRequest<any>, token: string) {
          return request.clone(
               {
                    setHeaders: {
                         Authorization: `Bearer ${token}`,
                    }
               }
          );
     }

     private addCorsHeaders(request: HttpRequest<any>) {
          return request.clone({
               setHeaders: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
               }
          });
     }
}