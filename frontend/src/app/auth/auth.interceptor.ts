import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "../service/user-auth.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
     providedIn: 'root' // This is optional and specifies the injector scope
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
          // console.log(this.userAuthService.getToken())
          const token = this.userAuthService.getToken();
          if (token) {
               req = this.addToken(req, token);
          }

          return next.handle(req).pipe(
               catchError(
                    (err: HttpErrorResponse) => {
                         console.log(err.status)
                         if (err.status === 401) {
                              this.router.navigate(['/login'])
                         } else if (err.status === 403) {

                              //forbidden page 
                              this.router.navigate(["/forbidden"])
                         }
                         return throwError("Some thing is wrong")
                    }
               )
          )
     }

     private addToken(request: HttpRequest<any>, token: string) {
          return request.clone(
               {
                    setHeaders: {
                         Authorization: `Bearer ${token}`
                    }
               }
          )
     }

}