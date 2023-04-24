import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';


@Component({
    selector: 'third-party-dashboard',
    templateUrl: './third-party-dashboard.component.html',
    styleUrls: ['./third-party-dashboard.component.scss']
})
export class ThirdPartyDashboardComponent extends AppComponentBase implements OnInit {
    title = 'Third Party Dashboard';
    subTitle = '';
    pageTitle = '';
    projectDetail: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;

    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
       
    }
   
}
