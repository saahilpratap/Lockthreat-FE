import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';


@Component({
    selector: 'incident-management-dashboard',
    templateUrl: './incident-management-dashboard.component.html',
    styleUrls: ['./incident-management-dashboard.component.scss']
})
export class IncidentManagementDashboardComponent extends AppComponentBase implements OnInit {
    title = 'Incident Management Dashboard';
    subTitle = '';
    pageTitle = '';
    projectDetail: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    list: boolean;
    grid: boolean;



    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.list = true;
    }
    getAllProject(event?: LazyLoadEvent) {
        this.projectDetail = [
            { id: 'PRO-1', parentProgram: 'Data Protection ', projectName: 'ISR Compliance', companyName: 'ACME Networks', projectSponsor:'John Smith - C.E.O - Nano Technologies FZE' },
            { id: 'PRO-2', parentProgram: 'Data Protection', projectName: 'ISR Compliance', companyName: 'ACME Networks', projectSponsor: 'Johny Depp - C.E.O - Newlight Investment' },
            { id: 'PRO-3', parentProgram: 'CGMS Program', projectName: 'ISR Compliance', companyName: 'ACME Networks', projectSponsor: '-' },
            { id: 'PRO-4', parentProgram: 'CGMS Program', projectName: 'ISR Compliance', companyName: 'ACME Networks', projectSponsor: 'John Smith - C.E.O - Nano Technologies FZE' },
            { id: 'PRO-5', parentProgram: 'Privacy Program', projectName: 'ISR Compliance', companyName: 'ACME Networks', projectSponsor: 'Johny Depp - C.E.O - Newlight Investment' },
            { id: 'PRO-6', parentProgram: 'CGMS Program', projectName: 'ISR Compliance', companyName: 'ACME Networks', projectSponsor: 'John Smith - C.E.O - Nano Technologies FZE' },
            { id: 'PRO-7', parentProgram: 'Privacy Program', projectName: 'ISR Compliance', companyName: 'ACME Networks', projectSponsor: 'John Smith - C.E.O - Nano Technologies FZE' }
        ];
        this.primengTableHelper.totalRecordsCount = this.projectDetail.length;
        this.primengTableHelper.records = this.projectDetail;
    }

    addNewQuestionnaire() {
        this._router.navigate(['/app/main/add-edit-review-questionnaire']);
    }
}
