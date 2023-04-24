import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SystemApplicationServiceProxy, GetDynamicValueDto, CountryDto, SystemApplicationDto, BusinessServiceSDto, BusinessProcessDetailDto, ITserviceListDto, BusinessServiceOwner, BusinessUnitPrimaryDto, GetOrganizationDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'add-systems-applications',
    templateUrl: './add-systems-applications.component.html',
    styleUrls: ['./add-systems-applications.component.scss'] 
})
export class AddSystemsApplicationsComponent extends AppComponentBase {

    text: any;

    availibility: GetDynamicValueDto[] = [];
    selectedAvailibility: GetDynamicValueDto = new GetDynamicValueDto();

    integrity: GetDynamicValueDto[] = [];
    selectedintegrity: GetDynamicValueDto = new GetDynamicValueDto();

    others: GetDynamicValueDto[] = [];
    selectedothers: GetDynamicValueDto = new GetDynamicValueDto();

    Confidentiality: GetDynamicValueDto[] = [];
    selectedConfidentiality: GetDynamicValueDto = new GetDynamicValueDto();

    organization: GetOrganizationDto[] = [];
    selectedOrganization: GetOrganizationDto = new GetOrganizationDto();

    businessUnitOwner: BusinessUnitPrimaryDto[] = [];
    selectedbusinessUnitOwner: BusinessUnitPrimaryDto = new BusinessUnitPrimaryDto();

    businessUnitGaurdian: BusinessUnitPrimaryDto[] = [];
    selectedbusinessUnitGaurdian: BusinessUnitPrimaryDto = new BusinessUnitPrimaryDto();

    businessProcess: BusinessProcessDetailDto[] = [];
    selectedbusinessProcess: BusinessProcessDetailDto[] = [];

    businessService: BusinessServiceSDto[] = [];
    selectedBusinessService: BusinessServiceSDto[] = [];

    itservice: ITserviceListDto[] = [];
    selectedItservice: ITserviceListDto[] = [];

    country: CountryDto[] = [];
    selectedCountry: CountryDto = new CountryDto();

    assetOwner: BusinessServiceOwner[] = [];
    selectedAssetOwner: BusinessServiceOwner = new BusinessServiceOwner();

