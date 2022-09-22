import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmployeeService} from './employee.service';
import {Employee} from './employee';

const API_URL = 'http://localhost:8080/api/test/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'json' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', {responseType: 'json'});
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'json' });
  }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }
  getEmployees(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'json' });
  }




}
