import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';
import { SelectItem } from 'primeng/api';
import * as $ from 'jquery';

@Component({
    selector: 'bulkEditFacilitiesDatacenterModals',
    templateUrl: './bulk-edit-facilities-datacenter-modal.component.html',
    styleUrls: ['./bulk-edit-facilities-datacenter-modal.component.scss']
})
export class BulkEditFacilitiesDatacenterModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('bulkEditFacilitiesDatacenterModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    test = false;
    cars: SelectItem[];
    selectedCar: SelectItem[] = [];
    facilitiesDatacenter: any;
    cities: any[];
    selectedCity: any;

    bulkEditFacilitiesDatacenter = [
    { label: 'Facility Type', value: 'facilityType' },
    { label: 'Facility Name', value: 'facilityName' },
    { label: 'Facility Location', value: 'facilityLocation' },
    { label: 'Company Name', value: 'companyName' },
    { label: 'Business Unit - Owner', value: 'businessUnitOwner' },
    { label: 'Business Unit - Gaurdian', value: 'businessUnitGaurdian' },
    { label: 'Business Services', value: 'businessServices' },
    { label: 'Business Process', value: 'businessProcess' },
    { label: 'IT Services', value: 'iTServices' },
    { label: 'Confidentiality', value: 'confidentiality' },
    { label: 'Availibility', value: 'cvailibility' },
    { label: 'Integrity', value: 'cntegrity' },
    { label: 'Others', value: 'cthers' }
];


    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);

        $('.ui-dropdown-clear-icon').on('click', () => {
            alert('Hi');
            //this.clearAction();
        });
    }

    ngOnInit() {
        

    }

    show(): void {
        this.active = true;
        this.modal.show();
    }
    insideOnBlurFunction(e) {
        
    }
   
    close(): void {
        this.active = false;
        this.modal.hide();
    }
    setEventTypeLabel(e) {
      
    }
    applyBulkEdit() {

    }
}
