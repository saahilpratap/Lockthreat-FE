import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { ControlProceduresModalComponent } from '../control-procedures-modal/control-procedures-modal.component';


@Component({
    selector: 'grid-view-control-procedures',
    templateUrl: './grid-view-control-procedures.component.html',
    styleUrls: ['./grid-view-control-procedures.component.scss']
})
export class GridViewControlProceduresComponent extends AppComponentBase implements OnInit {
    @ViewChild('controlProceduresModals', { static: true }) controlProceduresModals: ControlProceduresModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    controlProceduresDetail: Array<any> = [];
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
    getControlProcedures(event?: LazyLoadEvent) {
        this.controlProceduresDetail = [
            {
               procedureID:'drtert',
                procedureName: '',
                type: '',
                procedureCategory: '',
                activityCycle: '',
                operationalFrequency: '',
                description: '',
                businessUnit: '',
                procedureOwner: '',
                procedureManager: '',
                testType: '',
                tester: '',
                commonControls: '',
                controlStandards: '',
            }
        ];
        this.primengTableHelper.totalRecordsCount = this.controlProceduresDetail.length;
        this.primengTableHelper.records = this.controlProceduresDetail;
    }
    addEditPage() {

    }
}
