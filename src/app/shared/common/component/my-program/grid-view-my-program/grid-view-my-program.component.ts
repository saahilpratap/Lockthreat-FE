import { Component, OnInit, Injector, ViewChild, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { MyProgramModalComponent } from '../my-program-modal/my-program-modal.component';
import { finalize } from 'rxjs/operators';

import { ProgramServiceProxy } from '@shared/service-proxies/service-proxies';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';

@Component({
    selector: 'grid-view-my-program',
    templateUrl: './grid-view-my-program.component.html',
    styleUrls: ['./grid-view-my-program.component.scss']
})
export class GridViewMyProgramComponent extends AppComponentBase implements OnInit {
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('myProgramModals', { static: true }) myProgramModals: MyProgramModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    businessServicesDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
  
    projectDetail: Array<any> = [];
    list: boolean;
    grid: boolean;
    filterText: '';
    checkprogram: boolean = false;
    constructor(_injector: Injector,
        private _router: Router,
        private _programAppService: ProgramServiceProxy,
        private _changeDetector: ChangeDetectorRef,
    ) {
        super(_injector);
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit() {
        this.list = true;
        this._changeDetector.detectChanges();
    }
    onSelectionChange(selection: any[]) {
        if (selection.length >= 2) {
            this.bulkEditEvent.emit(true);
        }
        else if (selection.length <= 1) {
            this.bulkEditEvent.emit(false);
        }
    }


    getAllProject(event?: LazyLoadEvent) {
        this._changeDetector.detectChanges();
            if (this.primengTableHelper.shouldResetPaging(event)) {
                this.paginator.changePage(0);
                return;
            }
            this.primengTableHelper.showLoadingIndicator();
        this._programAppService.getAllPrograms(
            this.filterText,
            this.checkprogram,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getMaxResultCount(this.paginator, event),
                this.primengTableHelper.getSkipCount(this.paginator, event)
            ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
                
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
        }
        
   
    addNewMyPrograms() {
        this._router.navigate(['/app/main/add-edit-my-program']);
    }

    edit(recordId)
    {
        
        this._router.navigate(['/app/main/add-edit-my-program'], { queryParams: { recordId: recordId } });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }
   
    deleteprogram(recordid) {
        this._programAppService.removeProgram(recordid).subscribe(result => {
            abp.notify.success(this.l('Successfully Remove Program'));
            this.reloadPage();
        })
    }
}
