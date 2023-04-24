import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { BusinessServicesModalComponent } from '../business-services-modal/business-services-modal.component';

import { BusinessServicesServiceProxy } from '../../../../../../shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';


@Component({
    selector: 'grid-view-business-services',
    templateUrl: './grid-view-business-services.component.html',
    styleUrls: ['./grid-view-business-services.component.scss']
})
export class GridViewBusinessServicesComponent extends AppComponentBase implements OnInit {
    @ViewChild('businessServicesModals', { static: true }) businessServicesModals: BusinessServicesModalComponent;   
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    businessServicesDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    filterText = '';
    constructor(_injector: Injector,
        private _businessServicesProxy: BusinessServicesServiceProxy,
        private _router: Router,
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

    getAllBusinessServices(event?: LazyLoadEvent)
    {
        if (this.primengTableHelper.shouldResetPaging(event))
        {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();
        this._businessServicesProxy.getAllBusinessServicesList(
            this.filterText,
            this.OrgId,           
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

    editBusinessService(recordId) {
        this._router.navigate(['/app/main/add-new-services'], { queryParams: { recordId: recordId } });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    removeBusinessService(businessServiceId) {
        this.message.confirm(
            this.l('Business Services will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._businessServicesProxy.removeBusinessService(businessServiceId)
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
