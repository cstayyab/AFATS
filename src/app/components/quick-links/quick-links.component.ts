import { Component, OnInit } from '@angular/core';
import QuickLinkModel from 'src/app/models/quick-link';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent implements OnInit {
  
  // Stores fetched quick links here
  quickLinksList = new Array<QuickLinkModel>();

  constructor() { }

  ngOnInit() {
    // Fetch quick links
    this.fetchQuickLinks()
  }

  // TODO: Move this method to Service class
  fetchQuickLinks() {
    // Mock Quick links!
    const titles = ["My Github Profile", "Project Link"]
    const descrs = ["Get to know all about CS Tayyab", "http://github.com/cstayyab/AFATS"]
    
    // Before adding new items, clear the set!
    this.quickLinksList.splice(0, this.quickLinksList.length)
    // Iterate over the mock arrays
    let i
    for(i=0;i<titles.length;i++) {
      const model = new QuickLinkModel(titles[i], descrs[i])
      this.quickLinksList.push(model)
    }
  }

}
