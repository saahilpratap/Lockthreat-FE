import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';

@Component({
    selector: 'remediation-plans',
    templateUrl: './remediation-plans.component.html',
    styleUrls: ['./remediation-plans.component.scss']
})
export class RemediationPlansComponent extends AppComponentBase implements OnInit {
    title = 'Enterprise Risk Manager';
    subTitle = 'Remediation Plans';
    pageTitle = '';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }   
}
