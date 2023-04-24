import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';

@Component({
    selector: 'business-management',
    templateUrl: './business-management.component.html',
    styleUrls: ['./business-management.component.scss']
})
export class BusinessManagementComponent extends AppComponentBase implements OnInit {
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = '';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }
    gotoBusinessServices() {
        this._router.navigate(['/app/main/business-services']);
    }
    gotoBusinessProcess() {
        this._router.navigate(['/app/main/business-process']);
    }
    gotoServicesManagement() {

    }
    gotoStrategicObjectives() {

    }
    gotoKPIManagement() {

    }
}
