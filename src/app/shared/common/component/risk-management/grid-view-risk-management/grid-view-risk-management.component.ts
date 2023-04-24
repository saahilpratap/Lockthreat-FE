import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
//import { SystemsApplicationsModalComponent } from '../systems-applications-modal/systems-applications-modal.component';


@Component({
    selector: 'grid-view-risk-management',
    templateUrl: './grid-view-risk-management.component.html',
    styleUrls: ['./grid-view-risk-management.component.scss']
})
export class GridViewRiskManagementComponent extends AppComponentBase implements OnInit {
    //@ViewChild('systemsApplicationsModals', { static: true }) systemsApplicationsModals: SystemsApplicationsModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    riskManagementDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
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
    getRiskManagement(event?: LazyLoadEvent) {
        this.riskManagementDetail = [
            { riskID: 'RS-1', riskTitle: 'Risk Title-1', companyName: 'WAi-1', businessUnit: '', riskType: '', },
            { riskID: 'RS-2', riskTitle: 'Risk Title-2', companyName: 'WAi-2', businessUnit: '', riskType: '', },
            { riskID: 'RS-3', riskTitle: 'Risk Title-3', companyName: 'WAi-3', businessUnit: '', riskType: '', },
            { riskID: 'RS-4', riskTitle: 'Risk Title-4', companyName: 'WAi-4', businessUnit: '', riskType: '', },
            { riskID: 'RS-5', riskTitle: 'Risk Title-5', companyName: 'WAi-5', businessUnit: '', riskType: '', },
        ];
        this.primengTableHelper.totalRecordsCount = this.riskManagementDetail.length;
        this.primengTableHelper.records = this.riskManagementDetail;
    }
    addEditPage() {

    }
}
