import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { BusinessServicesServiceProxy, ServiceBusinessUnitDto, BusinessUnitPrimaryDto, BusinessServiceOwner, ITserviceListDto, BusinessServiceDto, ITServiceServiceProxy,GetOrganizationDto, GetDynamicValueDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';

@Component({
    selector: 'add-edit-business-services',
    templateUrl: './add-edit-business-services.component.html',
    styleUrls: ['./add-edit-business-services.component.scss']
})
export class AddEditBusinessServicesComponent extends AppComponentBase implements OnInit {

    text: any;
    editView: any;
    iTServices: boolean;
    facilitiesDatacenters: boolean;
    systemsApplications: boolean;
    informationAssets: boolean;
    vendors: boolean;
    contracts: boolean;
    relatedProcess: boolean;

    businessService: BusinessServiceDto = new BusinessServiceDto();
    confidentiality: GetDynamicValueDto[];

    selectedConfidentiality: GetDynamicValueDto = new GetDynamicValueDto();
    intergrity: GetDynamicValueDto[];

    selectedIntegrity: GetDynamicValueDto = new GetDynamicValueDto();
    availibility: GetDynamicValueDto[];

    selectAvailibility: GetDynamicValueDto = new GetDynamicValueDto();
    serviceType: GetDynamicValueDto[] = [];

    selectedServiceType: GetDynamicValueDto = new GetDynamicValueDto();
    others: GetDynamicValueDto[];

    selectedOthers: GetDynamicValueDto = new GetDynamicValueDto();

    company: GetOrganizationDto[] = [];
    selectedCompany: GetOrganizationDto = new GetOrganizationDto();


    itService: ITserviceListDto[] = [];
    selectedITservice: ITserviceListDto[] = [];


    businessUnitPrimary: BusinessUnitPrimaryDto[] = [];
    selectedBusinessUnitPrimary: BusinessUnitPrimaryDto = new BusinessUnitPrimaryDto();

    businessUnitDependent: BusinessUnitPrimaryDto[] = [];
    selectdbusinessUnitDependent: BusinessUnitPrimaryDto[] = [];

    businessServiceOwners: BusinessServiceOwner[] = [];
    selectedBusinessServiceOwner: BusinessServiceOwner = new BusinessServiceOwner();

    businessServiceManager: BusinessServiceOwner[] = [];
    selectedbusinessServiceManager: BusinessServiceOwner = new BusinessServiceOwner();
    
    recordId: any;
    isEdit: boolean;   
    oraganizationId: any;
   
    constructor(
        injector: Injector,
        
        private _businessServiceProxy: BusinessServicesServiceProxy,        
        private _activatedRoute: ActivatedRoute,
        private _itserviceProxy: ITServiceServiceProxy,
        private _commonMultiDropdownService: MultiselectDropdownService,
        private _router: Router
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
            this.getAllBusinessService(this.recordId);


        } else {
            this.isEdit = false;
            this.getAllBusinessService(this.recordId);
        }
       
    }

    getAllBusinessService(serviceId) 
    {
            this._businessServiceProxy.getBusinessSerivceInfo(serviceId).subscribe(result => {            
            this.businessService = result;            
            this.businessService.selectdBusinessUnits = this.businessService.selectdBusinessUnits == undefined ? [] : this.businessService.selectdBusinessUnits;
            this.businessService.selectedItServices = this.businessService.selectedItServices == undefined ? [] : this.businessService.selectedItServices;
            this.businessServiceOwners = result.businessServiceOwners;
            this.businessServiceManager = result.businessServiceOwners;
            this.businessUnitDependent = result.businessUnits;
            this.availibility = result.availibilitys;
            this.intergrity = result.intergritys;
            this.others = result.otheres;
            this.serviceType = result.serviceTypes;
            this.businessUnitPrimary = result.businessUnits;
            this.itService = result.iTserviceLists;
            this.company = result.companyLists;
            this.confidentiality = result.confidentialitys;
            this.intergrity = result.intergritys;

            this.businessService.removedBusinessUnits = [];
            this.businessService.removedItServices = [];
            if (this.isEdit) {
                this.eidtOraganization();
                this.editBusinessUnit();
                this.editBusinessUnitPrimary();
                this.editServiceType();
                this.editIntegrity();
                this.editConfidentiality();
                this.editOthers();
                this.editServiceOwner();
                this.editAvaillibility();
                this.editServiceManager();
                this.editItservice();
            }
        })
    }

    editServiceOwner() {
       this.selectedBusinessServiceOwner = null;
        this.businessServiceOwners.forEach(obj => {
            if (obj.id == this.businessService.businessServiceOwnerId) {
                this.selectedBusinessServiceOwner = obj;
            }
        })
    }

    editAvaillibility() {
        this.availibility.forEach(obj => {
            if (obj.id == this.businessService.availibilityId) {
                this.selectAvailibility = obj;
            }
        })
    }

    editServiceManager()
    {
        this.selectedbusinessServiceManager = null;
        this.businessServiceManager.forEach(obj => {
            if (obj.id == this.businessService.businessServiceManagerId) {
                this.selectedbusinessServiceManager = obj;
            }
        }) 
    }

    editIntegrity()
    {
        this.selectedIntegrity = null;
        this.intergrity.forEach(obj => {
            if (obj.id == this.businessService.intergrityId) {
                this.selectedIntegrity = obj;
            }
        })
    }

    editConfidentiality()
    {
        this.selectedConfidentiality = null;
        this.confidentiality.forEach(obj => {
            if (obj.id == this.businessService.confidentialityId) {
                this.selectedConfidentiality = obj;
            }
        })
    }

    editOthers() {

        this.selectedOthers = null;
        this.others.forEach(obj => {
            if (obj.id == this.businessService.othersId) {
                this.selectedOthers = obj;
            }
        })
    }

    editServiceType()
    {
        this.selectedServiceType = null;
        this.serviceType.forEach(obj =>
        {
            if (obj.id == this.businessService.serviceTypeId) {
                this.selectedServiceType = obj;
            }
        })
    }

    eidtOraganization() {
        this.selectedCompany = null;
        this.company.forEach(obj => {
            if (obj.id == this.businessService.lockThreatOrganizationId) {
                this.selectedCompany = obj;
            }
            
        })
    }

    editBusinessUnit()
    {        
            this.selectdbusinessUnitDependent = [];
            this.businessService.selectdBusinessUnits.forEach(obj => {
            this.businessUnitDependent.forEach(team => {
                if (obj.businessUnitId == team.id)
                {                    
                    var temp = new BusinessUnitPrimaryDto();
                    temp.id = team.id;
                    temp.lockThreatOrganizationId = team.lockThreatOrganizationId;
                    temp.businessUnitTitle = team.businessUnitTitle;
                    this.selectdbusinessUnitDependent.push(temp);
                }
            });
        });
    }

    editItservice() {
        
        this.selectedITservice = [];
        this.businessService.selectedItServices.forEach(obj => {
            this.itService.forEach(team => {
                if (obj.itServiceId == team.id) {
                    var temp = new ITserviceListDto();
                    temp.id = team.id;
                    temp.itServicesId = team.itServicesId;
                    temp.itServiceName = team.itServiceName;
                    this.selectedITservice.push(temp);
                }
            });
        });
    }

    editBusinessUnitPrimary() {
        this.businessUnitPrimary.forEach(obj => {
            if (obj.id == this.businessService.businessUnitprimaryId) {
                this.selectedBusinessUnitPrimary = obj;
            }
        })    
    }
    
    onChangeCompany(event) {
        
        this.businessService.lockThreatOrganizationId = event.value.id;
    }

    servicetypeChnage(event)
    {        
        this.businessService.serviceTypeId = event.value.id;
    }

    selectedbusinessUnitDependentChange(event)
    {
        debugger
        this._commonMultiDropdownService.filterBusinessServiceMultipleSelect(this.businessService.selectdBusinessUnits,
            this.selectdbusinessUnitDependent, this.businessService.removedBusinessUnits, "BusinessUnit", this.isEdit).then((result: any) =>
            {
                debugger
                this.businessService.selectdBusinessUnits = result.selectedItems;
                this.selectdbusinessUnitDependent = result.dropDownItems;
                this.businessService.removedBusinessUnits = result.removedItems;
            }).catch(exception => {

            });
    }

    businessunitChange(event) {
        
        this.businessService.businessUnitprimaryId = event.value.id;
    }

    businessserviceownerChange(event) {
        
        this.businessService.businessServiceOwnerId = event.value.id;
    }

    businessservicemanagerChange(event) {
        
        this.businessService.businessServiceManagerId = event.value.id;
    }

    selectedITserviceChange(event)
    {
        
        this._commonMultiDropdownService.filterBusinessServiceMultipleSelect(this.businessService.selectedItServices,
            this.selectedITservice, this.businessService.removedItServices, "ITservice", this.isEdit).then((result: any) => {
                this.businessService.selectedItServices = result.selectedItems;
                this.selectedITservice = result.dropDownItems;
                this.businessService.removedItServices = result.removedItems;
            }).catch(exception => {

            });
    }

    confidilityChange(event) {
        
        this.businessService.confidentialityId = event.value.id;
    }

    integrityChange(event) {
        
        this.businessService.intergrityId = event.value.id;
    }

    availibilityChange(event) {
        
        this.businessService.availibilityId = event.value.id;
    }

    otherChange(event) {
        this.businessService.othersId = event.value.id;
    }

    saveBusinessService()
    {
        
        this._businessServiceProxy.createOrUpdateBusinessServices(this.businessService).subscribe(res => {           
                abp.notify.success(this.l('SavedSuccessfully'));          
            this._router.navigate(['/app/main/business-services']);
        });
      
    }    
   
}
