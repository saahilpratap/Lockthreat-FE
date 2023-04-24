import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { BusinessProcessModalComponent } from '../business-process-modal/business-process-modal.component';
import { BusinessProcessServiceProxy } from '../../../../../../shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';

@Component({
    selector: 'grid-view-business-process',
    templateUrl: './grid-view-business-process.component.html',
    styleUrls: ['./grid-view-business-process.component.scss']
})
export class GridViewBusinessProcessComponent extends AppComponentBase implements OnInit {
    businessServicesDetail: Array<any> = [];
    @ViewChild('businessProcessModals', { static: true }) businessProcessModals: BusinessProcessModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    filterText = '';
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    constructor(_injector: Injector,
        private _router: Router,
        private _changeDetector: ChangeDetectorRef,
        private _businessProcessproxiy: BusinessProcessServiceProxy,
    ) {
        super(_injector);
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit()
    {

    }

    onSelectionChange(selection: any[]) {
        if (selection.length >= 2) {
            this.bulkEditEvent.emit(true);
        }
        else if (selection.length <= 1) {
            this.bulkEditEvent.emit(false);
        }
    }

    getAllBusinessProcess(event?: LazyLoadEvent) {      
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._businessProcessproxiy.getAllBusinessProcessList(
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

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    BusinessProcessEdit(recordId)
    {
        this._router.navigate(['app/main/add-new-process'], { queryParams: { recordId: recordId } });
    }

    BusinessProcessDelete(recordId) {
        this.message.confirm(
            this.l('Business Process will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._businessProcessproxiy.removeBusinesProcess(recordId)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    businessProcess() {
       
        this.businessProcessModals.show();
    }
}
