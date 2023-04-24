import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { BusinessRisksModalComponent } from '../business-risks-modal/business-risks-modal.component';


@Component({
    selector: 'grid-view-business-risks',
    templateUrl: './grid-view-business-risks.component.html',
    styleUrls: ['./grid-view-business-risks.component.scss']
})
export class GridViewBusinessRisksComponent extends AppComponentBase implements OnInit {
    @ViewChild('businessRisksModals', { static: true }) businessRisksModals: BusinessRisksModalComponent;

    businessServicesDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }
    onSelectionChange(selection: any[]) {
        if (selection.length >= 2) {
            this.bulkEditEvent.emit(true);
        }
        else if (selection.length <= 1) {
            this.bulkEditEvent.emit(false);
        }
    }
    getAllBusinessServices(event?: LazyLoadEvent) {
        this.businessServicesDetail = [
            { id: 'BSR-1', name: 'Procure to Pay ', owner: '-', comName: 'Asian Technologies Limited', status: 'In Production', processType: 'Internal', description: '1', ProcessPriority: '1' },
            { id: 'BSR-2', name: 'Order to cash', owner: '-', comName: 'Nano Technologies FZE', status: 'In Production', processType: 'Internal', description: '2', ProcessPriority: '3' },
            { id: 'BSR-3', name: 'Procure to Pay', owner: '-', comName: 'Asian Technologies Limited', status: 'In Production', processType: 'Internal', description: '3', ProcessPriority: '2' },
            { id: 'BSR-4', name: 'Order to cash', owner: '-', comName: 'Nano Technologies FZE', status: 'In Production', processType: 'Internal', description: '1', ProcessPriority: '3' },
            { id: 'BSR-5', name: 'Procure to Pay', owner: '-', comName: 'Asian Technologies Limited', status: 'In Production', processType: 'Internal', description: '3', ProcessPriority: '2' },
            { id: 'BSR-6', name: 'Internal Audit Process', owner: '-', comName: 'Cosmos Healthcare', status: 'In Production', processType: 'Internal', description: '1', ProcessPriority: '2' },
            { id: 'BSR-7', name: 'Order to cash', owner: '-', comName: 'Asian Technologies Limited', status: 'In Production', processType: 'Internal', description: '3', ProcessPriority: '3' }
        ];
        this.primengTableHelper.totalRecordsCount = this.businessServicesDetail.length;
        this.primengTableHelper.records = this.businessServicesDetail;
    }
    addEditPage() {

    }
}
