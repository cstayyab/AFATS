import { Injectable } from '@angular/core';
import SearchConfig from '../models/search/search-config';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  constructor() { }

  /**
   * This method fetches user config for Search bar from localStorage or uses our defaults. 
   */
  fetchSearchConfig(): SearchConfig {
    let config: SearchConfig = JSON.parse(localStorage.getItem('searchConfig'))    
    if(config === null) {
      // Load SearchConfig with default settings
      config = new SearchConfig()
    }
    return config;
  }

  /**
   * Stores user's preferred Search provider preference to localStorage
   */
  saveSearchConfig = (config: SearchConfig) => localStorage.setItem('searchConfig', JSON.stringify(config));

}
