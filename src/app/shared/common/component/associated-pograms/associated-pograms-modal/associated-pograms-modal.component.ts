import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, OrganizationUnitDto, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'associatedPogramsModals',
    templateUrl: './associated-pograms-modal.component.html',
    styleUrls: ['./associated-pograms-modal.component.scss']
})
export class AssociatedPogramsModalComponent extends AppComponentBase {

    @ViewChild('associatedPogramsModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    
    

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private _profileService: ProfileServiceProxy
    ) {
        super(injector);
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
