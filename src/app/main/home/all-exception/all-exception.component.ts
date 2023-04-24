import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { ExceptionServiceProxy } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { PrimengTableHelper } from '../../../../shared/helpers/PrimengTableHelper';

@Component({
    selector: 'all-exception',
    templateUrl: './all-exception.component.html',
    styleUrls: ['./all-exception.component.scss']
})
export class AllExceptionComponent extends AppComponentBase implements OnInit {
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    listView: boolean;
    gridView: boolean;
    title = 'Home';
    subTitle = 'Home Dashboard';
    pageTitle = 'All Exception';
    exceptionData: Array<any> = [];
    filterText = '';
    OrgId: any;
    constructor(_injector: Injector,
        private _exceptionServiceProxy: ExceptionServiceProxy,
        private _router: Router,
    ) {
        super(_injector);
        this.primengTableHelper = new PrimengTableHelper();

    }

    ngOnInit() {
        this.listView = true;
    }
    showList() {
        this.listView = true;
        this.gridView = false;
    }
    showGrid() {
        this.gridView = true;
        this.listView = false;
    }
    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    exceptionEdit(recordId)
    {
        this._router.navigate(['app/main/add-edit-exception'], { queryParams: { recordId: recordId } });
    }

    exceptionDelete(recordId) {
        this.message.confirm(
            this.l('Exception will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._exceptionServiceProxy.removeException(recordId)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    getAllException(event?: LazyLoadEvent)
    {        
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._exceptionServiceProxy.getAllExceptionList(
            this.filterText,
            this.OrgId,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event))
            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                debugger
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });       
    }
    addNewException() {
        this._router.navigate(['/app/main/add-edit-exception']);
    }
}
