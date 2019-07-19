import { Component, OnInit } from '@angular/core';
import QuickLinkModel from 'src/app/models/quick-link';
import { QuickLinksService } from 'src/app/services/quick-links.service';
import { UserIdentityService } from 'src/app/services/user-identity.service';
import { HttpErrorResponse } from '@angular/common/http';
import { timer, of, from } from 'rxjs';
import { map, concatMap, filter, merge, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent implements OnInit {

  // Stores fetched quick links here
  quickLinksList = new Array<QuickLinkModel>();

  constructor(
    private qlService: QuickLinksService,
    private userId: UserIdentityService
  ) { }

  ngOnInit() {
    // Check if userHash exists locally.
    const checkUserHash$ = of(this.userId.fetchUserHash())

    const userHashNotExists$ = checkUserHash$.pipe(filter(x => x === 'undefined' || x === null),
    concatMap(_ => this.userId.createUserHash()),
      map((resp: any) => {
        // Save user id
        console.log(resp.hash)
        console.log(resp)
        if (resp.hash) {
          this.userId.saveUserHash(resp.hash)
        }
      }),
      // Lastly fetch quick links
      switchMap(_ => userHashExists$)
    )
    const userHashExists$ = checkUserHash$.pipe(filter(x => x !== 'undefined' || x !== null),
    concatMap(_ => this.qlService.fetchQuickLinks()),
      map(data => {
        // Clear data set
        this.quickLinksList.splice(0, this.quickLinksList.length)
        // Add new data
        data.forEach(el => this.quickLinksList.push(el))
      })
    )

    userHashExists$.pipe(merge(userHashNotExists$))
    .subscribe({
      error: err => console.error(err)
    })

  }



}
