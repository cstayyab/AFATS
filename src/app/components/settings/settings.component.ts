import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

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

  ngOnInit() {
  }

  processSave() {
    if (this.saveProgressSpan !== null) {
      // HTML element
      const el = <HTMLSpanElement>this.saveProgressSpan.nativeElement
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
