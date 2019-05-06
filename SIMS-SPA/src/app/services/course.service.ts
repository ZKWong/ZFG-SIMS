import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourse } from '../model/course';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

    baseUrl = environment.apiUrl + 'Course/';
    constructor(private http: HttpClient) { }

    // get all Course data
    getAllCourse(id: number) {
      return this.http.get(this.baseUrl + 'getAllCourse?semesterid=' + id);
    }


  // insert new Course details
  addCourse(id: number, contact: ICourse): Observable<any> {
    return this.http.post(this.baseUrl + 'addCourse/' + id, JSON.stringify(contact), httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // update Course details
  updateCourse(id: number, contact: ICourse): Observable<any> {
    const newurl = this.baseUrl + 'updateCourse' + `/${id}`;
    return this.http.put(newurl, JSON.stringify(contact), httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // delete Course information
  deleteCourse(id: number): Observable<any> {
    const newurl = this.baseUrl + 'deleteCourse' + `/${id}`;
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
  getCourseExcel(semesterid) {
    window.location.href = this.baseUrl + 'getCourseExcel?semesterid=' + semesterid;
 }
}


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


