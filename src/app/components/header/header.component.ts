import { Component, OnInit } from '@angular/core';
import { SearchbarService } from 'src/app/services/searchbar.service';
import SearchConfig from 'src/app/models/search/search-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private searchService: SearchbarService
  ) { }

  searchConfig: SearchConfig = null

  ngOnInit() {
    // Fetch user defined Search bar config
    this.searchConfig = this.searchService.fetchSearchConfig()
  }

}
