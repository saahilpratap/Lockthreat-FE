import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { TaskServiceProxy } from '../../../../../../shared/service-proxies/service-proxies';
import { Paginator } from 'primeng/paginator';
import { finalize } from 'rxjs/operators';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';

@Component({
    selector: 'grid-view-task',
    templateUrl: './grid-view-task.component.html',

})
export class GridViewtaskComponent extends AppComponentBase implements OnInit {
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    filterText: '';

    constructor(_injector: Injector,
        private _router: Router,
        private _changeDetector: ChangeDetectorRef,
        private _taskServiceProxy: TaskServiceProxy,
    ) {
        super(_injector);
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit() {

    }

    onSelectionChange(selection: any[]) {
        if (selection.length >= 2) {
            this.bulkEditEvent.emit(true);
        }
        else if (selection.length <= 1) {
            this.bulkEditEvent.emit(false);
        }
    } ss

    getAllTaskList(event?: LazyLoadEvent) {

        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._taskServiceProxy.getAllTasksList(
            this.filterText,           
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            debugger
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });

    }

    editTask(recordId) {
        this._router.navigate(['app/main/add-new-task'], { queryParams: { recordId: recordId } });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    RemoveTask(recordId) {

        this.message.confirm(
            this.l('My Task  will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._taskServiceProxy.removeTask(recordId)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );

    }

    exportToExcel() {

    }
}
