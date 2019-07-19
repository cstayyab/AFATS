import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SearchbarService } from 'src/app/services/searchbar.service';
import SearchProvider from 'src/app/models/search/search-provider';
import { UserIdentityService } from 'src/app/services/user-identity.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private searchService: SearchbarService,
    private userId: UserIdentityService
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
  searchProvidersList = new Array<SearchProvider>()

  searchProviderKey: string = null

  ngOnInit() {
    // Populate Search options
    this.searchService.getAllSearchProviders()
      .subscribe({
        next: e => {
          // Remove old data
          this.searchProvidersList.splice(0, this.searchProvidersList.length)
          // Add new data
          e.forEach(el => this.searchProvidersList.push(el))
        },
        error: err => {
          console.error(err)
        }
      })
  }

  processSave() {
    if (this.saveProgressSpan !== null) {
      // HTML element
      const el = <HTMLSpanElement>this.saveProgressSpan.nativeElement
      // Show 'Saving...' message
      el.hidden = false
      // Save the settings
      this.searchService.saveSearchProvider(this.searchProviderKey)
        .subscribe({
          next: (resp: any) => {
            console.log(resp)
            // Update user hash
            this.userId.saveUserHash(resp.hash)
            // hide msg
            el.hidden = true
            // Update UI
            this.searchService.searchChanged$.next(null)
          }
        })
    } else {
      alert('Invalid UI state. Unable to save data.')
    }
  }

}
