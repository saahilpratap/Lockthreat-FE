import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'bulkEditEmployeesModals',
    templateUrl: './bulk-edit-employees-modal.component.html',
    styleUrls: ['./bulk-edit-employees-modal.component.scss']
})
export class BulkEditEmployeesModalComponent extends AppComponentBase implements OnInit {
    businessService: SelectItem[];
    @ViewChild('bulkEditEmployeesModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    

    bulkEditEmployees: any;   

    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
        
     
       
    }

    ngOnInit() {

        this.bulkEditEmployees = [
            { label: '', value: '' },            
        ];
       
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
   
}
