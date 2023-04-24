import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';

@Component({
    selector: 'asset-management',
    templateUrl: './asset-management.component.html',
    styleUrls: ['./asset-management.component.scss']
})
export class AssetManagementComponent extends AppComponentBase implements OnInit {
    title = 'Asset Management';
    subTitle = 'Asset Dashboard';
    pageTitle = '';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }
   
}
