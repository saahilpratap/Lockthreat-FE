import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'bulkEditHardwareAssetsModals',
    templateUrl: './bulk-edit-hardware-assets-modal.component.html',
    styleUrls: ['./bulk-edit-hardware-assets-modal.component.scss']
})
export class BulkEditHardwareAssetsModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('bulkEditHardwareAssetsModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    test = false;
    bulkEditHardwareAssets: any;
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }
    
    ngOnInit() {
        this.bulkEditHardwareAssets = [
            { label: 'Hardware Asset Name', value: 'hardwareAssetName' },
            { label: 'Asset Hardware ID', value: 'assetHardwareID' },
            { label: 'Description', value: 'description' },
            { label: 'Location', value: 'location' },
            { label: 'Company (Owner)', value: 'companyOwner' },
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
