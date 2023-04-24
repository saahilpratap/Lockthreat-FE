import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'bulkEditKeyRiskIndicatorsModals',
    templateUrl: './bulk-edit-key-risk-indicators-modal.component.html',
    styleUrls: ['./bulk-edit-key-risk-indicators-modal.component.scss']
})
export class BulkEditKeyRiskIndicatorsModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('bulkEditKeyRiskIndicatorsModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    bulkEditKeyRiskIndicators = [
        { label: 'KRI - ID', value: 'kRIID' },
        { label: 'Key Risk Indicator Title', value: 'keyRiskIndicatorTitle' },
        { label: 'Status', value: 'status' },
        { label: 'Description', value: 'description' },
        { label: 'Company Name', value: 'companyName' },
        { label: 'Business Units', value: 'businessUnits' }
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
