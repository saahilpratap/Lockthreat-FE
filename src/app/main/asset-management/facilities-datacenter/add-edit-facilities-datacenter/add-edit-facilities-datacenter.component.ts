import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';


@Component({
    selector: 'add-edit-facilities-datacenter',
    templateUrl: './add-edit-facilities-datacenter.component.html',
    styleUrls: ['./add-edit-facilities-datacenter.component.scss']
})
export class AddEditFacilitiesDatacenterComponent extends AppComponentBase implements OnInit {
    title = 'Asset Management';
    subTitle = '';
    pageTitle = '';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }

    goToBack() {
        this._router.navigate(['/app/main/facilities-datacenter']);
    }
}
