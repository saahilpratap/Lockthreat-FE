import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  Injector,
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { IncidentModalComponent } from '../incident-modal/incident-modal.component';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-view-incident',
  templateUrl: './grid-view-incident.component.html',
  styleUrls: ['./grid-view-incident.component.css'],
})
export class GridViewIncidentComponent extends AppComponentBase
  implements OnInit {
  @ViewChild('incidentModal', { static: true })
  incidentModal: IncidentModalComponent;
  @Output() bulkEditEvent = new EventEmitter();
  selectedRowData: any[];
  businessServicesDetail: Array<any> = [];
  filterText: '';
  display: boolean;
  @Input('showPopup') showPopupBtn: boolean;

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  constructor(_injector: Injector, private _router: Router) {
    super(_injector);
    this.primengTableHelper = new PrimengTableHelper();
  }

  ngOnInit() {}

  getAllIncidents(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }
    this.primengTableHelper.totalRecordsCount = 3;
    this.primengTableHelper.records = [
      {
        IncidentID: 1,
        IncidentTitle: 'Virus Identified on client machines',
        TechnologyId: 'EDS1',
        Description:
          'Mail Server rebooted due to power failure in the rack and failure of backup power',
        ReportedDate: '28-08-2020',
        IncidentStatus: 'Active',
        IncidentImpact: 'Yes',
      },
      {
        IncidentID: 2,
        IncidentTitle: 'Virus Identified on client machines',
        TechnologyId: 'EDS1',
        Description:
          'Mail Server rebooted due to power failure in the rack and failure of backup power',
        ReportedDate: '28-08-2020',
        IncidentStatus: 'Active',
        IncidentImpact: 'Yes',
      },
      {
        IncidentID: 3,
        IncidentTitle: 'Virus Identified on client machines',
        TechnologyId: 'EDS1',
        Description:
          'Mail Server rebooted due to power failure in the rack and failure of backup power',
        ReportedDate: '28-08-2020',
        IncidentStatus: 'Active',
        IncidentImpact: 'Yes',
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

  incidentEdit(id) {
    this._router.navigate(['/app/main/add-edit-incident']);
  }

  incidentDelete(id) {
    this.message.confirm(
      this.l('Incident will be deleted '),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
        }
      }
    );
  }
}
