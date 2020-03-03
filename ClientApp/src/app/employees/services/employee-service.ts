import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../data-models/employee';

@Injectable()
export class EmployeeService {
  private employeesUrl = this.baseUrl + 'api/employees';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getEmployee(id: string, cityName: string): Observable<Employee> {
    if (id === '') {
      return of(this.initializeEmployee());
    }
    const url = `${this.employeesUrl}/${id}/${cityName}`;
    return this.http.get<Employee>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Employee>(this.employeesUrl, employee, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteEmployee(id: string, cityname: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/${id}/${cityname}`;
    return this.http.delete<Employee>(url, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.employeesUrl;
    return this.http.put<Employee>(url, employee, { headers: headers })
      .pipe(
        map(() => employee),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeEmployee(): Employee {
    return {
      id: null,
      name: null,
      address: null,
      gender: null,
      company: null,
      designation: null,
      cityname: null
    };
  }
} 
