import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';


@Component({
    selector: 'add-edit-virtual-asset-manager',
    templateUrl: './add-edit-virtual-asset-manager.component.html',
    styleUrls: ['./add-edit-virtual-asset-manager.component.scss']
})
export class AddEditVirtualAssetManagerComponent extends AppComponentBase implements OnInit {
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
        this._router.navigate(['/app/main/virtual-asset-manager']);
    }
}
