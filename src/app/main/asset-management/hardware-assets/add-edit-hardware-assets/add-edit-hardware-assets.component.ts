import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';


@Component({
    selector: 'add-edit-hardware-assets',
    templateUrl: './add-edit-hardware-assets.component.html',
    styleUrls: ['./add-edit-hardware-assets.component.scss']
})
export class AddEditHardwareAssetsComponent extends AppComponentBase implements OnInit {
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
        this._router.navigate(['/app/main/hardware-assets']);
    }
}
