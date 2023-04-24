import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'bulkEditInformationAssetsModals',
    templateUrl: './bulk-edit-information-assets-modal.component.html',
    styleUrls: ['./bulk-edit-information-assets-modal.component.scss']
})
export class BulkEditInformationAssetsModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('bulkEditInformationAssetsModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    test = false;
    bulkEditInformationAssets: any;
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }
    
    ngOnInit() {
        this.bulkEditInformationAssets = [
            { label: 'Asset Title', value: 'assetTitle' },
            { label: 'Asset Type', value: 'assetType' },
            { label: 'Asset Category', value: 'assetCategory' },
            { label: 'Asset Label', value: 'assetLabel' },
            { label: 'Asset Location', value: 'assetLocation' },
            { label: 'Organization Owner', value: 'organizationOwner' },
            { label: 'Asset Owner', value: 'assetOwner' },
            { label: 'Confidentiality', value: 'confidentiality' },
            { label: 'Integrity', value: 'integrity' },
            { label: 'Availibility', value: 'availibility' },
            { label: 'Other', value: 'other' }
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
