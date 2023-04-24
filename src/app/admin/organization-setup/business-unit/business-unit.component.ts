import { Component, OnInit, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { BusinessUnitServiceProxy } from '../../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from '../../../../shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { appModuleAnimation } from '../../../../shared/animations/routerTransition';
import { BulkEditBusinessUnitComponent } from './bulk-edit-business-unit/bulk-edit-business-unit-modal.component';

@Component({
    selector: 'app-business-unit',
    templateUrl: './business-unit.component.html',
    styleUrls: ['./business-unit.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class BusinessUnitComponent extends AppComponentBase implements OnInit {
    @ViewChild('dataTableBusinessUnit', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('bulkEditBusinessUnitModals', { static: true }) bulkEditBusinessUnitModals: BulkEditBusinessUnitComponent;

    bulkedit: boolean;
    filterText = '';  
    title = 'Organization';
    subTitle = 'Business Unit';
    pageTitle = '';
    constructor(private injector: Injector,
        private _businessUnitProxy: BusinessUnitServiceProxy,
        private _router: Router
    ) {
        super(injector);
    }

    ngOnInit() {
        
    }
    getBulkEdit(e) {
        this.bulkedit = e;
    }
    getBusinessUnitList(event?: LazyLoadEvent) {
        //debugger;
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._businessUnitProxy.getAllBusinessUnits(
            this.filterText,
            undefined,
            undefined,           
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    addBusinessUnit(): void {
        this._router.navigate(['/app/admin/organization-setup/business-units/create-or-edit']);
    }

    EditBusinessUnit(recordId): void {
        this._router.navigate(['/app/admin/organization-setup/business-units/create-or-edit'], { queryParams: { recordId: recordId } });

    }

}
