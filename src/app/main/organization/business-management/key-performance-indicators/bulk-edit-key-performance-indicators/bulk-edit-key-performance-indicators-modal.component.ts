import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'bulkEditKeyPerformanceIndicatorsModals',
    templateUrl: './bulk-edit-key-performance-indicators-modal.component.html',
    styleUrls: ['./bulk-edit-key-performance-indicators-modal.component.scss']
})
export class BulkEditKeyPerformanceIndicatorsModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('bulkEditKeyPerformanceIndicatorsModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }
    bulkEditKeyPerformanceIndicators = [
        { label: 'KPI ID', value: 'kPID' },
        { label: 'KPI Title', value: 'kPITitle' },
        { label: 'Status', value: 'status' },
        { label: 'Frequency(Measurement)', value: 'frequencyMeasurement' },
        { label: 'Description', value: 'description' },
        { label: 'Company Name', value: 'companyName' },
        { label: 'KPI Owner', value: 'kPIOwner' },
        { label: 'Business Units', value: 'businessUnits' },
        { label: 'KPI Administrators', value: 'kPIAdministrators' }
    ];
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
