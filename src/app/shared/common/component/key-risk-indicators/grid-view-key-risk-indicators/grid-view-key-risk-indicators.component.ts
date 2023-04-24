import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { KeyRiskIndicatorsModalComponent } from '../key-risk-indicators-modal/key-risk-indicators-modal.component';
import { KeyRiskIndicatorsServiceProxy } from '../../../../../../shared/service-proxies/service-proxies';
import { PrimengTableHelper } from '../../../../../../shared/helpers/PrimengTableHelper';
import { Paginator } from 'primeng/components/paginator/paginator';
import { finalize } from 'rxjs/operators';
@Component({
    selector: 'grid-view-key-risk-indicators',
    templateUrl: './grid-view-key-risk-indicators.component.html',
    styleUrls: ['./grid-view-key-risk-indicators.component.scss']
})
export class GridViewKeyRiskIndicatorsComponent extends AppComponentBase implements OnInit {
    @ViewChild('keyRiskIndicatorsModals', { static: true }) keyRiskIndicatorsModals: KeyRiskIndicatorsModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    keyPerformanceDetail: Array<any> = [];
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    filterText: '';
    constructor(_injector: Injector,
        private _changeDetector: ChangeDetectorRef,
        private _keyriskindicatorServiceproxy: KeyRiskIndicatorsServiceProxy,
        private _router: Router,
    ) {
        super(_injector);
        this.primengTableHelper = new PrimengTableHelper();
    }

    ngOnInit()
    {

      
    }

    reloadPage(): void {
       
        this.paginator.changePage(this.paginator.getPage());
    }

    keyRiskIndicatorRemove(keyriskId)
    {

        this.message.confirm(
            this.l('key-Risk-Indicator will be deleted '),
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._keyriskindicatorServiceproxy.removeKeyRiskIndicator(keyriskId)
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

    getAllKeyRiskIndicators(event?: LazyLoadEvent)
    {

        this._changeDetector.detectChanges();
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }
        this.primengTableHelper.showLoadingIndicator();
        this._keyriskindicatorServiceproxy.getKeyRiskIndicatorList(
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

    keyRiskIndicatorEdit(recordId) {
        
        this._router.navigate(['app/main/add-edit-key-risk-indicators'], { queryParams: { recordId: recordId } });
    }  

}
