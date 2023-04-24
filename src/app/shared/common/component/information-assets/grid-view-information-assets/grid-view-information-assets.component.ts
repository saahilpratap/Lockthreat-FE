import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { InformationAssetsModalComponent } from '../information-assets-modal/information-assets-modal.component';
import { AssetInformationAppserviceServiceProxy} from '@shared/service-proxies/service-proxies';
import { Paginator } from 'primeng/paginator';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { finalize } from 'rxjs/operators';


@Component({
    selector: 'grid-view-information-assets',
    templateUrl: './grid-view-information-assets.component.html',
    styleUrls: ['./grid-view-information-assets.component.scss']
})
export class GridViewInformationAssetsComponent extends AppComponentBase implements OnInit {
    @ViewChild('informationAssetsModals', { static: true }) informationAssetsModals: InformationAssetsModalComponent;
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
        private _assetServiceProxy: AssetInformationAppserviceServiceProxy,

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
    getAllassetInformation(event?: LazyLoadEvent)
    {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._assetServiceProxy.getAllAssetinformationList(
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

    assetEdit(recordId) {
        this._router.navigate(['app/main/add-edit-information-assets'], { queryParams: { recordId: recordId } });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    removeAsset(recordId) {
        this.message.confirm(
            this.l('Assest Information will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._assetServiceProxy.removeAssetInformation(recordId)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
}
