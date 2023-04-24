import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';


@Component({
    selector: 'all-vendors',
    templateUrl: './vendors.component.html',
    styleUrls: ['./vendors.component.scss']
})
export class AllVendorsComponent extends AppComponentBase implements OnInit {
    title = 'All Vendors';
    subTitle = '';
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
        this._router.navigate(['/app/main/add-edit-vendors']);
    }
}
