import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from 'primeng/components/table/table';
import { Router } from '@angular/router';
import { BulkEditFacilitiesDatacenterModalComponent } from './bulk-edit-facilities-datacenter/bulk-edit-facilities-datacenter-modal.component';

@Component({
  selector: 'facilities-datacenter',
  templateUrl: './facilities-datacenter.component.html',
  styleUrls: ['./facilities-datacenter.component.scss'],
})
export class FacilitiesDataCenterComponent extends AppComponentBase
  implements OnInit {
  businessServicesDetail: Array<any> = [];
  @ViewChild('bulkEditFacilitiesDatacenterModals', { static: true })
  bulkEditFacilitiesDatacenterModals: BulkEditFacilitiesDatacenterModalComponent;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  bulkedit: any = false;
  title = 'Asset Management';
  subTitle = '';
  pageTitle = '';

  constructor(_injector: Injector, private _router: Router) {
    super(_injector);
  }

  ngOnInit() {
    this.bulkedit = false;
  }

  getBulkEdit(e) {
    this.bulkedit = e;
  }
  addNewFacilitieDatacenter() {
    this._router.navigate(['/app/main/add-edit-facilities-datacenter']);
  }
}
