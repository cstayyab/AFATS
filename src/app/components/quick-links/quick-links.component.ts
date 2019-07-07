import { Component, OnInit } from '@angular/core';
import QuickLinkModel from 'src/app/models/quick-link';
import { QuickLinksService } from 'src/app/services/quick-links.service';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent implements OnInit {
  
  // Stores fetched quick links here
  quickLinksList = new Array<QuickLinkModel>();

  constructor(
    private qlService: QuickLinksService
  ) { }

  ngOnInit() {
    // Fetch quick links
    this.qlService.fetchQuickLinks()
    .subscribe({
      next: data => {
        // Clear data set
        this.quickLinksList.splice(0, this.quickLinksList.length)
        // Add new data
        data.forEach(el => this.quickLinksList.push(el))
      },
      error: err => console.error(err)
    })
  }

}
