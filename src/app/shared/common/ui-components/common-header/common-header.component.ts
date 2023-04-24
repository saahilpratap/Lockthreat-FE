import { Component, OnInit, Input, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {
  @Input('title') title: string;
  @Input('subTitle') subTitle: string;
  @Input('pageTitle') pageTitle: string;
  @Input('pageMenu') pageMenu: boolean;
  @Input('pageMenuOrg') pageMenuOrg: boolean;
  @Input('pageMenuHome') pageMenuHome: boolean;
  @Input('pageMenuPro') pageMenuPro: boolean;
  @Input('pageMenuBus') pageMenuBus: boolean;
  @Input('pageMenuAsset') pageMenuAsset: boolean;
  @Input('pageMenuIncident') pageMenuIncident: boolean;
  @Input('enterpriseRiskMenu') enterpriseRiskMenu: boolean;
  @Input('pageMenuIRM') pageMenuIRM: boolean;
  @Input('thirdPartyDashoard') thirdpartyDashoard: boolean;
  @Input('complianceManager') complianceManager: boolean;
  orgPageMenu = [
    { icon: 'flaticon-file-1', title: 'Organization Entities' },
    { icon: 'flaticon2-search-1', title: 'Business Unit' },
    { icon: 'flaticon-network', title: 'Organization Employees' },
  ];

  proPageMenu = [
    { icon: 'flaticon-file-1', title: 'Add New My Programs' },
    { icon: 'flaticon2-search-1', title: 'Add New Project' },
  ];

  busPageMenu = [
    { icon: 'flaticon-file-1', title: 'Business Services' },
    { icon: 'flaticon2-search-1', title: 'Business Process' },
    { icon: 'flaticon-network', title: 'IT Services Management' },
    { icon: 'flaticon-warning-sign', title: 'Strategic Objectives' },
    { icon: 'flaticon-network', title: 'KRI Management' },
    { icon: 'flaticon-warning-sign', title: 'KPI Management' },
  ];

  assetPageMenu = [
    { icon: 'flaticon-file-1', title: 'Facilities & Datacenter' },
    { icon: 'flaticon2-search-1', title: 'Hardware Assets' },
    { icon: 'flaticon-network', title: 'Systems & Applications' },
    { icon: 'flaticon-warning-sign', title: 'Information Assets' },
    { icon: 'flaticon-network', title: 'Virtual Asset Manager' },
  ];

  irm = [
    { icon: 'flaticon-file-1', title: 'My Meeting' },
    { icon: 'flaticon2-search-1', title: 'My Task' },
    { icon: 'flaticon-network', title: 'My Finding' },
  ];

  enterPriseRiskMenu = [
    { icon: 'flaticon-file-1', title: 'Risk Register Report' },
    { icon: 'flaticon2-search-1', title: 'Risk Treatment Plans' },
    { icon: 'flaticon-network', title: 'Systems & Applications' },
    { icon: 'flaticon-warning-sign', title: 'Information Assets' },
    { icon: 'flaticon-network', title: 'Virtual Asset Manager' },
  ];

  thirdPartyDashoard = [
    { icon: 'flaticon-file-1', title: 'All Vendors' },
    { icon: 'flaticon2-search-1', title: 'All Contracts' },
    { icon: 'flaticon-network', title: 'All Contacts' },
    { icon: 'flaticon-warning-sign', title: 'Add Meeting' },
    { icon: 'flaticon-network', title: 'Add Task' },
    { icon: 'flaticon-network', title: 'Add Findings' },
  ];

  incidentManagementMenu = [
    { icon: 'flaticon-file-1', title: 'Incidents' },
  ];
  complainceManagerMenu = [
    { icon: 'flaticon-file-1', title: 'Authoratative Citations' },
  ];
  constructor(injector: Injector, private _router: Router) {}

  ngOnInit() {}

  clickOrganization(btnId) {
    switch (btnId) {
      case 0: {
        this._router.navigate([
          '/app/admin/organization-setup/organization-entities',
        ]);
        break;
      }
      case 1: {
        this._router.navigate(['/app/admin/organization-setup/business-units']);
        break;
      }
      case 2: {
        this._router.navigate([
          '/app/admin/organization-setup/organization-employees',
        ]);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  clickBusiness(btnId) {
    switch (btnId) {
      case 0: {
        this._router.navigate(['/app/main/business-services']);
        break;
      }
      case 1: {
        this._router.navigate(['/app/main/business-process']);
        break;
      }
      case 2: {
        this._router.navigate(['/app/main/it-services']);
        break;
      }
      case 3: {
        this._router.navigate(['/app/main/strategic-objective']);
        break;
      }
      case 4: {
        this._router.navigate(['/app/main/key-risk-indicators']);
        break;
      }
      case 5: {
        this._router.navigate(['/app/main/key-performance-indicators']);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  clickIrm(btnId) {
    switch (btnId) {
      case 0: {
        this._router.navigate(['/app/main/add-meeting']);
        break;
      }
      case 1: {
        this._router.navigate(['/app/main/task']);
        break;
      }
      case 2: {
        this._router.navigate(['/app/main/all-findings']);
        break;
      }
      case 3: {
        this._router.navigate(['/app/main/all-findings']);
        break;
      }
      //case 4: {
      //    this._router.navigate(['/app/main/key-risk-indicators']);
      //    break;
      //}
      //case 5: {
      //    this._router.navigate(['/app/main/key-performance-indicators']);
      //    break;
      //}
      default: {
        //statements;
        break;
      }
    }
  }

  clickProjectProgram(btnId) {
    switch (btnId) {
      case 0: {
        this._router.navigate(['/app/main/add-edit-my-program']);
        break;
      }
      case 1: {
        this._router.navigate(['/app/main/add-edit-project']);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  clickAssetManagement(btnId) {
    switch (btnId) {
      case 0: {
        this._router.navigate(['/app/main/facilities-datacenter']);
        break;
      }
      case 1: {
        this._router.navigate(['/app/main/hardware-assets']);
        break;
      }
      case 2: {
        this._router.navigate(['/app/main/systems-applications']);
        break;
      }
      case 3: {
        this._router.navigate(['/app/main/information-assets']);
        break;
      }
      case 4: {
        this._router.navigate(['/app/main/virtual-asset-manager']);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  clickThirdpartyDashoard(btnId) {
    debugger;
    switch (btnId) {
      case 0: {
        this._router.navigate(['/app/main/all-vendors']);
        break;
      }
      case 1: {
        this._router.navigate(['/app/main/all-contracts']);
        break;
      }
      case 2: {
        this._router.navigate(['/app/main/all-contacts']);
        break;
      }
      case 3: {
        this._router.navigate(['/app/main/minutes-meeting']);
        break;
      }
      case 4: {
        this._router.navigate(['/app/main/task']);
        break;
      }
      case 5: {
        this._router.navigate(['/app/main/all-findings']);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  clickIncidents(btnId){
    debugger;
    switch (btnId) {
      case 0: {
        this._router.navigate(['/app/main/incidents']);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  clickComplianceManager(btnId){
    debugger;
    switch (btnId) {
      case 0: {
        this._router.navigate(['/app/main/citation-reports']);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }
}
