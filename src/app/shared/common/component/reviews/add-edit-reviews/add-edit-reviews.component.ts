import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, OrganizationUnitDto, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'add-edit-reviews',
    templateUrl: './add-edit-reviews.component.html',
    styleUrls: ['./add-edit-reviews.component.scss']
})
export class AddEditReviewsComponent extends AppComponentBase {

    text: any;
    constructor(
        injector: Injector,       
    ) {
        super(injector);
    }
}
