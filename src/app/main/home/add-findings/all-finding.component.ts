import { Component, OnInit, Injector, ViewChild, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'all-findings',
    templateUrl: './all-finding.component.html',

})
export class allFindingComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;

    rowGroupMetadata: any;
    data: boolean;
    bulkedit: any = false;
    title = 'Finding';
    subTitle = 'Finding';
    pageTitle = 'Finding';
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

    addfinding() {
        this._router.navigate(['/app/main/add-findings']);
    }
}
