import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { BulkEditIncidentsComponent } from './bulk-edit-incidents/bulk-edit-incidents.component';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'],
})
export class IncidentsComponent extends AppComponentBase implements OnInit {
  @ViewChild('bulkEditIncidentModal', { static: true })
  bulkEditIncidentModal: BulkEditIncidentsComponent;
  title = 'Incident Management Dashboard';
  subTitle = '';
  pageTitle = '';
  bulkedit: boolean;
  constructor(_injector: Injector, private _router: Router) {
    super(_injector);
  }

  ngOnInit() {
    this.bulkedit = false;
  }

  getBulkEdit(e) {
    this.bulkedit = e;
  }

  addNewIncident() {
    this._router.navigate(['/app/main/add-edit-incident']);
  }
}
