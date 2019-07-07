import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  constructor() { }

  @Input('faClass')
  faClass: string

  @Input('searchURL')
  searchURL: string

  @Input('queryParam')
  queryParam: string

  searchHref=''

  ngOnInit() {
  }

  updateSearchHref(query: string) {
    this.searchHref = `${this.searchURL}?${this.queryParam}=${query}`
  }

}
