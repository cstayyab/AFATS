import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ql-actions',
  templateUrl: './ql-actions.component.html',
  styleUrls: ['./ql-actions.component.scss']
})
export class QlActionsComponent implements OnInit {

  modalRef: BsModalRef = null

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
