import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quick-link-row',
  templateUrl: './quick-link-row.component.html',
  styleUrls: ['./quick-link-row.component.scss']
})
export class QuickLinkRowComponent implements OnInit {

  constructor() { }

  @Input('title')
  title: string = ''

  @Input('descr')
  descr: string = ''
  
  @Input('url')
  url: string = ''

  ngOnInit() {
  }

}
