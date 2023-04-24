import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
//import { SystemsApplicationsModalComponent } from '../systems-applications-modal/systems-applications-modal.component';


@Component({
    selector: 'grid-view-risk-treatment-plans',
    templateUrl: './grid-view-risk-treatment-plans.component.html',
    styleUrls: ['./grid-view-risk-treatment-plans.component.scss']
})
export class GridViewRiskTreatmentPlansComponent extends AppComponentBase implements OnInit {
    //@ViewChild('systemsApplicationsModals', { static: true }) systemsApplicationsModals: SystemsApplicationsModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    riskTreatmentPlansDetail: Array<any> = [];
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
    getRiskTreatmentPlans(event?: LazyLoadEvent) {
        this.riskTreatmentPlansDetail = [
            { rTPID: 'RTPID-1', rTPTitle: 'RTPTitle-1', riskTitle: 'RiskTitle-1', mitigationOwner: '', mitigationStatus: '2' },
            { rTPID: 'RTPID-2', rTPTitle: 'RTPTitle-2', riskTitle: 'RiskTitle-2', mitigationOwner: '', mitigationStatus: '1' },
            { rTPID: 'RTPID-3', rTPTitle: 'RTPTitle-3', riskTitle: 'RiskTitle-3', mitigationOwner: '', mitigationStatus: '3' },
            { rTPID: 'RTPID-4', rTPTitle: 'RTPTitle-4', riskTitle: 'RiskTitle-4', mitigationOwner: '', mitigationStatus: '2' },
            { rTPID: 'RTPID-5', rTPTitle: 'RTPTitle-5', riskTitle: 'RiskTitle-5', mitigationOwner: '', mitigationStatus: '2' }
        ];
        this.primengTableHelper.totalRecordsCount = this.riskTreatmentPlansDetail.length;
        this.primengTableHelper.records = this.riskTreatmentPlansDetail;
    }
    addEditPage() {

    }
}
