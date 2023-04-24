import { Component, OnInit, Injector, ViewChild, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { AllContractsModalComponent } from '../all-contracts-modal/all-contracts-modal.component';
import { ContractServiceProxy} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { finalize } from 'rxjs/operators';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { number } from 'prop-types';


@Component({
    selector: 'grid-view-all-contracts',
    templateUrl: './grid-view-all-contracts.component.html',
    styleUrls: ['./grid-view-all-contracts.component.scss']
})
export class GridViewAllContractsComponent extends AppComponentBase implements OnInit {
    @ViewChild('allContractsModals', { static: true }) allContractsModals: AllContractsModalComponent;

    businessServicesDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];

    advancedFiltersAreShown = false;
    Filter = '';
    ContractId = '';
    ContractTitle = '';
    ContractReference = '';
    Description = '';
    ContractValue : number;
    ContractType = '';
    ContractCategory = ''; 
    Vendor = '';
    LockThreatOrganization = '';
    employee = '';
    OrganizationId = '';



    constructor(private _fileDownloadService: FileDownloadService,
        _injector: Injector,
        private _changeDetector: ChangeDetectorRef,
        private _contractService: ContractServiceProxy,
        private _router: Router,
    ) {
        super(_injector);
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit()
    {

    }

    getAllContract(event?: LazyLoadEvent)
    {
        this._changeDetector.detectChanges();
        if (this.primengTableHelper.shouldResetPaging(event))
        {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();
        this._contractService.getAllContractList(this.Filter, this.ContractId, this.ContractTitle, this.ContractReference, this.Description, this.ContractValue,
            this.ContractType,
            this.ContractCategory,
            this.Vendor,
            this.LockThreatOrganization,      
            this.OrgId,          
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

    contractEdit(recordId) {
        this._router.navigate(['app/main/add-edit-contract'], { queryParams: { recordId: recordId } });
    }

    contractRemove(recordId) {
        this.message.confirm(
            this.l('Contract will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._contractService.removeContract(recordId)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    onSelectionChange(selection: any[]) {
        if (selection.length >= 2) {
            this.bulkEditEvent.emit(true);
        }
        else if (selection.length <= 1) {
            this.bulkEditEvent.emit(false);
        }
    }

    exportToExcel(): void {
        this._contractService.getContractToExcel(this.Filter,
            this.ContractId, this.ContractTitle, this.ContractReference,
            this.Description, this.ContractValue, this.ContractType, this.ContractCategory, this.Vendor,
            this.LockThreatOrganization, this.OrgId)                    
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }


    addEditPage() {

    }
}
