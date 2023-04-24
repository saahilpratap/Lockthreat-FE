import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'bulkEditBusinessProcessModals',
    templateUrl: './bulk-edit-business-process-modal.component.html',
    styleUrls: ['./bulk-edit-business-process-modal.component.scss']
})
export class BulkEditBusinessProcessModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('bulkEditBusinessProcessModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    test = false;


    bulkEditBusinessProcess = [
        { label: 'Process Type', value: 'processType' },
        { label: 'Process / Activity Cycle', value: 'processActivityCycle' },
        { label: 'Business Process Name', value: 'businessProcessName' },
        { label: 'Description', value: 'description' },
        { label: 'Status', value: 'status' },
        { label: 'SLA Applicable', value: 'sLAApplicable' },
        { label: 'Address', value: 'address' },
        { label: 'Company Name', value: 'companyName' },
        { label: 'Business Unit Owner', value: 'businessUnitOwner' },
        { label: 'BU Name', value: 'bUName' },
        { label: 'Process Owner', value: 'processOwner' },
        { label: 'Business Unit(s) Dependent', value: 'pusinessUnitDependent' },
        { label: 'Process Manager', value: 'process Manager' },
        { label: 'Government / Regulatory Mandate', value: 'governmentRegulatoryMandate' },
        { label: 'Authoratative Source(s)', value: 'authoratativeSource' },
        { label: 'Related Business Service(s)', value: 'relatedBusinessService' },     
        { label: 'Process Priority(Critcality)', value: 'processPriorityCritcality' },
        { label: 'Confidentiality', value: 'confidentiality' },
        { label: 'Intergrity', value: 'intergrity' },
        { label: 'Availibility', value: 'availibility' },
        { label: 'Others', value: 'others' },
        { label: 'Review Period(BIA)', value: 'reviewPeriodBIA' },
        { label: 'File upload', value: 'fileupload' },
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
