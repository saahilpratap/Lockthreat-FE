import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';


@Component({
    selector: 'add-new-it-services',
    templateUrl: './add-new-it-services.component.html',
    styleUrls: ['./add-new-it-services.component.scss']
})
export class AddNewItServicesComponent extends AppComponentBase implements OnInit {
    @Output() saveServicesData: EventEmitter<any> = new EventEmitter<any>();
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = 'Business Services';
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }

    goToBack() {
        this._router.navigate(['/app/main/it-services']);
    }
    getMember() {
    }
}
