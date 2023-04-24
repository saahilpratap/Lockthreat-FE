import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'bulkEditSystemsApplicationsModals',
    templateUrl: './bulk-edit-systems-applications-modal.component.html',
    styleUrls: ['./bulk-edit-systems-applications-modal.component.scss']
})
export class BulkEditSystemsApplicationsModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('bulkEditSystemsApplicationsModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    test = false;
    bulkEditSystemsApplications: any;
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.bulkEditSystemsApplications = [
            { label: 'System (Application )Name', value: 'systemApplicationName' },
            { label: 'System Location', value: 'systemLocation' },
            { label: 'Company Name', value: 'companyName' },
            { label: 'Business Unit(Owner)', value: 'businessUnitOwner' },
            { label: 'Business Owner', value: 'businessOwner' },
            { label: 'Business Services', value: 'businessServices' },
            { label: 'IT Services', value: 'iTServices' },
            { label: 'Confidentiality', value: 'confidentiality' },
            { label: 'Integrity', value: 'integrity' },
            { label: 'Availibility', value: 'availibility' },
            { label: 'Others', value: 'others' }
        ];
    }
    
    show(): void {
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
    setEventTypeLabel(e) {
        debugger
        alert(e.itemValue)
    }
    applyBulkEdit() {

    }
}
