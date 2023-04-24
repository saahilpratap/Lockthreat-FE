import { Component, OnInit, ViewChild, Input, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '../../../../shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { finalize } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { OrganizationSetupServiceProxy, ProgramServiceProxy, OrganizationSetupListDto } from '../../../../shared/service-proxies/service-proxies';
import { appModuleAnimation } from '../../../../shared/animations/routerTransition';
import { BulkEditOrganizationEntitiesComponent } from './bulk-edit-organization-entities/bulk-edit-organization-entities-modal.component';

@Component({
    selector: 'app-organization-entities',
    templateUrl: './organization-entities.component.html',
    styleUrls: ['./organization-entities.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class OrganizationEntitiesComponent extends AppComponentBase implements OnInit {
    @ViewChild('bulkEditOrganizationEntitiesModals', { static: true }) bulkEditOrganizationEntitiesModals: BulkEditOrganizationEntitiesComponent;
    @ViewChild('dataTableSetupModal', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('orgSetupDirectiveModal', { static: true }) modal: ModalDirective;
    selectedRowData: any[];
    bulkedit: boolean;
    title = 'Organization';
    subTitle = 'Organization Entities';
    pageTitle = '';
    filterText = '';
    data: any;
    constructor(
        injector: Injector,
        private _organizationSetupProxy: OrganizationSetupServiceProxy,
        private _programAppService: ProgramServiceProxy,
        private _router: Router,
        // public modalRef: NgbActiveModal
    ) {
        super(injector);
    }

    ngOnInit(): void {
       
    }
    onSelectionChange(selection: any[]) {
        if (selection.length >= 2) {
            this.bulkedit=true;
        }
        else if (selection.length <= 1) {
            this.bulkedit=false;
        }
    }
    getCompanysListModal(event?: LazyLoadEvent) {
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
    checkValue(event: any) {
        debugger
        console.log(event);
    }

    addOrganizationEntities() {
        this._router.navigate(['/app/admin/organization-setup/organization-entities/create-or-edit']);
    }

    EditOrganization(recordId): void {
        debugger
        this._router.navigate(['/app/admin/organization-setup/organization-entities/create-or-edit'], { queryParams: { recordId: recordId } });
    }

}
