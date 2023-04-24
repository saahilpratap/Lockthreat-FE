import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';

@Component({
    selector: 'risk-management-dashboard',
    templateUrl: './risk-management-dashboard.component.html',
    styleUrls: ['./risk-management-dashboard.component.scss']
})
export class RiskManagementDashboardComponent extends AppComponentBase implements OnInit {
    title = 'Enterprise Risk Manager';
    subTitle = 'Risk Management Dashboard';
    pageTitle = '';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }   
}
