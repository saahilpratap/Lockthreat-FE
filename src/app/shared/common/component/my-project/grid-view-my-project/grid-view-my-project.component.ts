import { Component, OnInit, Injector, ViewChild, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { MyProjectModalComponent } from '../my-project-modal/my-project-modal.component';
import { Paginator } from 'primeng/paginator';
import { finalize } from 'rxjs/operators';
import { ProjectServiceProxy } from '@shared/service-proxies/service-proxies';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';


@Component({
    selector: 'grid-view-my-project',
    templateUrl: './grid-view-my-project.component.html',
    styleUrls: ['./grid-view-my-project.component.scss']
})
export class GridViewMyProjectComponent extends AppComponentBase implements OnInit {
    @ViewChild('myProjectModals', { static: true }) myProjectModals: MyProjectModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    projectDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;  
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    list: boolean =false;
    grid: boolean;
    checked: boolean;
    filtertext: '';
    constructor(_injector: Injector,
        private _router: Router,
        private _changeDetector: ChangeDetectorRef,        
        private _projectAppService: ProjectServiceProxy     
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
        this._changeDetector.detectChanges();
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._projectAppService.getAllProjects(
            this.filtertext,
            this.checked,
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

    addNewProject() {
        this._router.navigate(['/app/main/add-edit-project']);
    }

    handleChange(event) {
        debugger
        
        this._projectAppService.getAllProjects(
            this.filtertext,
            this.checked,
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

    editProject(recordId)
    {
        this._router.navigate(['/app/main/add-edit-project'], { queryParams: { recordId: recordId } });
    }
}
