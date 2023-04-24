import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';
import { BulkEditStrategicObjectivesComponent } from './bulk-edit-strategic-objectives/bulk-edit-strategic-objectives-modal.component';


@Component({
    selector: 'strategic-objectives',
    templateUrl: './strategic-objectives.component.html',
    styleUrls: ['./strategic-objectives.component.scss']
})
export class StrategicObjectivesComponent extends AppComponentBase implements OnInit {
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = '';
    bulkedit: any = false;
    @ViewChild('bulkEditStrategicObjectivesModals', { static: true }) bulkEditStrategicObjectivesModals: BulkEditStrategicObjectivesComponent;
    

    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.bulkedit = false;
    }
    getBulkEdit(e) {
        this.bulkedit = e;
    }

    addNewStrategicObjective() {
        this._router.navigate(['/app/main/add-edit-strategic-objective']);
    }
}
