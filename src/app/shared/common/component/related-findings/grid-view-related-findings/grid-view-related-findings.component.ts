import { Component, OnInit, Injector, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { RelatedFindingsModalComponent } from '../related-findings-modal/related-findings-modal.component';
import { FindingServiceProxy } from '../../../../../../shared/service-proxies/service-proxies';
import { Paginator } from 'primeng/paginator';
import { finalize } from 'rxjs/operators';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';

@Component({
    selector: 'grid-view-related-findings',
    templateUrl: './grid-view-related-findings.component.html',
    styleUrls: ['./grid-view-related-findings.component.scss']
})
export class GridViewRelatedFindingsComponent extends AppComponentBase implements OnInit {
    @ViewChild('relatedFindingsModals', { static: true }) relatedFindingsModals: RelatedFindingsModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    taskData: Array<any> = [];
    display: boolean;
    @Input('profilePic') profilePic: boolean;  
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    filterText: '';
    constructor(_injector: Injector,
        private _changeDetector: ChangeDetectorRef,
        private _findingService: FindingServiceProxy,       
        private _router: Router,
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

    getAllFinding(event?: LazyLoadEvent)
    {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._findingService.getAllFindingList(
            this.filterText,
            this.OrgId,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    editFinding(recordId)
   {
    this._router.navigate(['app/main/add-findings'], { queryParams: { recordId: recordId } });   
    }

    DeleteFinding(recordId) {
        this.message.confirm(
            this.l(' Finding will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._findingService.removeFinding(recordId)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    addEditPage()
    {

    }
   exportToExcel()
     {

     }

}
