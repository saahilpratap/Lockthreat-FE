import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';

@Component({
    selector: 'risk-management',
    templateUrl: './risk-management.component.html',
    styleUrls: ['./risk-management.component.scss']
})
export class RiskManagementComponent extends AppComponentBase implements OnInit {
    title = 'Enterprise Risk Manager';
    subTitle = 'Risk Management';
    pageTitle = '';
    bulkedit: boolean;
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }
    getBulkEdit(e) {
        this.bulkedit = e;
    }
    addRriskManagement() {
        this._router.navigate(['/app/main/add-edit-risk-management']);
    }
    
}
