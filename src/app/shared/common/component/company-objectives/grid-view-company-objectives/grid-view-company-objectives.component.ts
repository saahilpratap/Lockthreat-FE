import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { KeyBusinessServicesModalComponent } from '../company-objectives-modal/company-objectives-modal.component';
import { StrategicObjectivesServiceProxy  } from '@shared/service-proxies/service-proxies';
import { Paginator } from 'primeng/components/paginator/paginator';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { finalize } from 'rxjs/operators';
@Component({
    selector: 'grid-view-company-objectives',
    templateUrl: './grid-view-company-objectives.component.html',
    styleUrls: ['./grid-view-company-objectives.component.scss']
})
export class GridViewCompanyObjectivesComponent extends AppComponentBase implements OnInit {
    @ViewChild('companyObjectivesModals', { static: true }) companyObjectivesModals: KeyBusinessServicesModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    companyObjectivesDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    filterText: '';
    constructor(_injector: Injector,
        private _router: Router,
        private _changeDetector: ChangeDetectorRef,
        private _strategicObjectivesService: StrategicObjectivesServiceProxy
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

    getCompanyObjectives(event?: LazyLoadEvent) {
        this._changeDetector.detectChanges();
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._strategicObjectivesService.getAllStrategicObjectives(
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

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    CompanyObjectiveEdits(recordId) {
        
        this._router.navigate(['app/main/add-edit-strategic-objective'], { queryParams: { recordId: recordId } });
    }

    companyObjectiveDelete(record) {

        this.message.confirm(
            this.l('Strategic Objective will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._strategicObjectivesService.deleteStrategicObjective(record.id)
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
