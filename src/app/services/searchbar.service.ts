import { Injectable } from '@angular/core';
import { SearchOptions } from '../models/search/search-options';
import SearchProvider from '../models/search/search-provider';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  constructor() { }

  /**
   * This method fetches user config for Search bar from localStorage or uses our defaults. 
   */
  fetchSearchProvider(): SearchProvider {
    let config: SearchProvider = JSON.parse(localStorage.getItem('SearchProvider'))    
    if(config === null) {
      // Load SearchProvider with default settings
      config = SearchOptions.OPT_GOOGLE
    }
    return config;
  }

  /**
   * Stores user's preferred Search provider preference to localStorage
   */
  saveSearchProvider = (config: SearchProvider) => localStorage.setItem('SearchProvider', JSON.stringify(config));

  getAllSearchProviders() {
    //TODO: Better code!
    let array = new Array<SearchOptions>()
    array.push(SearchOptions.OPT_GOOGLE)
    array.push(SearchOptions.OPT_TWITTER)
    array.push(SearchOptions.OPT_DDG)
    return array;
  }

  /**
   * Rx Subject to inform Header component to refresh search config
   */
  searchChanged$ = new BehaviorSubject(new SearchProvider());
}
