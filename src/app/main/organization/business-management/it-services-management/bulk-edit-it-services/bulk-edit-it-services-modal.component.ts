import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';
import { SelectItem } from 'primeng/api';
import { DataService } from '../../../../../shared/common/services/DataService';

@Component({
    selector: 'bulkEditItServicesModals',
    templateUrl: './bulk-edit-it-services-modal.component.html',
    styleUrls: ['./bulk-edit-it-services-modal.component.scss']
})
export class BulkEditItServicesModalComponent extends AppComponentBase implements OnInit {
    businessService: SelectItem[];
    @ViewChild('bulkEditItServicesModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    showMultiselectRequiredMessage = false;
   
    bulkEditItServices = [
        { label: 'IT Service Name', value: 'iTServiceName' },
        { label: 'Service Type', value: 'serviceType' },
        { label: 'Service Classification', value: 'serviceClassification' },
        { label: 'Address', value: 'address' },
        { label: 'Company Name', value: 'companyName' },
        { label: 'Business Unit(Owner)', value: 'businessUnitOwner' },
        { label: 'Business Units(Dependent)', value: 'businessUnitsDependent' },
        { label: 'IT Service Owner', value: 'iTServiceOwner' },
        { label: 'IT Service Manager', value: 'iTServiceManager' },
        { label: 'Business Services(Dependent) ', value: 'businessServicesDependent' },
        { label: 'Government / Regulatory Mandate ', value: 'governmentRegulatoryMandate ' },
        { label: 'Confidentiality', value: 'confidentiality' },
        { label: 'Others', value: 'others' },
        { label: 'Integrity', value: 'integrity' }
    ];



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
    validateForm() {
        this.showMultiselectRequiredMessage = (this.businessService.length === 0) ? true : false;
    }
}
