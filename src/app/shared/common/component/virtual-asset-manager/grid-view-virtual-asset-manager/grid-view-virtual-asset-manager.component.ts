import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { VirtualAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { Paginator } from 'primeng/paginator';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { finalize } from 'rxjs/operators';


@Component({
    selector: 'grid-view-virtual-asset-manager',
    templateUrl: './grid-view-virtual-asset-manager.component.html',
    styleUrls: ['./grid-view-virtual-asset-manager.component.scss']
})
export class GridViewVirtualAssetManagerComponent extends AppComponentBase implements OnInit {
    //@ViewChild('facilitiesDatacentersModals', { static: true }) facilitiesDatacentersModals: FacilitiesDatacentersModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    businessServicesDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    filterText: '';
    constructor(_injector: Injector,
        private _virtualAssetServiceProxy: VirtualAssetServiceProxy,

        private _router: Router,
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
    getVirtualAsset(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._virtualAssetServiceProxy.getAllVirtualAssetList(
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

    virtualAssetEdit(recordId) {
        this._router.navigate(['app/main/add-edit-virtual-asset-manager'], { queryParams: { recordId: recordId } });
    }

   virtualAssetDelete(recordId) {
        this.message.confirm(
            this.l(' Virtual Assest will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._virtualAssetServiceProxy.removeVirtualAsset(recordId)
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
