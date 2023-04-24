import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, OrganizationUnitDto, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'add-edit-risk-management',
    templateUrl: './add-edit-risk-management.component.html',
    styleUrls: ['./add-edit-risk-management.component.scss']
})
export class AddEditRiskManagementComponent extends AppComponentBase {

    text: any;
    creationDateRange: Date;
    constructor(
        injector: Injector,       
    ) {
        super(injector);
    }
    saveRiskManagement() {

    }
}
