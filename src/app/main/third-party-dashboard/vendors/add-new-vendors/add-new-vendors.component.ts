import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';


@Component({
    selector: 'add-new-vendors',
    templateUrl: './add-new-vendors.component.html',
    styleUrls: ['./add-new-vendors.component.scss']
})
export class AddNewVendorsComponent extends AppComponentBase implements OnInit {
    title = 'All Vendors';
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
        this._router.navigate(['/app/main/all-vendors']);
    }
}
