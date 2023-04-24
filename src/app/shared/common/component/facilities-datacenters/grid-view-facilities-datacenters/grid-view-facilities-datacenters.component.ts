import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { FacilitiesDatacentersModalComponent } from '../facilities-datacenters-modal/facilities-datacenters-modal.component';
import { FacilitieDatacenterServiceProxy } from '@shared/service-proxies/service-proxies';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { finalize } from 'rxjs/operators';


@Component({
    selector: 'grid-view-facilities-datacenters',
    templateUrl: './grid-view-facilities-datacenters.component.html',
    styleUrls: ['./grid-view-facilities-datacenters.component.scss']
})
export class GridViewFacilitiesDatacentersComponent extends AppComponentBase implements OnInit {
    @ViewChild('facilitiesDatacentersModals', { static: true }) facilitiesDatacentersModals: FacilitiesDatacentersModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    businessServicesDetail: Array<any> = [];
    filterText: '';
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    constructor(_injector: Injector,
        private _facilitiesDatacenterServiceProxy: FacilitieDatacenterServiceProxy,
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


    getFacilitiesDatacenters(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._facilitiesDatacenterServiceProxy.getAllFacilitiesDatacenterList(
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

    facilitieDatacenterEdit(recordId) {
        this._router.navigate(['app/main/add-edit-facilities-datacenter'], { queryParams: { recordId: recordId } });
    }

    facilitieDatacenterDelete(recordId) {
        this.message.confirm(
            this.l(' Facilitie Datacenter will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._facilitiesDatacenterServiceProxy.removeFacilitieDatacenter(recordId)
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
