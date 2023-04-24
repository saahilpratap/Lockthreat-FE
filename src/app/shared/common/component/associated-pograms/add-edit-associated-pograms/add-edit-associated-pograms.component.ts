import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, OrganizationUnitDto, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';

@Component({
    selector: 'add-edit-associated-pograms',
    templateUrl: './add-edit-associated-pograms.component.html',
    styleUrls: ['./add-edit-associated-pograms.component.scss']
})
export class AddEditAssociatedPogramsComponent extends AppComponentBase {

   
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    
    active = false;
    text: any;

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private _profileService: ProfileServiceProxy
    ) {
        super(injector);
    }

    

   
}
