import { Component, OnInit, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import { appModuleAnimation } from '../../../../shared/animations/routerTransition';
import { AppComponentBase } from '../../../../shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { finalize } from 'rxjs/operators';
import { EmployeeServiceProxy } from '../../../../shared/service-proxies/service-proxies';
import { BulkEditEmployeesModalComponent } from './bulk-edit-employees/bulk-edit-employees-modal.component';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class EmployeesComponent extends AppComponentBase implements OnInit {
    @ViewChild('bulkEditEmployeesModals', { static: true }) bulkEditEmployeesModals: BulkEditEmployeesModalComponent;
    @ViewChild('dataTableEmployee', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    bulkedit: boolean;
    filterText = '';
    selectedRowData: any[];
    title = 'Organization';
    subTitle = 'Employee';
    pageTitle = '';
    constructor(private injector: Injector,
        private _employeeServiceProxy: EmployeeServiceProxy,
        private _router: Router
    ) {
        super(injector);
    }

    ngOnInit() {
        
    }
    onSelectionChange(selection: any[]) {
        if (selection.length >= 2) {
            this.bulkedit=true;
        }
        else if (selection.length <= 1) {
            this.bulkedit=false;
        }
    }
    getEmployeeList(event?: LazyLoadEvent) {
        //debugger;
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._employeeServiceProxy.getAllEmployees(
            this.filterText,
            undefined,
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

    addEmployees(): void {
        this._router.navigate(['/app/admin/organization-setup/organization-employees/create-or-edit']);
    }

    EditEmployees(recordId): void {
        this._router.navigate(['/app/admin/organization-setup/organization-employees/create-or-edit'], { queryParams: { recordId: recordId } });
    }

    deleteEmployee(record: any) {
        this.message.confirm(
            this.l('UserDeleteWarningMessage', record.name),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._employeeServiceProxy.deleteEmployee(record.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
}
