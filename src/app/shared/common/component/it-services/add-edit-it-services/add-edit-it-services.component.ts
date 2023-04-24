import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ITServiceServiceProxy, BusinessUnitPrimaryDto, BusinessServiceSDto, BusinessServiceOwner, ITserviceDto, GetOrganizationDto, CountryDto, GetDynamicValueDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'add-edit-it-services',
    templateUrl: './add-edit-it-services.component.html',
    styleUrls: ['./add-edit-it-services.component.scss']
})
export class AddEditItServicesComponent extends AppComponentBase {
    active = false;
    text: any;
    recordId: any;
    isEdit: boolean;
    oraganizationId: any;

    itService: ITserviceDto = new ITserviceDto();

    organization: GetOrganizationDto[] = [];
    selectedOrganization: GetOrganizationDto = new GetOrganizationDto();

    ProcessType: GetDynamicValueDto[] = [];
    selectedProcessType: GetDynamicValueDto = new GetDynamicValueDto();

    classification: GetDynamicValueDto[] = [];
    selectedclassification: GetDynamicValueDto = new GetDynamicValueDto();

    Country: CountryDto[] = [];
    selectedCountry: CountryDto = new CountryDto();

    ITServiceOwner: BusinessServiceOwner[] = [];
    selectedITServiceOwner: BusinessServiceOwner = new BusinessServiceOwner();

    ITServiceManager: BusinessServiceOwner[] = [];
    selectedITServiceManager: BusinessServiceOwner = new BusinessServiceOwner();

    businessUnit: BusinessUnitPrimaryDto[] = [];
    selectedBusinessprocess: BusinessUnitPrimaryDto = new BusinessUnitPrimaryDto();

    businessUnitsDependent: BusinessUnitPrimaryDto[] = [];
    selectedbusinessUnitsDependent: BusinessUnitPrimaryDto[] = [];

    businessServices: BusinessServiceSDto[] = [];
    selectedbusinessServices: BusinessServiceSDto[] = [];

    regulatory: GetDynamicValueDto[] = [];
    selectedRegulatory: GetDynamicValueDto = new GetDynamicValueDto();

    integrity: GetDynamicValueDto[] = [];
    selectedIntegrity: GetDynamicValueDto = new GetDynamicValueDto();

    Others: GetDynamicValueDto[] = [];
    selectedOthers: GetDynamicValueDto = new GetDynamicValueDto();

    Confidentiality: GetDynamicValueDto[] = [];
    selectedConfidentiality: GetDynamicValueDto = new GetDynamicValueDto();

    availibility: GetDynamicValueDto[] = [];
    selectedavailibility: GetDynamicValueDto = new GetDynamicValueDto();

    constructor(
        private _itserviceProxy: ITServiceServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _commonMultiDropdownService: MultiselectDropdownService,
        private _router: Router,
        injector: Injector,
     
    ) {
        super(injector);
    }

    ngOnInit()
    {
        this._activatedRoute.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );

