import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-bulk-edit-incidents',
  templateUrl: './bulk-edit-incidents.component.html',
  styleUrls: ['./bulk-edit-incidents.component.css'],
})
export class BulkEditIncidentsComponent implements OnInit {
  @ViewChild('bulkEditIncidentModal', { static: true })
  modal: ModalDirective;
  active = false;
  constructor() {}

  ngOnInit() {}

  show(){
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
