import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import SearchProvider from '../models/search/search-provider';

import { BehaviorSubject, Observable } from 'rxjs';
import { UserIdentityService } from './user-identity.service';
import { map, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  constructor(
    private http: HttpClient,
    private userId: UserIdentityService
  ) { }

  BASE_URL = 'http://localhost:8000'

  /**
   * This method fetches user config for Search bar from localStorage or uses our defaults. 
   *
  fetchSearchProvider(): Observable<any> {
    let config: SearchProvider = JSON.parse(localStorage.getItem('SearchProvider'))    
    if(config === null) {
      // Load SearchProvider with default settings
      // config = SearchOptions.OPT_GOOGLE
    }
    return this.http.get(`${this.BASE_URL}/api/v1/searchengine`);
  }
  */

  fetchSearchProvider(): Observable<any> {
    return this.userId.getUserDataFromServer()
    .pipe(
      map(x => {
        console.log(x)
        console.log(x.data.dEngine)
        return x.data.dEngine
      }),
      concatMap(engineId => {
        // Set content type
        const headers = new HttpHeaders({
          'Content-Type': 'x-www-form-urlencoded'
        })
        // Set data
        let params = new HttpParams()
        params.set('slug', engineId)
        // process request
        return this.http.get(`${this.BASE_URL}/api/v1/searchengine`, {
          headers,
          params 
        })
    })
    )
  }

  /**
   * Stores user's preferred Search provider preference to localStorage
   */
  saveSearchProvider = (slug: string) => {
    const hash = this.userId.fetchUserHash()
    console.log(`save search for user: ${hash}`)
    console.log(slug)
    return this.http.put(`${this.BASE_URL}/api/v1/user/defaultengine`, {
      hash,
      slug
    })
  }

  getAllSearchProviders(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/v1/searchengine`)
  }

  /**
   * Rx Subject to inform Header component to refresh search config
   */
  searchChanged$ = new BehaviorSubject(new SearchProvider());
}
