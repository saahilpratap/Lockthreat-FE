import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'bulkEditVirtualAssetManagerModals',
    templateUrl: './bulk-edit-virtual-asset-manager-modal.component.html',
    styleUrls: ['./bulk-edit-virtual-asset-manager-modal.component.scss']
})
export class BulkEditVirtualAssetManagerModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('bulkEditVirtualAssetManagerModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    test = false;
    bulkEditVirtualAssetManager: any;
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }
    
    ngOnInit() {
        this.bulkEditVirtualAssetManager = [
            { label: 'Unit Type', value: 'unitType' },
            { label: 'Parent Organization', value: 'parentOrganization' },
            { label: 'Entity Head', value: 'entityHead' },
            { label: 'Parent Company Name', value: 'parentCompanyName' },
            { label: 'Auditable Entity', value: 'auditableEntity' },
            { label: 'Business Unit Title', value: 'businessUnitTitle' },
            { label: 'Parent Unit', value: 'parentUnit' }
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
        
    }
    applyBulkEdit() {

    }
}
