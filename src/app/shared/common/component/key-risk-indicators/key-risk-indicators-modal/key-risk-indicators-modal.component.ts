import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'keyRiskIndicatorsModals',
    templateUrl: './key-risk-indicators-modal.component.html',
    styleUrls: ['./key-risk-indicators-modal.component.scss']
})
export class KeyRiskIndicatorsModalComponent extends AppComponentBase implements OnInit {

    @ViewChild('keyRiskIndicatorsModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
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
