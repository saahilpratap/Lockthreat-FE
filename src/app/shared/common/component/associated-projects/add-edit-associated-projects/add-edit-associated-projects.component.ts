import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';

@Component({
   
    selector: 'add-edit-associated-projects',
    templateUrl: './add-edit-associated-projects.component.html',
    styleUrls: ['./add-edit-associated-projects.component.scss']
})
export class AddEditAssociatedProjectComponent extends AppComponentBase {

    text: any;

    constructor(
        injector: Injector,
       
    ) {
        super(injector);
    }
}
