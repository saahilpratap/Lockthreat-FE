import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';
import { SelectItem } from 'primeng/api';
import { DataService } from '../../../../../shared/common/services/DataService';

@Component({
    selector: 'bulkEditBusinessServicesModals',
    templateUrl: './bulk-edit-business-services-modal.component.html',
    styleUrls: ['./bulk-edit-business-services-modal.component.scss']
})
export class BulkEditBusinessServicesModalComponent extends AppComponentBase implements OnInit {
    businessService: SelectItem[];
    @ViewChild('bulkEditBusinessServicesModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    processActivity: boolean=true;
    bulkEditBusinessServices = [
        { label: 'Business Service ID', value: 'businessServiceID' },
        { label: 'Company Name', value: 'companyName' },
        { label: 'Business Service Name', value: 'businessServiceName' },
        { label: 'Service Type', value: 'serviceType' },
        { label: 'Business Unit(Primary)', value: 'businessUnitPrimary' },
        { label: 'Business Units(Dependent)', value: 'businessUnitsDependent' },
        { label: 'Business Service Owner', value: 'businessServiceOwner' },
        { label: 'Business Service Manager', value: 'businessServiceManager' },
        { label: 'Related IT Service', value: 'relatedITService' },
        { label: 'Confidentiality', value: 'confidentiality' },
        { label: 'Others', value: 'others' },
        { label: 'Intergrity', value: 'intergrity' },
        { label: 'Availibility', value: 'availibility' }
    ];

    selectedCars1: string[] = [];

    constructor(_injector: Injector,
        private _router: Router,
        private _dataService: DataService
    ) {
        super(_injector);
    }
    ngOnInit() {

    }
    handleData(e) {
       
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
