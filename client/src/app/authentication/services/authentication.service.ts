import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { User } from '../../../interfaces/user';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {

  }

  public me(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}me`);
  }

  public logout(): Observable<any> {
    const url = `${environment.apiUrl}logout`;
    console.log('URL', url);
    return this.http.get<any>(url);
  }
}
