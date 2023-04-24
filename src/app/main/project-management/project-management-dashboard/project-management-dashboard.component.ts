import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';


@Component({
    selector: 'project-management-dashboard',
    templateUrl: './project-management-dashboard.component.html',
    styleUrls: ['./project-management-dashboard.component.scss']
})
export class ProjectManagementDashboardComponent extends AppComponentBase implements OnInit {
    projectDetail: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    list: boolean;
    grid: boolean;
    checked: boolean;
    title = 'Programs & Projects';
    subTitle = 'Project Management Dashboard';
    pageTitle = '';

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

    addNewProject() {
        this._router.navigate(['/app/main/add-edit-project']);
    }
    addNewProgram() {
        this._router.navigate(['/app/main/add-edit-my-program']);
    }   
    handleChange(e) {
        let isChecked = e.checked;
    }
}
