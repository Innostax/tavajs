import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {BASE_URL} from  "./base-url"
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUri: string = BASE_URL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  BASE_URL: string;
  constructor(private http: HttpClient) {}

  createEmployee(data: any): Observable<any> {
    let url = `${this.baseUri}`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  getEmployees() {
    return this.http.get(`${this.baseUri}`);
  }

  updateEmployee(id: any, data: any): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http
      .patch(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  deleteEmployee(id: any): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}