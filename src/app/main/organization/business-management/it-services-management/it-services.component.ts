import { Component, OnInit, Injector, ViewChild, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';
import { BulkEditItServicesModalComponent } from './bulk-edit-it-services/bulk-edit-it-services-modal.component';

@Component({
    selector: 'it-services',
    templateUrl: './it-services.component.html',
    styleUrls: ['./it-services.component.scss']
})
export class ITServicesComponent extends AppComponentBase implements OnInit {
    businessServicesDetail: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    rowGroupMetadata: any;
    data: boolean;
    @ViewChild('bulkEditItServicesModals', { static: true }) bulkEditItServicesModals: BulkEditItServicesModalComponent;
    bulkedit: any = false;
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = 'Business Services';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        
    }

    addNewITServices() {
        this._router.navigate(['/app/main/add-edit-it-services']);
    }
    getBulkEdit(e) {        
        this.bulkedit = e;
    }
}
