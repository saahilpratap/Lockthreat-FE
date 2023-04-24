import { Component, OnInit, ViewEncapsulation, Injector, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { appModuleAnimation } from '../../../shared/animations/routerTransition';
import { AppComponentBase } from '../../../shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { OrganizationSetupServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'organization-setup',
    templateUrl: './organization-setup.component.html',
    styleUrls: ['./organization-setup.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class OrganizationSetupComponent extends AppComponentBase implements AfterViewInit {
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    filterText = '';
    title = 'Organization';
    subTitle = 'Employee';
    pageTitle = '';
    selectedRowData: any[];

    constructor(injector: Injector,
        private _organizationSetupProxy: OrganizationSetupServiceProxy,
        private _router: Router) {
        super(injector);
    }
    ngOnInit() {
        this.selectedRowData = [];
    }
    ngAfterViewInit(): void {
        this.primengTableHelper.adjustScroll(this.dataTable);
    }
    getDismissReason(reason: any) {
        throw new Error('Method not implemented.');
    }   
    onSelectionChange(selection: any[]) {
        debugger       
        if (selection.length >= 2) {
          
        }
        //for (let i = selection.length - 1; i >= 0; i--) {
        //    let data = selection[i];           
        //}
        //this.selectedRowData = selection;
    }
    getCompanysList(event?: LazyLoadEvent) {
        //debugger;
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._organizationSetupProxy.getAllOrgnizationSetup(
            this.filterText,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    addOrganizationEntities() {
    }

    EditOrganization(recordId): void {
        this._router.navigate(['/app/admin/organization-setup/organization-entities/create-or-edit'], { queryParams: { recordId: recordId } });
    }
    
}
