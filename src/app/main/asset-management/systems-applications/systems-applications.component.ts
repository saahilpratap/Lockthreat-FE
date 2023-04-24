import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';
import { BulkEditSystemsApplicationsModalComponent } from './bulk-edit-systems-applications/bulk-edit-systems-applications-modal.component';


@Component({
    selector: 'systems-applications',
    templateUrl: './systems-applications.component.html',
    styleUrls: ['./systems-applications.component.scss']
})
export class SystemsApplicationsComponent extends AppComponentBase implements OnInit {
    businessServicesDetail: Array<any> = [];
    @ViewChild('bulkEditSystemsApplicationsModals', { static: true }) bulkEditSystemsApplicationsModals: BulkEditSystemsApplicationsModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    bulkedit: any=false;
    title = 'Asset Management';
    subTitle = '';
    pageTitle = '';


    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.bulkedit = false;
    }

    getBulkEdit(e) {
        this.bulkedit = e;
    }
    addNewProcess() {
        this._router.navigate(['/app/main/add-edit-systems-applications']);
    }
}
