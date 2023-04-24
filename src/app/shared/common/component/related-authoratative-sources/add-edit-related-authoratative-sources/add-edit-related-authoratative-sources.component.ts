import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, OrganizationUnitDto, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { RelatedAuthoratativeSourcesModalComponent } from '../related-authoratative-sources-modal/related-authoratative-sources-modal.component';

@Component({
    selector: 'add-edit-related-authoratative-sources',
    templateUrl: './add-edit-related-authoratative-sources.component.html',
    styleUrls: ['./add-edit-related-authoratative-sources.component.scss']
})
export class AddEditRelatedAuthoratativeSourcesComponent extends AppComponentBase {

    text: any;
    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private _profileService: ProfileServiceProxy
    ) {
        super(injector);
    }   
}
