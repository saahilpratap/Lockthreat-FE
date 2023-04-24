import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bulk-edit-organization-policies',
  templateUrl: './bulk-edit-organization-policies.component.html',
  styleUrls: ['./bulk-edit-organization-policies.component.css'],
})
export class BulkEditOrganizationPoliciesComponent implements OnInit {
  @ViewChild('bulkEditIncidentModal', { static: true })
  modal: ModalDirective;
  active = false;
  constructor() {}

  ngOnInit() {}

  show() {
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }
}
