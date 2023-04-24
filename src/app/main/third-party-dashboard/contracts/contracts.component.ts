import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';


@Component({
    selector: 'all-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss']
})
export class AllContractsComponent extends AppComponentBase implements OnInit {
    title = 'Third Party Dashoard';
    subTitle = 'All Contracts';
    pageTitle = '';
    bulkedit: any = false;
    projectDetail: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;

    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
       
    }
    getBulkEdit(e) {
        this.bulkedit = e;
    }
    addNewVendors() {
        this._router.navigate(['/app/main/add-edit-contract']);
    }
}
