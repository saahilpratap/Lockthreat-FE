import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-edit-organization-policies',
  templateUrl: './add-edit-organization-policies.component.html',
  styleUrls: ['./add-edit-organization-policies.component.css'],
})
export class AddEditOrganizationPoliciesComponent extends AppComponentBase
  implements OnInit {
  title = 'All Organization Policies';
  subTitle = '';
  pageTitle = '';
  currentURL: string;
  constructor(
    _injector: Injector,
    private _router: Router,
    private location: Location
  ) {
    super(_injector);
    this.currentURL = this._router.url;
  }

  ngOnInit() {}

  goToBack() {
    this.location.back();
  }
}
