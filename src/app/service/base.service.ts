import {Injectable} from '@angular/core';
import {Headers, URLSearchParams, RequestOptions, Http} from '@angular/http';
import {HttpInterceptor} from './http-interceptor';
import {Observable} from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {PaginatedResult} from '../util/paginated-result';

@Injectable()
export class BaseService<T> {
  protected protocol: string = location.protocol;
  protected hostname: string = location.hostname;
  private port = environment.port;
  private api = environment.api;
  protected headers = new Headers(
    {
      'Content-Type': 'application/json',
      'Content-Language': 'pt-br',
      'Accept-Language': 'pt-br',
    }
  );
  protected urlBase: string;
  protected parameters: URLSearchParams;
  protected fullUrl: string;

  constructor(protected http: HttpInterceptor, path: string ) {
    this.urlBase = this.getUrlBase();
    this.parameters = new URLSearchParams();
    this.fullUrl = this.urlBase.concat(path);
  }

  public getUrlBase(): string {
    return this.protocol.concat('//').concat(this.hostname).concat(':').concat(this.port).concat(this.api);
  }

  public clearParameter(): void {
    this.parameters = new URLSearchParams();
  }

  public addParameter(key: string, value: string): void {
    this.parameters.set(key, value);
  }

    public getPaginated(): Observable<PaginatedResult<T>> {
        return this.http.get(this.fullUrl, this.addOptions(this.parameters)).map(
            response => response.json()
        ).catch(
            ex => Observable.throw(ex)
        );
    }
  protected addOptions(parameters?: URLSearchParams): RequestOptions {
    const options = new RequestOptions();

    options.headers = this.headers;
    if (parameters) {
      options.params = parameters;
    }

    return options;
  }

  public getAll(): Observable<T[]> {
    return this.http.get(this.fullUrl, this.addOptions(this.parameters)).map(
      response => response.json() as T[]
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  // public getPaginated(): Observable<PaginatedResult<T>> {
  //   return this.http.get(this.fullUrl, this.addOptions(this.parameters)).map(
  //     response => response.json() as T[]
  //   ).catch(
  //     ex => Observable.throw(ex)
  //   );
  // }

  public save(entity: T): Observable<T> {
    this.clearParameter();
    return this.http.post(this.fullUrl, entity, this.addOptions(this.parameters)).map(
      response => response.json() as T
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  public getById(id: number): Observable<T> {
    return this.http.get(this.fullUrl.concat(String(id) + '/'), this.addOptions(this.parameters)).map(
      response => response.json() as T
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  public delete(id: number): any {
    this.clearParameter();
    return this.http.delete(this.fullUrl.concat(String(id) + '/'), this.addOptions(this.parameters)).map(
      response => {
        return response.json();
      }
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  public update(id: number, body: any): Observable<T> {
    this.clearParameter();
    return this.http.patch(this.fullUrl.concat(String(id) + '/'), body, this.addOptions(this.parameters)).map(
      response => response.json() as T
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  public saveAll(entity: T[]): Observable<T[]> {
    this.clearParameter();
    return this.http.post(this.fullUrl, entity, this.addOptions(this.parameters)).map(
      response => response.json() as T[]
    ).catch(
      ex => Observable.throw(ex)
    );
  }
}