        if (this.recordId) {

            this.isEdit = true;
            this.getITservice(this.recordId);


        } else {
            this.isEdit = false;
            this.getITservice(this.recordId);
        }

    }

    getITservice(recordId)
    {
            this._itserviceProxy.getITserviceInfo(recordId).subscribe(result => {
            this.itService = result;
            this.organization = result.companyLists;
            this.businessServices = result.businessServices;
            this.businessUnit = result.businessUnits;
            this.businessUnitsDependent = result.businessUnits;
            this.ProcessType = result.serviceTypes;
            this.Country = result.countries;
            this.integrity = result.integritys;
            this.ITServiceOwner = result.itServiceOwners;
            this.ITServiceManager = result.itServiceManagers;
            this.Others = result.otheres;
            this.regulatory = result.regulatoryMandates;
            this.classification = result.serviceClassifications;
            this.Confidentiality = result.confidentialitys;
            this.availibility = result.availibilitys;

            this.itService.selectedITserviceBusinessServices = this.itService.selectedITserviceBusinessServices == undefined ? [] : this.itService.selectedITserviceBusinessServices;
            this.itService.selectedITserviceBusinessUnit = this.itService.selectedITserviceBusinessUnit == undefined ? [] : this.itService.selectedITserviceBusinessUnit;
            this.itService.removeITserviceBusinessServices = [];
            this.itService.removeITserviceBusinessUnit = [];
     
            if (this.isEdit) {
                this.editOranization();
                this.editProcessType();
                this.editClassification();
                this.editCountry();
                this.editserviceOwner();
                this.editBusinessUnitOwner();
                this.editItserviceManager();
                this.editBusinessunitDependent();
                this.editBusinessService();
                this.editRegulatory();
                this.editConfidentiality();
                this.editIntegrity();
                this.editOther();
                this.editavailibility();
            }
        })
    }

    editOranization() {
        this.selectedOrganization = null;
        this.organization.forEach(obj => {
            if (obj.id == this.itService.lockThreatOrganizationId) {
                this.selectedOrganization = obj;
            }
        })
    }

    editProcessType() {
        this.selectedProcessType = null;
        this.ProcessType.forEach(obj => {
            if (obj.id == this.itService.serviceTypeId) {
                this.selectedProcessType = obj;
            }
        })
    }

    editClassification() {
        this.selectedclassification = null;
        this.classification.forEach(obj => {
            if (obj.id == this.itService.serviceClassificationId) {
                this.selectedclassification = obj;
            }
        })
    }

    editCountry() {
        this.selectedCountry = null;
        this.Country.forEach(obj => {
            if (obj.id == this.itService.countryId) {
                this.selectedCountry = obj;
            }
        })
    }

    editserviceOwner() {
        this.selectedITServiceOwner = null;
        this.ITServiceOwner.forEach(obj => {
            if (obj.id == this.itService.itServiceOwnerId) {
                this.selectedITServiceOwner = obj;
            }
        })
    }

    editBusinessUnitOwner() {
        this.selectedBusinessprocess = null;
        this.businessUnit.forEach(obj => {
            if (obj.id == this.itService.businessUnitId) {
                this.selectedBusinessprocess = obj;
            }
        })
        
    }

    editItserviceManager() {
        this.selectedITServiceManager = null;
        this.ITServiceManager.forEach(obj => {
            if (obj.id == this.itService.itServiceManagerId) {
                this.selectedITServiceManager = obj;
            }
        })
    }

    editBusinessunitDependent()
    {
        this.selectedbusinessUnitsDependent = [];
        this.itService.selectedITserviceBusinessUnit.forEach(obj => {
            this.businessUnitsDependent.forEach(team => {
                if (obj.businessUnitId == team.id) {
                    var temp = new BusinessUnitPrimaryDto();
                    temp.id = team.id;
                    temp.lockThreatOrganizationId = team.lockThreatOrganizationId;
                    temp.businessUnitTitle = team.businessUnitTitle;
                    this.selectedbusinessUnitsDependent.push(temp);
                }
            });
        });
    }

    editBusinessService() {
        this.selectedbusinessServices = [];
        this.itService.selectedITserviceBusinessServices.forEach(obj => {
            this.businessServices.forEach(team => {
                if (obj.businessServiceId == team.id) {
                    var temp = new BusinessServiceSDto();
                    temp.id = team.id;
                    temp.businessServiceName = team.businessServiceName;
                    this.selectedbusinessServices.push(temp);
                }
            });
        });
    }

    editRegulatory() {
        this.selectedRegulatory = null;
        this.regulatory.forEach(obj => {
            if (obj.id == this.itService.regulatoryMandateId) {
                this.selectedRegulatory = obj;
            }
        })
    }

    editConfidentiality()
    {
        this.selectedConfidentiality = null;
        this.Confidentiality.forEach(obj => {
            if (obj.id == this.itService.confidentialityId) {
                this.selectedConfidentiality = obj;
            }
        })
    }

    editIntegrity() {
        this.selectedIntegrity = null;
        this.integrity.forEach(obj => {
            if (obj.id == this.itService.integrityId) {
                this.selectedIntegrity = obj;
            }
        })
    }

    editOther() {
        this.selectedOthers = null;
        this.Others.forEach(obj => {
            if (obj.id == this.itService.othersId) {
                this.selectedOthers = obj;
            }
        })
    }

    editavailibility()
    {
        
        this.selectedavailibility = null;
        this.availibility.forEach(obj => {            
            if (obj.id == this.itService.availibilityId)
            {
                this.selectedavailibility = obj;
            }
        })
    }

    processTypeChange(event) {
        this.itService.serviceTypeId = event.value.id;
    }

    classificationChange(event) {
        this.itService.serviceClassificationId = event.value.id;

    }

    CountryChange(event) {
        this.itService.countryId = event.value.id;
    }

    organizationChange(event) {
        this.itService.lockThreatOrganizationId = event.value.id;
    }

    ITServiceOwnerChange(event) {
        this.itService.itServiceOwnerId = event.value.id;
    }

    businessUnitOwnerChange(event) {
        this.itService.businessUnitId = event.value.id;
    }

    ITServiceManagerChange(event) {
        this.itService.itServiceManagerId = event.value.id;
    }

    businessUnitChange(event) {
        
        this._commonMultiDropdownService.filterForITserviceMultipleSelect(this.itService.selectedITserviceBusinessUnit,
            this.selectedbusinessUnitsDependent, this.itService.removeITserviceBusinessUnit, "BusinessUnit", this.isEdit).then((result: any) => {
                this.itService.selectedITserviceBusinessUnit = result.selectedItems;
                this.selectedbusinessUnitsDependent = result.dropDownItems;
                this.itService.removeITserviceBusinessUnit = result.removedItems;
            }).catch(exception => {

            });
    }

    businessServicesChange(event) {
        debugger
        this._commonMultiDropdownService.filterForITserviceMultipleSelect(this.itService.selectedITserviceBusinessServices,
            this.selectedbusinessServices, this.itService.removeITserviceBusinessServices, "BusinessService", this.isEdit).then((result: any) => {
                debugger
                this.itService.selectedITserviceBusinessServices = result.selectedItems;
                this.selectedbusinessServices = result.dropDownItems;
                this.itService.removeITserviceBusinessServices = result.removedItems;
            }).catch(exception => {

            });
    }

    regulatoryChange(event) {
        this.itService.regulatoryMandateId = event.value.id;
    }

    ConfidentialityChange(event) {
        this.itService.confidentialityId = event.value.id;
    }

    integrityChange(event) {
        this.itService.integrityId = event.value.id;
    }

    OthersChange(event) {
        this.itService.othersId = event.value.id;
    }

    availibilityChange(event) {
        this.itService.availibilityId = event.value.id;
    }

    saveEditITService()
    {
        this._itserviceProxy.createOrUpdateITservice(this.itService).subscribe(res => {
            if (this.isEdit)
            {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            }
            else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }       
            this._router.navigate(['/app/main/it-services']);
        });
    }

}
