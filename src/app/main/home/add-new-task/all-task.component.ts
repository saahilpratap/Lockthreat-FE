import { Component, OnInit, Injector, ViewChild, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'all-minutes-meeting',
    templateUrl: './all-task.component.html',
    styleUrls: ['./all-task.component.scss']
})
export class alltaskComponent extends AppComponentBase implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    rowGroupMetadata: any;
    data: boolean;
    bulkedit: any = false;
    title = 'MY Task';
    subTitle = 'Task';
    pageTitle = '';
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

    addNewMeeting() {
        this._router.navigate(['/app/main/add-new-task']);
    }
}
