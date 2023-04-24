import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';
import { BulkEditHardwareAssetsModalComponent } from './bulk-edit-hardware-assets/bulk-edit-hardware-assets-modal.component';


@Component({
    selector: 'hardware-assets',
    templateUrl: './hardware-assets.component.html',
    styleUrls: ['./hardware-assets.component.scss']
})
export class HardwareAssetsComponent extends AppComponentBase implements OnInit {
    businessServicesDetail: Array<any> = [];
    @ViewChild('bulkEditHardwareAssetsModals', { static: true }) bulkEditHardwareAssetsModals: BulkEditHardwareAssetsModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    bulkedit: any=false;
    title = 'Asset Management';
    subTitle = '';
    pageTitle = '';


    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.bulkedit = false;
    }

    getBulkEdit(e) {
        this.bulkedit = e;
    }
    addNewProcess() {
        this._router.navigate(['/app/main/add-edit-hardware-assets']);
    }
}
