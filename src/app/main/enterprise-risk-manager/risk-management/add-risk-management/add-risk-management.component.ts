import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';


@Component({
    selector: 'add-risk-management',
    templateUrl: './add-risk-management.component.html',
    styleUrls: ['./add-risk-management.component.scss']
})
export class AddNewRiskManagementComponent extends AppComponentBase implements OnInit {
    @Output() saveServicesData: EventEmitter<any> = new EventEmitter<any>();
    title = 'Enterprise Risk Manager';
    subTitle = 'Add Risk Management';
    pageTitle = '';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }

    goToBack() {
        this._router.navigate(['/app/main/add-edit-risk-management']);
    }
    getMember() {
    }
}
