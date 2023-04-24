import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Router } from '@angular/router';
import { BulkEditInformationAssetsModalComponent } from './bulk-edit-information-assets/bulk-edit-information-assets-modal.component';


@Component({
    selector: 'information-assets',
    templateUrl: './information-assets.component.html',
    styleUrls: ['./information-assets.component.scss']
})
export class InformationAssetsComponent extends AppComponentBase implements OnInit {
    businessServicesDetail: Array<any> = [];
    @ViewChild('bulkEditInformationAssetsModals', { static: true }) bulkEditInformationAssetsModals: BulkEditInformationAssetsModalComponent;
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
        this._router.navigate(['/app/main/add-edit-information-assets']);
    }
}
