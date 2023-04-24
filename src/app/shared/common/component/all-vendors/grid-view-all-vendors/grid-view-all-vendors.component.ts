import { Component, OnInit, Injector, ViewChild, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { AllVendorsModalComponent } from '../all-vendors-modal/all-vendors-modal.component';
import { VendorServiceProxy } from '../../../../../../shared/service-proxies/service-proxies';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { Paginator } from 'primeng/components/paginator/paginator';
import { finalize } from 'rxjs/operators';
import { FileDownloadService } from '@shared/utils/file-download.service';


@Component({
    selector: 'grid-view-all-vendors',
    templateUrl: './grid-view-all-vendors.component.html',
    styleUrls: ['./grid-view-all-vendors.component.scss']
})
export class GridViewAllVendorsComponent extends AppComponentBase implements OnInit {
    @ViewChild('allVendorsModals', { static: true }) allVendorsModals: AllVendorsModalComponent;
    vendorDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];

    
    advancedFiltersAreShown = false;
    filterText: '';
    vendorId = '';       
    vendorName = '';    
    contactFirstName = '';
    contactLastName = '';
    email = '';       
    cellPhoneNumber = '';
    address = '';                 
    vendorType = '';       
    industry = '';     
    vendorCriticalRating = '';  
    vendorInitialRating = '';
    organizationId = '';


    constructor(_injector: Injector,
        private _fileDownloadService: FileDownloadService,
        private _changeDetector: ChangeDetectorRef,
        private _vendorServiceProxy: VendorServiceProxy,
        private _router: Router,
    ) {
        super(_injector);
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit() {
    }
    getAllVendor(event?: LazyLoadEvent)
    {
        this._changeDetector.detectChanges();
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._vendorServiceProxy.getAllVendorList(this.filterText, this.vendorId, this.vendorName, this.contactFirstName, this.contactLastName,
            this.email, this.cellPhoneNumber, this.address, this.vendorType, this.industry, this.vendorCriticalRating, this.vendorInitialRating,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {            
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    onSelectionChange(selection: any[]) {
        if (selection.length >= 2) {
            this.bulkEditEvent.emit(true);
        }
        else if (selection.length <= 1) {
            this.bulkEditEvent.emit(false);
        }
    }

    reloadPage(): void {

        this.paginator.changePage(this.paginator.getPage());
    }

    vendoredit(recordId) {
        this._router.navigate(['app/main/add-edit-vendors'], { queryParams: { recordId: recordId } });
    }

    VendorRemove(keyriskId)
    {
        this.message.confirm(
            this.l('Vendor will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._vendorServiceProxy.removedVendor(keyriskId)
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

    exportToExcel(): void {
        this._vendorServiceProxy.getVendorExcel(this.filterText, this.vendorId, this.vendorName, this.contactFirstName, this.contactLastName, this.email, this.cellPhoneNumber, this.address, this.vendorType, this.industry, this.vendorCriticalRating, this.vendorInitialRating)           
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }
}
