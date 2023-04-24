import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';
import { BulkEditKeyPerformanceIndicatorsModalComponent } from './bulk-edit-key-performance-indicators/bulk-edit-key-performance-indicators-modal.component';


@Component({
    selector: 'key-performance-indicators',
    templateUrl: './key-performance-indicators.component.html',
    styleUrls: ['./key-performance-indicators.component.scss']
})
export class KeyPerformanceIndicatorsComponent extends AppComponentBase implements OnInit {
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = '';
    keyPerformanceDetail: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('bulkEditKeyPerformanceIndicatorsModals', { static: true }) bulkEditKeyPerformanceIndicatorsModals: BulkEditKeyPerformanceIndicatorsModalComponent;
    bulkedit: any = false;



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
    getAllKeyPerformanceIndicators(event?: LazyLoadEvent) {
        this.keyPerformanceDetail = [
            { id: 'KPI-1', title: 'KPI Title 1', description: '-', frequency: '-', status: '1',  },
            { id: 'KPI-2', title: 'KPI Title 2', description: '-', frequency: '-', status: '2' },
            { id: 'KPI-3', title: 'KPI Title 3', description: '-', frequency: '-', status: '3' },
            { id: 'KPI-4', title: 'KPI Title 4', description: '-', frequency: '-', status: '2' },
            { id: 'KPI-5', title: 'KPI Title 5', description: '-', frequency: '-', status: '2'},
            { id: 'KPI-6', title: 'KPI Title 6', description: '-', frequency: '-', status: '1'},
            { id: 'KPI-7', title: 'KPI Title 7', description: '-', frequency: '-', status: '1'}
        ];
        this.primengTableHelper.totalRecordsCount = this.keyPerformanceDetail.length;
        this.primengTableHelper.records = this.keyPerformanceDetail;
    }

    addNewProcess() {
        this._router.navigate(['/app/main/add-edit-key-performance-indicators']);
    }
    addNewKeyPerformanceIndicators() {
        this._router.navigate(['/app/main/add-edit-key-performance-indicators']);
    }
}
