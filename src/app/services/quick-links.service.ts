import { Injectable } from '@angular/core';
import QuickLinkModel from '../models/quick-link';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuickLinksService {

  constructor() { }

  fetchQuickLinks() : Observable<QuickLinkModel[]> {
    // Mock Quick links!
    const titles = ["My Github Profile", "Project Link"]
    const descrs = ["Get to know all about CS Tayyab", "http://github.com/cstayyab/AFATS"]
    
    // Create a array to store the values
    const finalArray = new Array<QuickLinkModel>()
    // Iterate over the mock arrays
    let i
    for(i=0;i<titles.length;i++) {
      const model = new QuickLinkModel(titles[i], descrs[i])
      finalArray.push(model)
    }
    // Return value
    return of(finalArray)
  }
}
