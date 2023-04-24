import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { finalize } from 'rxjs/operators';
import { HardWareAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { Paginator } from 'primeng/paginator';

@Component({
    selector: 'grid-view-hardware-assets',
    templateUrl: './grid-view-hardware-assets.component.html',
    styleUrls: ['./grid-view-hardware-assets.component.scss']
})
export class GridViewHardwareAssetsComponent extends AppComponentBase implements OnInit {
    //@ViewChild('facilitiesDatacentersModals', { static: true }) facilitiesDatacentersModals: FacilitiesDatacentersModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    hardwareAssetDetail: Array<any> = [];
    display: boolean;
    filterText: '';

    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    constructor(_injector: Injector,
        private _hardwareServiceProxy: HardWareAssetServiceProxy,
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


    getHardwareAsset(event?: LazyLoadEvent)
    {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._hardwareServiceProxy.getAllHardwareAssetList(
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

    hardWareAssetEdit(recordId)
    {
        this._router.navigate(['app/main/add-edit-hardware-assets'], { queryParams: { recordId: recordId } });
    }

    hardWareAssetDelete(recordId)
    {
        this.message.confirm(
            this.l(' Hardware Assest will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._hardwareServiceProxy.removehardwareAsset(recordId)
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
