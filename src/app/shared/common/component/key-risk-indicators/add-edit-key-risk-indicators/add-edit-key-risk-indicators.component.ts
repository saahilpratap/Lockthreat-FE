import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, BusinessUnitKeyRiskDto, OrganizationUnitDto, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy, KeyRiskIndicatorsServiceProxy, KeyRiskIndicatorDto, BusinessUnitPrimaryDto, GetDynamicValueDto, GetOrganizationDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';

@Component({
    selector: 'add-edit-key-risk-indicators',
    templateUrl: './add-edit-key-risk-indicators.component.html',
    styleUrls: ['./add-edit-key-risk-indicators.component.scss']
})
export class AddEditKeyRiskIndicatorsComponent extends AppComponentBase {
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
    text: any;

    constructor(
        injector: Injector,
        private _keyRiskIndicatorServiceProxy: KeyRiskIndicatorsServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _commonMultiDropdownService: MultiselectDropdownService,
        private _router: Router,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.basicInfo = true;
        this.dayDropdown = false;
        this._activatedRoute.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );
        if (this.recordId) {
            this.isEdit = true;
            this.getKeyRiskIndicator(this.recordId);
        } else {
            this.isEdit = false;
            this.getKeyRiskIndicator(this.recordId);
        }
    }

    oragnizationChange(event) {
        if (event.value.id != 0) {
            this.keyRiskIndicator.lockThreatOrganizationId = event.value.id;
            this.businessUnit = [];
            this.keyRiskIndicator.businessUnits.forEach(obj => {
                if (obj.lockThreatOrganizationId == this.keyRiskIndicator.lockThreatOrganizationId) {
                    this.businessUnit.push(obj);
                }
            });
        }
    }

    editOrganization() {
        this.selectedOrganization = null;
        this.organization.forEach(obj => {
            if (obj.id == this.keyRiskIndicator.lockThreatOrganizationId) {
                this.selectedOrganization = obj;
            }
        })
    }

    statusChange(event) {
        this.keyRiskIndicator.statusId = event.value.id;
    }

    selectedBusinessUnits() {
       
        this.keyRiskIndicator.selectdBusinessUnits = [];
        this.selectedBusinessUnit.forEach(obj => {
            var item = new BusinessUnitKeyRiskDto();
            item.id = 0;
            item.keyRiskIndicatorId = 0;
            item.businessUnitId = obj.id;
            this.keyRiskIndicator.selectdBusinessUnits.push(item);
        })
    }

    getKeyRiskIndicator(keyriskid) {

        this._keyRiskIndicatorServiceProxy.getKeyRiskIndicatorInfo(keyriskid).subscribe(result => {
            this.keyRiskIndicator = result;
            this.businessUnit = result.businessUnits;
            this.organization = result.companyLists;
            this.status = result.statuses;
            this.keyRiskIndicator.selectdBusinessUnits = this.keyRiskIndicator.selectdBusinessUnits == undefined ? [] : this.keyRiskIndicator.selectdBusinessUnits;
            this.keyRiskIndicator.removeBusinessUnit = [];
            this.editOrganization();
            this.geteditStatus();
            this.getbusinessuintEdit();
            
        })

    }

    getbusinessuintEdit() {

        this.selectedBusinessUnit = [];
        this.keyRiskIndicator.selectdBusinessUnits.forEach(obj => {
            this.businessUnit.forEach(team => {
                if (obj.businessUnitId == team.id) {
                    var temp = new BusinessUnitPrimaryDto();
                    temp.id = team.id;
                    temp.lockThreatOrganizationId = team.lockThreatOrganizationId;
                    temp.businessUnitTitle = team.businessUnitTitle;
                    this.selectedBusinessUnit.push(temp);
                }
            });
        });
    }

    geteditStatus() {
        this.status.forEach(obj => {
            this.selectedStatus = null;
            this.status.forEach(obj => {
                if (obj.id == this.keyRiskIndicator.statusId) {
                    this.selectedStatus = obj;
                }
            })
        })
    }
    
    saveKeyriskIndicator()
    {
        this.selectedBusinessUnits();
        this._keyRiskIndicatorServiceProxy.createorUpdateKeyRiskIndicator(this.keyRiskIndicator).subscribe(result => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/key-risk-indicators']);
        })
    }

    goBack() {
        this._router.navigate(['/app/main/key-risk-indicators']);
    }
   
}
