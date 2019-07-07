import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SearchOptions } from 'src/app/models/search/search-options';
import { SearchbarService } from 'src/app/services/searchbar.service';
import SearchProvider from 'src/app/models/search/search-provider';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private searchService: SearchbarService
  ) { }

  /**
   * Title input field
   */
  titleInput: ElementRef = null;
  @ViewChild('titleInput', { static: true }) set _ti(content) {
    this.titleInput = content
  }

  /**
   * Description input field
   */
  descrInput: ElementRef = null;
  @ViewChild('descrInput', { static: true }) set _di(content) {
    this.descrInput = content
  }

  /**
   * `<span>` element that shows 'Saving...' on click Save button
   */
  saveProgressSpan: ElementRef = null;
  @ViewChild('saveProgress', { static: true }) set _sp(content) {
    this.saveProgressSpan = content
  }

  /**
   * The ngx-bootstrap Modal object reference. 
   */
  @Input('modalRef')
  modalRef: BsModalRef

  /**
   * Search providers list
   */
  searchProvidersList = new Array<SearchOptions>()

  defaultSearchProvider: SearchProvider = null

  ngOnInit() {
    // Populate Search options
    const providers = this.searchService.getAllSearchProviders()
    // clear data set
    this.searchProvidersList.splice(0, this.searchProvidersList.length)
    // add new stuff!
    providers.forEach(el => this.searchProvidersList.push(el))
  }

  updateSearchProvider(configKey: string) {
    console.log('update provider: ' + configKey)
    // Setup config
    switch (configKey) {
      case SearchOptions.OPT_GOOGLE.key:
        this.defaultSearchProvider = SearchOptions.OPT_GOOGLE
        break;
      case SearchOptions.OPT_TWITTER.key:
        this.defaultSearchProvider = SearchOptions.OPT_TWITTER
        break;
      case SearchOptions.OPT_DDG.key:
        this.defaultSearchProvider = SearchOptions.OPT_DDG
        break;
    }
  }

  processSave() {
    if (this.saveProgressSpan !== null) {
      // HTML element
      const el = <HTMLSpanElement>this.saveProgressSpan.nativeElement
      // Show 'Saving...' message
      el.hidden = false
      // Save the settings
      this.searchService.saveSearchProvider(this.defaultSearchProvider)
      // Hide 'Saving...' message
      setTimeout(() => {
        // wait 2 secs for UX
        el.hidden = true
      // Update UI
      this.searchService.searchChanged$.next(this.defaultSearchProvider)
      }, 2000)
    } else {
      alert('Invalid UI state. Unable to save data.')
    }
  }

}
