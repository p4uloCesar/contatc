
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

// operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Injectable()
export class HttpInterceptor extends Http {

  constructor(
    backend: XHRBackend,
    options: RequestOptions,
    private translate: TranslateService,
    public http: Http,
    private router: Router
  ) {
    super(backend, options);
  }

  public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options)
      .catch(this.handleError);
  }

  public handleError = (error: any) => {
      return Observable.throw(error);
  }


  private goToLogin(): void {
    this.router.navigate(['/modules/login']);
  }

}
