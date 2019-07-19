import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserIdentityService {

  constructor(
    private http: HttpClient
  ) { }

  BASE_URL = 'http://localhost:8000'

  public createUserHash(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/v1/user`)
  }

  public getUserDataFromServer(): Observable<any> {
    const hash= this.fetchUserHash()
    return this.http.get(`${this.BASE_URL}/api/v1/user`, {
      params: {'hash':hash} 
    })
  }

  public fetchUserHash() {
    return localStorage.getItem('userHash')
  }

  public saveUserHash(str: string) {
    localStorage.setItem('userHash', str)
  }
}
