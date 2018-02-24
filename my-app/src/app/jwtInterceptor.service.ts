import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      //console.log(currentUser)
      request = request.clone({
        setHeaders: {
          'x-access-token': currentUser
        }
      });
      //console.log(request.headers.get('x-access-token'))
    }

    return next.handle(request);
  }
}
