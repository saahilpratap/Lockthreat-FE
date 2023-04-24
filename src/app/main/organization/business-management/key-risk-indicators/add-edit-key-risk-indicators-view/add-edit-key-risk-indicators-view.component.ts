import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { KeyRiskIndicatorsServiceProxy, KeyRiskIndicatorDto, BusinessUnitPrimaryDto, GetOrganizationDto, GetDynamicValueDto } from '@shared/service-proxies/service-proxies';
import { MultiselectDropdownService } from 'app/shared/common/component/common-services/multiselect-dropdown-service.service';

@Component({
    selector: 'add-edit-key-risk-indicators-view',
    templateUrl: './add-edit-key-risk-indicators-view.component.html',
    styleUrls: ['./add-edit-key-risk-indicators-view.component.scss']
})
export class AddEditKeyRiskIndicatorsViewComponent extends AppComponentBase implements OnInit {
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = '';
    creationDateRange: Date;
    basicInfo: boolean;
    advanced: boolean;
    dayDropdown: boolean;

    keyRiskIndicator: KeyRiskIndicatorDto = new KeyRiskIndicatorDto();

    businessUnit: BusinessUnitPrimaryDto[] = [];
    selectedBusinessUnit: BusinessUnitPrimaryDto[] = [];

    organization: GetOrganizationDto[] = [];
    selectedOrganization: GetOrganizationDto = new GetOrganizationDto();

    status: GetDynamicValueDto[] = [];
    selectedStatus: GetDynamicValueDto = new GetDynamicValueDto();

    public upload: any[] = [{
            
    }];

    uploadedFiles: any[] = [];

    recordId: any;
    isEdit: boolean;

    constructor(_injector: Injector,
        private _keyRiskIndicatorServiceProxy: KeyRiskIndicatorsServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _commonMultiDropdownService: MultiselectDropdownService,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.basicInfo = true;
        this.dayDropdown = false;
        this._activatedRoute.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );
        
    }

   

    goBack() {
        this._router.navigate(['/app/main/key-risk-indicators']);
    }

}
