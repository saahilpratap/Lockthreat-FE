import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';

@Component({
    selector: 'risk-treatment-plans',
    templateUrl: './risk-treatment-plans.component.html',
    styleUrls: ['./risk-treatment-plans.component.scss']
})
export class RiskTreatmentPlansComponent extends AppComponentBase implements OnInit {
    title = 'Enterprise Risk Manager';
    subTitle = 'Risk Treatment Plans';
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
    addRriskTreatmentPlans() {
        this._router.navigate(['/app/main/add-edit-risk-treatment-plans']);
    }
    
}
