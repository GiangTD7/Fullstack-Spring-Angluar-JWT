import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getEmployees(page: number, size: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/api/test/employee/all?page=` + page + `&size=` + size);
  }

  public addEmployees(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/api/test/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/api/test/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/test/employee/delete/${employeeId}`);
  }
}
