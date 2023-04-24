import { Component, OnInit, Injector, ViewChild, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';
import { BulkEditBusinessServicesModalComponent } from './bulk-edit-business-services/bulk-edit-business-services-modal.component';

@Component({
    selector: 'business-services',
    templateUrl: './business-services.component.html',
    styleUrls: ['./business-services.component.scss']
})
export class BusinessServicesComponent extends AppComponentBase implements OnInit {
    businessServicesDetail: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    rowGroupMetadata: any;
    data: boolean;
    @ViewChild('bulkEditBusinessServicesModals', { static: true }) bulkEditBusinessServicesModals: BulkEditBusinessServicesModalComponent;
    bulkedit: any=false;
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = 'Business Services';
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
    getAllBusinessServices(event?: LazyLoadEvent) {
        this.businessServicesDetail = [
            { id: 'BSR-1', name: 'Quality & Excellence Services ', owner: 'Naseer Baig - Manager - ACME Networks', manager: '', type: 'External', confidentiality: '2', intergrity: '1' },
            { id: 'BSR-2', name: 'International Investment Services', owner: 'Naseer Baig - Manager - ACME Networks', manager: '', type: 'External', confidentiality: '1', intergrity: '2' },
            { id: 'BSR-3', name: 'Advisory & Consulting Services', owner: 'Naseer Baig - Manager - ACME Networks', manager: 'Heeba Ahmed - Group Chief Information Officer...', type: 'External', confidentiality: '1', intergrity: '3' },
            { id: 'BSR-4', name: 'Quality & Excellence Services', owner: 'Naseer Baig - Manager - ACME Networks', manager: '', type: 'External', confidentiality: '2', intergrity: '1' },
            { id: 'BSR-5', name: 'Managed Security Services', owner: 'Naseer Baig - Manager - ACME Networks', manager: 'Heeba Ahmed - Group Chief Information Officer...', type: 'External', confidentiality: '2', intergrity: '3' }
        ];
        this.primengTableHelper.totalRecordsCount = this.businessServicesDetail.length;
        this.primengTableHelper.records = this.businessServicesDetail;
    }

    addNewServices() {
        this._router.navigate(['/app/main/add-new-services']);
    }
}