    systeamApplication: SystemApplicationDto = new SystemApplicationDto();
    recordId: any;
    isEdit: boolean;
    oraganizationId: any;
    constructor(
        injector: Injector,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _systeamApplicationServiceProxy: SystemApplicationServiceProxy,
        private _commonMultiDropdownService: MultiselectDropdownService,
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
            this.getAllSysteamApplication(this.recordId);
        }
        else {
            this.isEdit = false;
            this.getAllSysteamApplication(this.recordId);
        }
    }

    getAllSysteamApplication(recordId)
    {
        this._systeamApplicationServiceProxy.getAllSystemApplication(recordId).subscribe(res => {
            this.systeamApplication = res;
            this.availibility = res.availibilitys;
            this.integrity = res.integritys;
            this.organization = res.companyLists;
            this.Confidentiality = res.confidentialitys;
            this.others = res.otheres;
           // this.businessUnitOwner = res.businessUnits;
            this.businessUnitGaurdian = res.businessUnitGaurdians;
            this.assetOwner = res.employeesList;
            this.itservice = res.iTserviceLists;
            this.businessProcess = res.businessProcess;
            this.businessService = res.businessServices;
            this.country = res.countries;
            this.systeamApplication.selectedSysteamApplicationBusinessProcess = this.systeamApplication.selectedSysteamApplicationBusinessProcess == undefined ? [] : this.systeamApplication.selectedSysteamApplicationBusinessProcess;
            this.systeamApplication.selectedSysteamApplicationITservices = this.systeamApplication.selectedSysteamApplicationITservices == undefined ? [] : this.systeamApplication.selectedSysteamApplicationITservices;
            this.systeamApplication.selectedSystemApplicationServices = this.systeamApplication.selectedSystemApplicationServices == undefined ? [] : this.systeamApplication.selectedSystemApplicationServices;
            this.systeamApplication.removedSysteamApplicationBusinessProcess = [];
            this.systeamApplication.removedSysteamApplicationITservice = [];
            this.systeamApplication.removedSystemApplicationService = [];

            if (this.isEdit)
            {
                this.pushBusinessOwner();
                this.editIntegrity();
                this.editavailibility();
                this.editConfidentiality();
                this.editothers();
                this.editOranization();
                this.editCountry();
                this.editBusinessUnitOwner();
                this.editBusinessUnitGaurdian();
                this.editBusinessITService();
                this.editBusinessservice();
                this.editBusinessProcess();
                this.editAssetOwner();
            }
        });
    }

    pushBusinessOwner() {
        this.businessUnitOwner = [];
        this.systeamApplication.businessUnits.forEach(obj => {
            if (obj.lockThreatOrganizationId == this.systeamApplication.lockThreatOrganizationId) {
                this.businessUnitOwner.push(obj);
            }
        })
    }

    countryChange(event) {
        this.systeamApplication.countryId = event.value.id;
    }

    confidentialityChange(event) {
        this.systeamApplication.confidentialityId = event.value.id;

    }

    availibilityChange(event) {
        this.systeamApplication.availibilityId = event.value.id;
    }

    integrityChange(event) {
        this.systeamApplication.integrityId = event.value.id;
    }

    othersChange(event)
    {
        this.systeamApplication.othersId = event.value.id;
    }

    oraganizationChange(event)
    {
        this.systeamApplication.lockThreatOrganizationId = event.value.id;
      
        this.businessUnitOwner = [];
        this.selectedbusinessUnitOwner = null;
        this.systeamApplication.businessUnitId = null;
        this.systeamApplication.businessUnits.forEach(obj => {
            if (obj.lockThreatOrganizationId == event.value.id) {
                this.businessUnitOwner.push(obj);
            }
        })
    }

    businessUnitOwnerChange(event)
    {
        this.systeamApplication.businessUnitId = event.value.id;
    }

    businessUnitGaurdianChange(event)
    {
        this.systeamApplication.businessUnitGaurdianId = event.value.id;
    }

    businessServiceChange(event) {
        this._commonMultiDropdownService.filterForSysteamApplicationMultipleSelect(this.systeamApplication.selectedSystemApplicationServices,
            this.selectedBusinessService, this.systeamApplication.removedSystemApplicationService, "SABusinessService", this.isEdit).then((result: any) => {
                this.systeamApplication.selectedSystemApplicationServices = result.selectedItems;
                this.selectedBusinessService = result.dropDownItems;
                this.systeamApplication.removedSystemApplicationService = result.removedItems;
            }).catch(exception => {

            });
    }

    businessProcessChange(event) {

        this._commonMultiDropdownService.filterForSysteamApplicationMultipleSelect(this.systeamApplication.selectedSysteamApplicationBusinessProcess,
            this.selectedbusinessProcess, this.systeamApplication.removedSysteamApplicationBusinessProcess, "SABusinessProcess", this.isEdit).then((result: any) => {
                this.systeamApplication.selectedSysteamApplicationBusinessProcess = result.selectedItems;
                this.selectedbusinessProcess = result.dropDownItems;
                this.systeamApplication.removedSysteamApplicationBusinessProcess = result.removedItems;
            }).catch(exception => {

            });
    }

    itserviceChange(event) {

        this._commonMultiDropdownService.filterForSysteamApplicationMultipleSelect(this.systeamApplication.selectedSysteamApplicationITservices,
            this.selectedItservice, this.systeamApplication.removedSysteamApplicationITservice, "SAITservice", this.isEdit).then((result: any) => {
                this.systeamApplication.selectedSysteamApplicationITservices = result.selectedItems;
                this.selectedItservice = result.dropDownItems;
                this.systeamApplication.removedSysteamApplicationITservice = result.removedItems;
            }).catch(exception => {

            });
    }

    editIntegrity() {
        this.selectedintegrity = null;
        this.integrity.forEach(obj => {
            if (obj.id == this.systeamApplication.integrityId) {
                this.selectedintegrity = obj;
            }
        })
    }

    editavailibility()
    {
        this.selectedAvailibility = null;
        this.availibility.forEach(obj => {
            if (obj.id == this.systeamApplication.availibilityId) {
                this.selectedAvailibility = obj;
            }
        })
    }

    editConfidentiality()
    {
        this.selectedConfidentiality = null;
        this.Confidentiality.forEach(obj => {
            if (obj.id == this.systeamApplication.confidentialityId) {
                this.selectedConfidentiality = obj;
            }
        })

    }

    editothers()
    {
        this.selectedothers = null;
        this.others.forEach(obj => {
            if (obj.id == this.systeamApplication.othersId) {
                this.selectedothers = obj;
            }
        })
    }
  
    editOranization()
    {
        this.selectedOrganization = null;
        this.organization.forEach(obj => {
            if (obj.id == this.systeamApplication.lockThreatOrganizationId) {
                this.selectedOrganization = obj;
            }
        })
    }

    editAssetOwner() {
        this.selectedAssetOwner = null;
        this.assetOwner.forEach(obj => {
            if (obj.id == this.systeamApplication.businessOwnerId) {
                this.selectedAssetOwner = obj;
            }
        })
    }

    editBusinessUnitOwner() {
        this.selectedbusinessUnitOwner = null;
        this.businessUnitOwner.forEach(obj => {
            if (obj.id == this.systeamApplication.businessUnitId) {
                this.selectedbusinessUnitOwner = obj;
            }
        })
    }

    assetOwnerChange(event)
    {
        this.systeamApplication.businessOwnerId = event.value.id;
    }


    editBusinessUnitGaurdian()
    {
        this.selectedbusinessUnitGaurdian = null;
        this.businessUnitGaurdian.forEach(obj => {
            if (obj.id == this.systeamApplication.businessUnitGaurdianId) {
                this.selectedbusinessUnitGaurdian = obj;
            }
        })
    }

    editBusinessITService() {
        debugger
        this.selectedItservice = [];
        this.systeamApplication.selectedSysteamApplicationITservices.forEach(obj => {
            this.itservice.forEach(team => {
                if (obj.itServiceId == team.id) {
                    var temp = new ITserviceListDto();
                    temp.id = team.id;
                    temp.itServicesId = team.itServicesId;
                    temp.itServiceName = team.itServiceName;
                    this.selectedItservice.push(temp);
                }
            });
        });
    }

    editBusinessProcess() {
        this.selectedbusinessProcess = [];
        this.systeamApplication.selectedSysteamApplicationBusinessProcess.forEach(obj => {
            this.businessProcess.forEach(team => {
                if (obj.businessProcessId == team.id) {
                    var temp = new BusinessProcessDetailDto();
                    temp.id = team.id;
                    temp.businessProcessName = team.businessProcessName;
                    this.selectedbusinessProcess.push(temp);
                }
            });
        });
    }

    editBusinessservice() {
        this.selectedBusinessService = [];
        this.systeamApplication.selectedSystemApplicationServices.forEach(obj => {
            this.businessService.forEach(team => {
                if (obj.businessServiceId == team.id) {
                    var temp = new BusinessServiceSDto();
                    temp.id = team.id;
                    temp.businessServiceName = team.businessServiceName;
                    this.selectedBusinessService.push(temp);
                }
            });
        });
    }

    editCountry() {
        this.selectedCountry = null;
        this.country.forEach(obj => {
            if (obj.id == this.systeamApplication.countryId) {
                this.selectedCountry = obj;
            }
        })
    }

    save() {
        this._systeamApplicationServiceProxy.createOrUpdateSystemApplication(this.systeamApplication).subscribe(res => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            }
            else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/systems-applications']);
        });
    }

}
