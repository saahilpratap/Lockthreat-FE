import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { KeyPerformanceIndicatorsModalComponent } from '../key-performance-indicators-modal/key-performance-indicators-modal.component';
import { KeyPerformanceIndicatorServiceProxy } from '../../../../../../shared/service-proxies/service-proxies';
import { Paginator } from 'primeng/paginator';
import { finalize } from 'rxjs/operators';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';



@Component({
    selector: 'grid-view-key-performance-indicators',
    templateUrl: './grid-view-key-performance-indicators.component.html',
    styleUrls: ['./grid-view-key-performance-indicators.component.scss']
})
export class GridViewKeyPerformanceIndicatorsComponent extends AppComponentBase implements OnInit {
    @ViewChild('keyPerformanceIndicatorsModals', { static: true }) keyPerformanceIndicatorsModals: KeyPerformanceIndicatorsModalComponent;
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
        private _keyPerformanceIndicatorServiceProxy: KeyPerformanceIndicatorServiceProxy,
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

    getAllKeyPerformanceIndicators(event?: LazyLoadEvent) {

        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._keyPerformanceIndicatorServiceProxy.getAllKeyperformanceList(
            this.filterText,
            this.OrgId,
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

    editKeyperformance(recordId)
    {
        debugger
       
        this._router.navigate(['app/main/add-edit-key-performance-indicators'], { queryParams: { recordId: recordId } });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    RemoveKeyPerformance(recordId) {

        this.message.confirm(
            this.l('key performance will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._keyPerformanceIndicatorServiceProxy.removeKeyPerformances(recordId)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
        
    }

    addEditPage() {

    }
}
