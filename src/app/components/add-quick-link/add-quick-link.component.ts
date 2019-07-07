import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-quick-link',
  templateUrl: './add-quick-link.component.html',
  styleUrls: ['./add-quick-link.component.scss']
})
export class AddQuickLinkComponent implements OnInit {
  
  /**
   * URL input field
   */
  urlInput: ElementRef = null;
  @ViewChild('urlInput', { static: true }) set _ui(content) {
    this.urlInput = content
  }

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
  newItemProgress: ElementRef = null;
  @ViewChild('newItemProgress', { static: true }) set _ni(content) {
    this.newItemProgress = content
  }

  /**
   * The ngx-bootstrap Modal object reference. 
   */
  @Input('modalRef')
  modalRef: BsModalRef

  ngOnInit() {
  }

  processRequest() {
    if (this.newItemProgress !== null) {
      // HTML element
      const el = <HTMLSpanElement>this.newItemProgress.nativeElement
      // Show 'Saving...' message
      el.hidden = false
      // wait 2 secs, then hide the message
      setTimeout(() => {
        // Hide 'Saving...' message
        el.hidden = true
      }, 2000);
    } else {
      alert('Invalid UI state. Unable to save data.')
    }
  }

}
