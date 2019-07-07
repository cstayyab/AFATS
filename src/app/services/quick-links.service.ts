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
    const urls = ["https://github.com/cstayyab", "https://github.com/cstayyab/AFATS"]
    const titles = ["My Github Profile", "AFATS project"]
    const descrs = ["Get to know all about CS Tayyab", "Check out the project's source code"]
    
    // Create a array to store the values
    const finalArray = new Array<QuickLinkModel>()
    // Iterate over the mock arrays
    let i
    for(i=0;i<titles.length;i++) {
      const model = new QuickLinkModel(titles[i], descrs[i], urls[i])
      finalArray.push(model)
    }
    // Return value
    return of(finalArray)
  }
}
