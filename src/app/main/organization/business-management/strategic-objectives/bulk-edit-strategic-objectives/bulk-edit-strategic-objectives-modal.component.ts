import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'bulkEditStrategicObjectivesModals',
    templateUrl: './bulk-edit-strategic-objectives-modal.component.html',
    styleUrls: ['./bulk-edit-strategic-objectives-modal.component.scss']
})
export class BulkEditStrategicObjectivesComponent extends AppComponentBase implements OnInit {

    @ViewChild('bulkEditStrategicObjectivesModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    bulkEditStrategicObjectives = [
        { label: 'SOB ID', value: 'sOBID' },
        { label: 'Company Name', value: 'companyName' },
        { label: 'Goal', value: 'goal' },
        { label: 'Strategic Objective Title', value: 'strategicObjectiveTitle' },
        { label: 'Description', value: 'description' },
        { label: 'Executive Sponsor', value: 'executiveSponsor' },
        { label: 'Effective Date', value: 'effectiveDate' },
        { label: 'Status', value: 'status' },
        { label: 'Type', value: 'type' },
        { label: 'SOB_LV', value: 'sOB_LV' }
    ];
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
       
    }
    
    show(): void {
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
    save() {

    }
}
