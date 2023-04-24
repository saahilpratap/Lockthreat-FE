import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { BulkEditOrganizationPoliciesComponent } from './bulk-edit-organization-policies/bulk-edit-organization-policies.component';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-all-organization-policies',
  templateUrl: './all-organization-policies.component.html',
  styleUrls: ['./all-organization-policies.component.css']
})
export class AllOrganizationPoliciesComponent extends AppComponentBase implements OnInit {
    @ViewChild('bulkEditOrganizationPolicies', { static: true })
    bulkEditOrganizationPolicies: BulkEditOrganizationPoliciesComponent;
    title = 'All Organization Policies';
    subTitle = '';
    pageTitle = '';
    bulkedit: boolean;
    cols: { field: string; header: string }[];
    selectedColumns: { field: string; header: string }[];
  constructor(_injector: Injector, private _router: Router) {
    super(_injector);
    this.cols = [
        { field: 'PolicyType', header: 'Policy Type' },
        { field: 'PolicyName', header: 'Policy Name' },
        { field: 'BusinessOwner', header: 'Business Owner' },
        { field: 'PolicyContent', header: 'Policy Content' },
        { field: 'FinalReviewer', header: 'Final Reviewer (Signature)' },
        { field: 'ApprovedBy', header: 'Approved By (Signature)' },
        { field: 'PolicyOwner', header: 'Policy Owner' },
        { field: 'PolicyManager', header: 'Policy Manager' },
      ];
      this.selectedColumns = this.cols;
   }

  ngOnInit() {
  }

  getBulkEdit(e) {
    this.bulkedit = e;
  }

  addNewOrganizationPolicies() {
    this._router.navigate(['/app/main/add-edit-organization-policies']);
  }

}
