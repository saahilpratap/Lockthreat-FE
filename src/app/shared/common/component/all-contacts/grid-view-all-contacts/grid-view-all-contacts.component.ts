import { Component, OnInit, Injector, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { AllContactsModalComponent } from '../all-contacts-modal/all-contacts-modal.component';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { Paginator } from 'primeng/components/paginator/paginator';
import { finalize } from 'rxjs/operators';
import { ContactServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';

@Component({
    selector: 'grid-view-all-contacts',
    templateUrl: './grid-view-all-contacts.component.html',
    styleUrls: ['./grid-view-all-contacts.component.scss']
})
export class GridViewAllContactsComponent extends AppComponentBase implements OnInit {
    @ViewChild('allContactsModals', { static: true }) allContactsModals: AllContactsModalComponent;

    businessServicesDetail: Array<any> = [];

    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    advancedFiltersAreShown = false;

    filterText = '';
    name = '';
    jobTitle = '';
    directPhone = '';
    email = '';
    phone = '';
    mobileNumber = '';
    loginUser = '';
    contactOwner = '';
    vendors = '';
    contactId= '';
    
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    constructor(_injector: Injector,
        private _fileDownloadService: FileDownloadService,
        private _changeDetector: ChangeDetectorRef,
        private _contactService: ContactServiceProxy,
        private _router: Router,
    ) {
        super(_injector);
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit()
    {

    }

    getallContact(event?: LazyLoadEvent) {
        this._changeDetector.detectChanges();
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._contactService.getAllContactList(         
            this.filterText,
            this.OrgId,
            this.contactId,
            this.name,
            this.jobTitle,
            this.phone,
            this.mobileNumber,
            this.email,
            this.loginUser,
            this.contactOwner,
            this.vendors,            
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

    contactEdit(recordId)
    {
        this._router.navigate(['app/main/add-edit-contact'], { queryParams: { recordId: recordId } });
    }

    contactRemove(recordId) {
        this.message.confirm(
            this.l('Contact will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._contactService.removeContact(recordId)
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
        this._contactService.getContactToExcel(
            this.filterText, this.OrgId, this.contactId, this.name, this.jobTitle, this.phone, this.mobileNumber, this.email, this.loginUser, this.contactOwner, this.vendors,                      
        )
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }
}
