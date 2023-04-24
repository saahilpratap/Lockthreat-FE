import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { SystemsApplicationsModalComponent } from '../systems-applications-modal/systems-applications-modal.component';
import { SystemApplicationServiceProxy } from '@shared/service-proxies/service-proxies';
import { Paginator } from 'primeng/paginator';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'grid-view-systems-applications', 
    templateUrl: './grid-view-systems-applications.component.html',
    styleUrls: ['./grid-view-systems-applications.component.scss']
})
export class GridViewSystemsApplicationsComponent extends AppComponentBase implements OnInit {
    @ViewChild('systemsApplicationsModals', { static: true }) systemsApplicationsModals: SystemsApplicationsModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    systemDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    filterText: '';
    constructor(_injector: Injector,
        private _router: Router,
        private _systemApplicationServiceProxy: SystemApplicationServiceProxy,
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
    }
    getAllSystem(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._systemApplicationServiceProxy.getAllSysteamApplicationList(
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
    addEditPage() {

    }

    systemApllicationEdit(recordId) {
        this._router.navigate(['app/main/add-edit-systems-applications'], { queryParams: { recordId: recordId } });
    }
    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    removeSytem(recordId) {
        this.message.confirm(
            this.l('System Application will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._systemApplicationServiceProxy.removeSysteamApplication(recordId)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
}
