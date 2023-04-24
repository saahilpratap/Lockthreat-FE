import { Component, OnInit, Injector, ViewChild, ChangeDetectorRef} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/components/paginator/paginator';
import { finalize } from 'rxjs/operators';
import { AuditServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'active-audits',
    templateUrl: './active-audits.component.html',
    styleUrls: ['./active-audits.component.scss']
})
export class ActiveAuditsComponent extends AppComponentBase  { 
    auditDetail: Array<any> = [];
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;  
    filterText: '';
    OrgId: any;
    constructor(_injector: Injector,
        private _router: Router,
        private _changeDetector: ChangeDetectorRef,
        private _auditServiceProxyService: AuditServiceProxy
    ) {
        super(_injector);
    }

  

    getAllAudit(event?: LazyLoadEvent) { 
        this._changeDetector.detectChanges();
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._auditServiceProxyService.getAllAuditList(
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

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }
    auditEdits(recordId) {
        this._router.navigate(['app/main//add-edit-audit'], { queryParams: { recordId: recordId } });
    }

    auditDelete(record) {
        this.message.confirm(
            this.l('Audit will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._auditServiceProxyService.removeAudit(record.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    addNewProcess() {
        this._router.navigate(['/app/main/add-edit-audit']);
    }
}
