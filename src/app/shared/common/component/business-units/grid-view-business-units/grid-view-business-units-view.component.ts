import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { BusinessUnitsModalComponent } from '../business-units-modal/business-units-modal.component';
import { Paginator } from 'primeng/paginator';
import { BusinessUnitServiceProxy } from '../../../../../../shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';



@Component({
    selector: 'grid-view-business-units-view',
    templateUrl: './grid-view-business-units-view.component.html',
    styleUrls: ['./grid-view-business-units-view.component.scss']
})
export class GridViewBusinessUnitsComponent extends AppComponentBase implements OnInit {
    @ViewChild('businessUnitsModals', { static: true }) businessUnitsModals: BusinessUnitsModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    businessServicesDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    filterText = '';
    
    constructor(_injector: Injector,
        private _router: Router,
        private _businessUnitProxy: BusinessUnitServiceProxy,
    ) {
        super(_injector);
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
    getAllBusinessUnit(event?: LazyLoadEvent) {        
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._businessUnitProxy.getAllBusinessUnits(
            this.filterText,
            this.OrgId,    
            undefined,                  
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            debugger
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }
    addEditPage() {

    }

    editBusinessUnit(recordId): void {
        this._router.navigate(['/app/admin/organization-setup/business-units/create-or-edit'], { queryParams: { recordId: recordId } });
    }
}
