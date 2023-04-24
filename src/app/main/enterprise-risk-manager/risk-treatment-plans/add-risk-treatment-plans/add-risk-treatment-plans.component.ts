import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';


@Component({
    selector: 'add-risk-treatment-plans',
    templateUrl: './add-risk-treatment-plans.component.html',
    styleUrls: ['./add-risk-treatment-plans.component.scss']
})
export class AddNewRiskTreatmentPlansComponent extends AppComponentBase implements OnInit {
    @Output() saveServicesData: EventEmitter<any> = new EventEmitter<any>();
    title = 'Enterprise Risk Manager';
    subTitle = 'Add Risk Treatment Plans';
    pageTitle = '';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }

    goToBack() {
        this._router.navigate(['/app/main/risk-treatment-plans']);
    }
    saveRiskTreatmentPlans() {
    }
}
