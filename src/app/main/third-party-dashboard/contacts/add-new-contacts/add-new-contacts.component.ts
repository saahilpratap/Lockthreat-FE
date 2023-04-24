import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';


@Component({
    selector: 'add-new-contacts',
    templateUrl: './add-new-contacts.component.html',
    styleUrls: ['./add-new-contacts.component.scss']
})
export class AddNewContactsComponent extends AppComponentBase implements OnInit {
    title = 'Third Party Dashoard';
    subTitle = 'All Contacts';
    pageTitle = '';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }

    goToBack() {
        this._router.navigate(['/app/main/all-contacts']);
    }
}
