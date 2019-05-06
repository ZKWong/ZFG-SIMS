import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ISemester } from '../model/semester';

@Injectable({
  providedIn: 'root'
})

export class SemesterService {

    baseUrl = environment.apiUrl + 'semester/';
    constructor(private http: HttpClient) { }

    // get all semester data
    getAllSemester() {
    return this.http.get(this.baseUrl + 'getAllSemester');
  }


  // insert new semester details
  addSemester(contact: ISemester): Observable<any> {

    return this.http.post(this.baseUrl + 'addSemester', JSON.stringify(contact), httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // update semester details
  updateSemester(id: number, contact: ISemester): Observable<any> {
    const newurl = this.baseUrl + 'updateSemester' + `/${id}`;
    return this.http.put(newurl, JSON.stringify(contact), httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // delete semester information
  deleteSemester(id: number): Observable<any> {
    const newurl = this.baseUrl + 'deleteSemester' + `/${id}`;
    return this.http.delete(newurl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // custom handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


