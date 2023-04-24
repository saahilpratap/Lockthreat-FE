import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { RelatedAuthoratativeSourcesModalComponent } from '../related-authoratative-sources-modal/related-authoratative-sources-modal.component';


@Component({
    selector: 'grid-view-related-authoratative-sources',
    templateUrl: './grid-view-related-authoratative-sources.component.html',
    styleUrls: ['./grid-view-related-authoratative-sources.component.scss']
})
export class GridViewRelatedAuthoratativeSourcesComponent extends AppComponentBase implements OnInit {
    @ViewChild('relatedAuthoratativeSourcesModals', { static: true }) relatedAuthoratativeSourcesModals: RelatedAuthoratativeSourcesModalComponent;
    @Output() bulkEditEvent = new EventEmitter();
    selectedRowData: any[];
    businessServicesDetail: Array<any> = [];
    display: boolean;
    @Input('editOrgID') OrgId: any;
    @Input('showPopup') showPopupBtn: boolean;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
    }
    onSelectionChange(selection: any[]) {
        if (selection.length >= 2) {
            this.bulkEditEvent.emit(true);
        }
        else if (selection.length <= 1) {
            this.bulkEditEvent.emit(false);
        }
    }
    getAllBusinessServices(event?: LazyLoadEvent) {
        this.businessServicesDetail = [
            {
                authDocument: 'AAA',
                id: 'Auth1',
                parentCitation: 'Auth1',
                citationID: 'Auth1',               
                citationTitle: 'Auth1',
                citationType: 'Auth1',
                frameworkObjectives: 'Auth1',
                citationClass: 'Auth1',
                controlObjective: 'Auth1',
                customApplicability: 'Auth1',}
        ];
        this.primengTableHelper.totalRecordsCount = this.businessServicesDetail.length;
        this.primengTableHelper.records = this.businessServicesDetail;
    }
    addEditPage() {

    }
}
