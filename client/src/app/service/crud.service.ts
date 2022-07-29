import { Injectable } from '@angular/core';
import { Task } from './Task';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
// Node/Express API
REST_API: string = 'http://localhost:8000/api';
 
// Http Header
httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

constructor(private httpClient: HttpClient) { }

// Add
AddBook(data: Task): Observable<any> {
  let API_URL = `${this.REST_API}/add-task`;
  return this.httpClient.post(API_URL, data)
    .pipe(
      catchError(this.handleError)
    )
}

// Get all objects
GetBooks() {
  return this.httpClient.get(`${this.REST_API}`);
}

// Get single object
GetBook(id:any): Observable<any> {
  let API_URL = `${this.REST_API}/read-task/${id}`;
  return this.httpClient.get(API_URL, { headers: this.httpHeaders })
    .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
}

// Update
updateBook(id:any, data:any): Observable<any> {
  let API_URL = `${this.REST_API}/update-task/${id}`;
  return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
    .pipe(
      catchError(this.handleError)
    )
}

// Delete
deleteBook(id:any): Observable<any> {
  let API_URL = `${this.REST_API}/delete-task/${id}`;
  return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
}


// Error 
handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Handle client error
    errorMessage = error.error.message;
  } else {
    // Handle server error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
}
