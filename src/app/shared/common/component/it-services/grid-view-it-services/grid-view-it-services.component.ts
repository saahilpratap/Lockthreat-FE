import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { ITServicesModalComponent } from '../it-services-modal/it-services-modal.component';
import { finalize } from 'rxjs/operators';
import { Paginator } from 'primeng/components/paginator/paginator';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { ITServiceServiceProxy } from '../../../../../../shared/service-proxies/service-proxies';


@Component({
    selector: 'grid-view-it-services',
    templateUrl: './grid-view-it-services.component.html',
    styleUrls: ['./grid-view-it-services.component.scss']
})
export class GridViewKeyITServicesComponent extends AppComponentBase implements OnInit {
    @ViewChild('itServicesModals', { static: true }) itServicesModals: ITServicesModalComponent;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    iTServiceDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @Output() bulkEditEvent = new EventEmitter();
    filterText: '';

    selectedRowData: any[];
    constructor(_injector: Injector,
        private _itserviceProxy: ITServiceServiceProxy,
        private _changeDetector: ChangeDetectorRef,
        private _router: Router,
    ) {
        super(_injector);
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit() {
    }


    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    onSelectionChange(selection: any[]) {        
        if (selection.length >= 2) {
            this.bulkEditEvent.emit(true);
        }
        else if (selection.length <= 1) {
            this.bulkEditEvent.emit(false);
        }
    }

    getAllITServices(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._itserviceProxy.getAllITServiceList(
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

    ITserviceEdit(recordId)
    {
        this._router.navigate(['/app/main/add-edit-it-services'], { queryParams: { recordId: recordId } });
    }

    ITserviceRemove(ITserviceId) {
        this.message.confirm(
            this.l('ITServices will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._itserviceProxy.removeITService(ITserviceId)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
}
