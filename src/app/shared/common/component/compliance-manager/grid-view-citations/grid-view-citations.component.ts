import { Component, OnInit, ViewChild, Output, EventEmitter, Input, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { CitationsModalComponent } from '../citations-modal/citations-modal.component';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-view-citations',
  templateUrl: './grid-view-citations.component.html',
  styleUrls: ['./grid-view-citations.component.css']
})
export class GridViewCitationsComponent extends AppComponentBase implements OnInit {
  @ViewChild('citationsReportsModal', { static: true })
  citationsReportsModal: CitationsModalComponent;
  @Output() bulkEditEvent = new EventEmitter();
  selectedRowData: any[];
  businessServicesDetail: Array<any> = [];
  filterText: '';
  display: boolean;
  @Input('showPopup') showPopupBtn: boolean;
  @Input('columns') selectedColumns: { field: string; header: string }[];

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  cols: { field: string; header: string }[];
  //   selectedColumns: { field: string; header: string }[];
  constructor(_injector: Injector, private _router: Router) {
    super(_injector);
    this.primengTableHelper = new PrimengTableHelper();
    this.getAllCitiationsReport();
  }

  ngOnInit() {}

  getAllCitiationsReport(event?: LazyLoadEvent) {
    // if (this.primengTableHelper.shouldResetPaging(event)) {
    //   this.paginator.changePage(0);
    //   return;
    // }
    this.primengTableHelper.totalRecordsCount = 3;
    this.primengTableHelper.records = [
      {
        ID: '3256486546',
        AuthoratativeDocument: 'CObIT-1',
        ParentCitation: 'CIT-1',
        OriginID: 'ORG-123',
        CitationID: 'CIT-123',
        CitationTitle: 'ABC',
        CitationType: 'Control Objective',
        FrameworkObjectives: 'Compliance Objective',
        CitationClass: 'DFG',
        ControlObjective: 'XYZ',
        CustomApplicability: 'JKL',
      },
      {
        ID: '123574964',
        AuthoratativeDocument: 'CObIT-1',
        ParentCitation: 'CIT-1',
        OriginID: 'ORG-123',
        CitationID: 'CIT-123',
        CitationTitle: 'ABC',
        CitationType: 'Control Objective',
        FrameworkObjectives: 'Compliance Objective',
        CitationClass: 'DFG',
        ControlObjective: 'XYZ',
        CustomApplicability: 'JKL',
      },
      {
        ID: '564871234',
        AuthoratativeDocument: 'CObIT-1',
        ParentCitation: 'CIT-1',
        OriginID: 'ORG-123',
        CitationID: 'CIT-123',
        CitationTitle: 'ABC',
        CitationType: 'Control Objective',
        FrameworkObjectives: 'Compliance Objective',
        CitationClass: 'DFG',
        ControlObjective: 'XYZ',
        CustomApplicability: 'JKL',
      },
    ];
    // this.primengTableHelper.showLoadingIndicator();
    // this.incidentServiceProxy
    //   .getAllFacilitiesDatacenterList(
    //     this.filterText,
    //     this.OrgId,
    //     this.primengTableHelper.getSorting(this.dataTable),
    //     this.primengTableHelper.getMaxResultCount(this.paginator, event),
    //     this.primengTableHelper.getSkipCount(this.paginator, event)
    //   )

    //   .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
    //   .subscribe((result) => {
    //     this.primengTableHelper.totalRecordsCount = result.totalCount;
    //     debugger;
    //     this.primengTableHelper.records = result.items;
    //     this.primengTableHelper.hideLoadingIndicator();
    //   });
  }

  onSelectionChange(selection: any[]) {
    if (selection.length >= 2) {
      this.bulkEditEvent.emit(true);
    } else if (selection.length <= 1) {
      this.bulkEditEvent.emit(false);
    }
  }

  citationsReportEdit(id) {
    this._router.navigate(['/app/main/add-edit-citation-reports']);
  }

  citationsDelete(id) {
    this.message.confirm(
      this.l('Report will be deleted '),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
        }
      }
    );
  }

}
