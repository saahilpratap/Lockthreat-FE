import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compliance-manager-dashboard',
  templateUrl: './compliance-manager-dashboard.component.html',
  styleUrls: ['./compliance-manager-dashboard.component.css'],
})
export class ComplianceManagerDashboardComponent extends AppComponentBase
  implements OnInit {
  list: boolean;
  grid: boolean;
  checked: boolean;
  title = 'Compliance Management';
  subTitle = 'Compliance Management Dashboard';
  pageTitle = '';
  constructor(_injector: Injector, private _router: Router) {
    super(_injector);
  }

  ngOnInit() {}
}
