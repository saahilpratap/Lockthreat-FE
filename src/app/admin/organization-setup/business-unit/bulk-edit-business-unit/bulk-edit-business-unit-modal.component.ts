import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'bulkEditBusinessUnitModals',
    templateUrl: './bulk-edit-business-unit-modal.component.html',
    styleUrls: ['./bulk-edit-business-unit-modal.component.scss']
})
export class BulkEditBusinessUnitComponent extends AppComponentBase implements OnInit {
    businessService: SelectItem[];
    @ViewChild('bulkEditBusinessUnitModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    showMultiselectRequiredMessage = false;

    processActivity: boolean;
    processType: boolean;
    businesspProcess: boolean;
    description: boolean;
    status: boolean;
    sLAApplicable: boolean;
    address: boolean;
    companyName: boolean;
    businessUnit: boolean;
    government: boolean;
    authoratative: boolean;
    relatedBusinessService: boolean;
    processPriority: boolean;
    confidentiality: boolean;
    intergrity: boolean;
    availibility: boolean;
    others: boolean;
    reviewPeriod: boolean;

    bulkEditBusinessUnit: any;
    selectedCars1: string[] = [];

    constructor(_injector: Injector,
        private _router: Router,
       
    ) {
        super(_injector);
        
     
       
    }

    ngOnInit() {

        this.bulkEditBusinessUnit = [
            { label: 'Process / Activity Cycle', value: 'processActivity' },
            { label: 'Process Type', value: 'processType' },
            { label: 'Business Process Name', value: 'businesspProcess' },
            { label: 'Description', value: 'description' },
            { label: 'Status', value: 'status' },
            { label: 'SLA Applicable', value: 'sLAApplicable' },
            { label: 'Address', value: 'address' },
            { label: 'Company Name', value: 'companyName' },
            { label: 'Business Unit(s) Dependent', value: 'businessUnit' },
            { label: 'Government / Regulatory Mandate', value: 'government' },
            { label: 'Authoratative Source(s)', value: 'authoratative' },
            { label: 'Related Business Service(s)', value: 'relatedBusinessService' },
            { label: 'Process Priority (Critcality)', value: 'processPriority' },
            { label: 'Confidentiality', value: 'confidentiality' },
            { label: 'Intergrity', value: 'intergrity' },
            { label: 'Availibility', value: 'availibility' },
            { label: 'Others', value: 'others' },
            { label: 'Review Period (BIA)', value: 'reviewPeriod' }
        ];
       
    }
    handleData(e) {
        alert(this.selectedCars1);
        debugger
        //if (e.itemValue = 'processActivity') {
        //    this.processActivity = true;
        //}
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
    validateForm() {
        this.showMultiselectRequiredMessage = (this.businessService.length === 0) ? true : false;
    }
}
