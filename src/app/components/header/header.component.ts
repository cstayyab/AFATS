import { Component, OnInit } from '@angular/core';
import { SearchbarService } from 'src/app/services/searchbar.service';
import SearchProvider from 'src/app/models/search/search-provider';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private searchService: SearchbarService
  ) { }

  searchProvider: SearchProvider = null

  ngOnInit() {
    // Fetch user defined Search bar config
    this.searchProvider = this.searchService.fetchSearchProvider()
    // Subscribe to searchChanged$ to update search provider
    this.searchService.searchChanged$.subscribe(x => this.searchProvider=x)
  }

}
