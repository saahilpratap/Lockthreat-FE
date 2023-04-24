import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';


@Component({
    selector: 'add-new-contracts',
    templateUrl: './add-new-contracts.component.html',
    styleUrls: ['./add-new-contracts.component.scss']
})
export class AddNewContractComponent extends AppComponentBase implements OnInit {
    title = 'Third Party Dashoard';
    subTitle = 'All Contracts';
    pageTitle = '';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }

    goToBack() {
        this._router.navigate(['/app/main/all-contracts']);
    }
}
