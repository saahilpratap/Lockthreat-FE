import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';
import { BulkEditKeyRiskIndicatorsModalComponent } from './bulk-edit-key-risk-indicators/bulk-edit-key-risk-indicators-modal.component';


@Component({
    selector: 'key-risk-indicators',
    templateUrl: './key-risk-indicators.component.html',
    styleUrls: ['./key-risk-indicators.component.scss']
})
export class KeyRiskIndicatorsComponent extends AppComponentBase implements OnInit {
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = '';
    keyPerformanceDetail: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('bulkEditKeyRiskIndicatorsModals', { static: true }) bulkEditKeyRiskIndicatorsModals: BulkEditKeyRiskIndicatorsModalComponent;
    bulkedit: any = false;



    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }
    getBulkEdit(e) {
        this.bulkedit = e;
    }
    ngOnInit() {
        this.bulkedit = false;
    }
   

    addNewProcess() {
        this._router.navigate(['/app/main/add-edit-key-risk-indicators']);
    }
}
