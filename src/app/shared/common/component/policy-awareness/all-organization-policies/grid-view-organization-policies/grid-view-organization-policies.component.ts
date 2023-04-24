import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  Injector,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { OrganizationPoliciesModalComponent } from '../organization-policies-modal/organization-policies-modal.component';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { Router } from '@angular/router';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { LazyLoadEvent } from 'primeng/api';
import { get } from 'http';

@Component({
  selector: 'app-grid-view-organization-policies',
  templateUrl: './grid-view-organization-policies.component.html',
  styleUrls: ['./grid-view-organization-policies.component.css'],
})
export class GridViewOrganizationPoliciesComponent extends AppComponentBase
  implements OnInit {
  @ViewChild('organizationPoliciesModal', { static: true })
  organizationPoliciesModal: OrganizationPoliciesModalComponent;
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
    // this.cols = [
    //   { field: "PolicyType", header: "Policy Type" },
    //   { field: "PolicyName", header: "Policy Name" },
    //   { field: "BusinessOwner", header: "Business Owner" },
    //   { field: "PolicyContent", header: "Policy Content" },
    //   { field: "FinalReviewer", header: "Final Reviewer (Signature)" },
    //   { field: "ApprovedBy", header: "Approved By (Signature)" },
    //   { field: "PolicyOwner", header: "Policy Owner" },
    //   { field: "PolicyManager", header: "Policy Manager" },
    // ];
    // this.selectedColumns = this.cols;
    this.getAllOrganizationPolicies();
  }

  ngOnInit() {}

  //   ngOnChanges(changes: SimpleChanges) {
  //     debugger;
  //     if(changes.selectedColumns.currentValue)
  //   }

  getAllOrganizationPolicies(event?: LazyLoadEvent) {
    // if (this.primengTableHelper.shouldResetPaging(event)) {
    //   this.paginator.changePage(0);
    //   return;
    // }
    this.primengTableHelper.totalRecordsCount = 3;
    this.primengTableHelper.records = [
      {
        PolicyID: 'POL-1',
        PolicyType: 'Information Security',
        PolicyName: 'Sample Policy',
        BusinessOwner: 'ABC',
        PolicyContent: 'Content here',
        FinalReviewer: 'Complete',
        ApprovedBy: 'ABC',
        PolicyOwner: 'XYZ',
        PolicyManager: 'DFG',
      },
      {
        PolicyID: 'POL-2',
        PolicyType: 'Information Security',
        PolicyName: 'Sample Policy',
        BusinessOwner: 'ABC',
        PolicyContent: 'Content here',
        FinalReviewer: 'Complete',
        ApprovedBy: 'ABC',
        PolicyOwner: 'XYZ',
        PolicyManager: 'DFG',
      },
      {
        PolicyID: 'POL-3',
        PolicyType: 'Information Security',
        PolicyName: 'Sample Policy',
        BusinessOwner: 'ABC',
        PolicyContent: 'Content here',
        FinalReviewer: 'Complete',
        ApprovedBy: 'ABC',
        PolicyOwner: 'XYZ',
        PolicyManager: 'DFG',
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

  policiesEdit(id) {
    this._router.navigate(['/app/main/add-edit-organization-policies']);
  }

  policiesDelete(id) {
    this.message.confirm(
      this.l('Policy will be deleted '),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
        }
      }
    );
  }
}
