import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'add-edit-strategic-objectives',
    templateUrl: './add-edit-strategic-objectives.component.html',
    styleUrls: ['./add-edit-strategic-objectives.component.scss']
})
export class AddEditStrategicObjectivesComponent extends AppComponentBase implements OnInit {
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = '';
    recordId: any;
    creationDateRange: Date;
    constructor(_injector: Injector,
        private route: ActivatedRoute,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        debugger
        this.route.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );
    }

    goToBack() {
        this._router.navigate(['/app/main/strategic-objective']);
    }
}
