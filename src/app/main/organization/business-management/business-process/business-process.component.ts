import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';
import { BulkEditBusinessProcessModalComponent } from './bulk-edit-business-process/bulk-edit-business-process-modal.component';


@Component({
    selector: 'business-process',
    templateUrl: './business-process.component.html',
    styleUrls: ['./business-process.component.scss']
})
export class BusinessProcessComponent extends AppComponentBase implements OnInit {
    businessServicesDetail: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('bulkEditBusinessProcessModals', { static: true }) bulkEditBusinessProcessModals: BulkEditBusinessProcessModalComponent;
    bulkedit: any=false;
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = 'Business Process';


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
        this._router.navigate(['/app/main/add-new-process']);
    }
}
