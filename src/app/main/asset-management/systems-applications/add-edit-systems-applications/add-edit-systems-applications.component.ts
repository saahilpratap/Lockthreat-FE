import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';


@Component({
    selector: 'add-edit-systems-applications',
    templateUrl: './add-edit-systems-applications.component.html',
    styleUrls: ['./add-edit-systems-applications.component.scss']
})
export class AddEditSystemsApplicationsComponent extends AppComponentBase implements OnInit {
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
        this._router.navigate(['/app/main/systems-applications']);
    }
}
