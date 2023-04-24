import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'businessUnitsModals',
    templateUrl: './business-units-modal.component.html',
    styleUrls: ['./business-units-modal.component.scss']
})
export class BusinessUnitsModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('businessUnitsModals', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
      
    }    
    
    show(id:number): void {
        debugger
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
