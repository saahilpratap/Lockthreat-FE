import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';


@Component({
    selector: 'organization-setup',
    templateUrl: './organization-setup.component.html',
    styleUrls: ['./organization-setup.component.scss']
})
export class OrganizationSetupComponent extends AppComponentBase implements OnInit {

    list: any;
    grid: any;
    title = 'Organization';
    subTitle = 'Employee';
    pageTitle = '';
    organizationData: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    public tabItem: any[] = [
        {
            title: 'Consortium', detail: [
                { name: 'Global Ventures Group', subDetail: 'Global Ventures Group' }]
        },
        {
            title: 'Group', detail: [
                { name: 'Global Ventures Group1', subDetail: 'Global Ventures Group1' }]
        },
        {
            title: 'Company Names', detail: [
                { name: 'Global Ventures Group2', subDetail: 'Global Ventures Group2' }]
        },

    ];
    data = [
        { name: 'Global Ventures Group1', detail: 'Global Ventures Group1', email: 'test1.info@com', phone: '575645577' },
        { name: 'Global Ventures Group2', detail: 'Global Ventures Group2', email: 'test2.info@com', phone: '575645577' },
        { name: 'Global Ventures Group2', detail: 'Global Ventures Group3', email: 'test3.info@com', phone: '575645577' },
        { name: 'Global Ventures Group3', detail: 'Global Ventures Group4', email: 'test4.info@com', phone:'575645577'},
    ]
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.grid = true;
    }
    showGrid() {
        this.grid = true;
        this.list = false;
    }
    showList() {
        this.grid = false;
        this.list = true;
    }
 
    getAllOrganization(event?: LazyLoadEvent) {
        this.organizationData = [
            { companyName: 'Asian Technologies Limited', industrySector: 'Chemicals', email: 'ahmed.baig@emirsec.com', phone: '+918081412222', companyID: 'COM-27', },
            { companyName: 'ACME Networks', industrySector: 'Technology Hardware', email: 'neha.wadia@acmenetworks.com', phone: '+918081412222', companyID: 'COM-28', },
            { companyName: 'Newlight Investment', industrySector: 'Chemicals', email: 'qurram@live.com', phone: '', companyID: 'COM-29', },
            { companyName: 'ACME Networks', industrySector: 'Technology Hardware', email: 'neha.wadia@acmenetworks.com', phone: '+918081412222', companyID: 'COM-30', },
            { companyName: 'Newlight Investment', industrySector: 'Chemicals', email: 'ahmed.baig@emirsec.com', phone: '', companyID: 'COM-31', },
        ];
        this.primengTableHelper.totalRecordsCount = this.organizationData.length;
        this.primengTableHelper.records = this.organizationData;
    }
    clickAddOrganization() {
        this._router.navigate(['/app/main/add-edit-organization']);
    }
    editRecord() {
        this._router.navigate(['/app/main/add-edit-organization']);
    }
}
