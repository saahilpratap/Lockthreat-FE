import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
    
import { AssetInformationAppserviceServiceProxy, GetDynamicValueDto, BusinessProcessDetailDto, ITserviceListDto, BusinessServiceSDto, BusinessUnitPrimaryDto, GetAssetInformationDto, CountryDto, BusinessServiceOwner, GetOrganizationDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';

@Component({
    selector: 'add-information-assets',
    templateUrl: './add-information-assets.component.html',
    styleUrls: ['./add-information-assets.component.scss']
})
export class AddInformationAssetsComponent extends AppComponentBase {

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

    assetType: GetDynamicValueDto[] = [];
    selectedAssetType: GetDynamicValueDto = new GetDynamicValueDto();

    assetCategory: GetDynamicValueDto[] = [];
    selectedAssetCategory: GetDynamicValueDto = new GetDynamicValueDto();

    assetLabel: GetDynamicValueDto[] = [];
    selectedAssetLabel: GetDynamicValueDto = new GetDynamicValueDto();

    assetOwner: BusinessServiceOwner[] = [];
    selectedAssetOwner: BusinessServiceOwner = new BusinessServiceOwner();

    country: CountryDto[] = [];
    selectedCountry: CountryDto = new CountryDto();

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


    assetInformation: GetAssetInformationDto = new GetAssetInformationDto();
    recordId: any;
    isEdit: boolean;
    oraganizationId: any;
    constructor(
        private _router: Router,
        private _commonMultiDropdownService: MultiselectDropdownService,
        private _activatedRoute: ActivatedRoute,
        private _assetInformationServiceProxy: AssetInformationAppserviceServiceProxy,
        injector: Injector,
       
    ) {
        super(injector);
    }

    ngOnInit() {
        this._activatedRoute.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );
        if (this.recordId) {
            this.isEdit = true;
            this.getAllAssetinformation(this.recordId);
        }
        else {
            this.isEdit = false;
            this.getAllAssetinformation(this.recordId);

        }
    }

    getAllAssetinformation(recordId)
    {
        this._assetInformationServiceProxy.getAllAssetInformationInfo(recordId).subscribe(res => {
                this.assetInformation = res;
                this.integrity = res.integritys;
                this.Confidentiality = res.confidentialitys;
                this.others = res.otheres;
                this.assetCategory = res.assetCategorys;
                this.assetLabel = res.assetLabels;
                this.assetOwner = res.employeesList;
                this.organization = res.companyLists;
                this.availibility = res.availibilitys;
                this.country = res.countries;
                this.assetType = res.assetTypes;              
                this.businessUnitGaurdian = res.businessUnitGaurdians;
                this.itservice = res.iTserviceLists;
                this.businessProcess = res.businessProcess;
                this.businessService = res.businessServices;
                this.assetInformation.selectedAssetInformationBusinessprocess = this.assetInformation.selectedAssetInformationBusinessprocess == undefined ? [] : this.assetInformation.selectedAssetInformationBusinessprocess;
                this.assetInformation.selectedAssetInformationBusinessServices = this.assetInformation.selectedAssetInformationBusinessServices == undefined ? [] : this.assetInformation.selectedAssetInformationBusinessServices;
                this.assetInformation.selectedAssetInformationITservices = this.assetInformation.selectedAssetInformationITservices == undefined ? [] : this.assetInformation.selectedAssetInformationITservices;
                this.assetInformation.removedAssetInformationBusinessprocess = [];
                this.assetInformation.removedAssetInformationBusinessService = [];
                this.assetInformation.removedAssetInformationITservice = [];
                if (this.isEdit)
                {
                    this.editAll();
                }
            })
    }

    editAll() {
        this.pushBusinessOwner();
        this.editIntegrity();
        this.editavailibility();
        this.editAssetCategory();
        this.editOranization();
        this.editothers();
        this.editAssetType();
        this.editassetLabel();
        this.editAssetOwner();
        this.editCountry();
        this.editConfidentiality();
        this.editBusinessUnitOwner();
        this.editBusinessUnitGaurdian();
        this.editBusinessITService();
        this.editBusinessservice();
        this.editBusinessProcess();
    }

    pushBusinessOwner() {
        this.businessUnitOwner = [];
        this.assetInformation.businessUnitOwners.forEach(obj => {
            if (obj.lockThreatOrganizationId == this.assetInformation.lockThreatOrganizationId) {
                this.businessUnitOwner.push(obj);
            }
        })
    }

    countryChange(event) {
        this.assetInformation.countryId = event.value.id;
    }

    confidentialityChange(event) {
        this.assetInformation.confidentialityId = event.value.id;

    }

    availibilityChange(event) {
        this.assetInformation.availibilityId = event.value.id;
    }

    integrityChange(event) {
        this.assetInformation.integrityId = event.value.id;
    }

    othersChange(event) {
        this.assetInformation.otherId = event.value.id;
    }

    assetTypeChange(event) {
        this.assetInformation.assetTypeId = event.value.id;
    }

    assetOwnerChange(event) {
        this.assetInformation.employeeId = event.value.id;
    }

    assetCategoryChange(event) {
        this.assetInformation.assetCategoryId = event.value.id;
    }

    assetlabelChange(event) {
        this.assetInformation.assetLabelId = event.value.id;
    }

    oraganizationChange(event)
    {
        this.assetInformation.lockThreatOrganizationId = event.value.id;
        this.businessUnitOwner = [];
        this.selectedbusinessUnitOwner = null;
        this.assetInformation.businessUnitOwnerId = null;

        this.assetInformation.businessUnitOwners.forEach(obj => {
            if (obj.lockThreatOrganizationId == event.value.id) {
                this.businessUnitOwner.push(obj);
            }
        })
    }

    businessUnitOwnerChange(event) {
        this.assetInformation.businessUnitOwnerId = event.value.id;
    }

    businessUnitGaurdianChange(event) {
        this.assetInformation.businessUnitGaurdianId = event.value.id;
    }

    editBusinessUnitOwner() {
        this.selectedbusinessUnitOwner = null;
        this.businessUnitOwner.forEach(obj => {
            if (obj.id == this.assetInformation.businessUnitOwnerId) {
                this.selectedbusinessUnitOwner = obj;
            }
        })
    }

    editBusinessUnitGaurdian() {
        this.selectedbusinessUnitGaurdian = null;
        this.businessUnitGaurdian.forEach(obj => {
            if (obj.id == this.assetInformation.businessUnitGaurdianId) {
                this.selectedbusinessUnitGaurdian = obj;
            }
        })
    }

    editBusinessITService() {
        this.selectedItservice = [];
        this.assetInformation.selectedAssetInformationITservices.forEach(obj => {
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
        this.assetInformation.selectedAssetInformationBusinessprocess.forEach(obj => {
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
        this.assetInformation.selectedAssetInformationBusinessServices.forEach(obj => {
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

    businessServiceChange(event)
    {
        this._commonMultiDropdownService.filterForAssetInformationMultipleSelect(this.assetInformation.selectedAssetInformationBusinessServices,
            this.selectedBusinessService, this.assetInformation.removedAssetInformationBusinessService, "AIBusinessService", this.isEdit).then((result: any) => {
                this.assetInformation.selectedAssetInformationBusinessServices = result.selectedItems;
                this.selectedBusinessService = result.dropDownItems;
                this.assetInformation.removedAssetInformationBusinessService = result.removedItems;
            }).catch(exception => {

            });
    }

    businessProcessChange(event)
    {
        this._commonMultiDropdownService.filterForAssetInformationMultipleSelect(this.assetInformation.selectedAssetInformationBusinessprocess,
            this.selectedbusinessProcess, this.assetInformation.removedAssetInformationBusinessprocess, "AIBusinessProcess", this.isEdit).then((result: any) => {
                this.assetInformation.selectedAssetInformationBusinessprocess = result.selectedItems;
                this.selectedbusinessProcess = result.dropDownItems;
                this.assetInformation.removedAssetInformationBusinessprocess = result.removedItems;
            }).catch(exception => {

            });
    }

    itserviceChange(event) {

        this._commonMultiDropdownService.filterForAssetInformationMultipleSelect(this.assetInformation.selectedAssetInformationITservices,
            this.selectedItservice, this.assetInformation.removedAssetInformationITservice, "AIITservice", this.isEdit).then((result: any) => {
                this.assetInformation.selectedAssetInformationITservices = result.selectedItems;
                this.selectedItservice = result.dropDownItems;
                this.assetInformation.removedAssetInformationITservice = result.removedItems;
            }).catch(exception => {

            });
    }

    editIntegrity() {
        this.selectedintegrity = null;
        this.integrity.forEach(obj => {
            if (obj.id == this.assetInformation.integrityId) {
                this.selectedintegrity = obj;
            }
        })
    }

    editavailibility()
    {
        this.selectedAvailibility = null;
        this.availibility.forEach(obj => {
            if (obj.id == this.assetInformation.availibilityId) {
                this.selectedAvailibility = obj;
            }
        })
    }

    editConfidentiality()
    {
        this.selectedConfidentiality = null;
        this.Confidentiality.forEach(obj => {
            if (obj.id == this.assetInformation.confidentialityId) {
                this.selectedConfidentiality = obj;
            }
        })

    }

    editothers()
    {
        this.selectedothers = null;
        this.others.forEach(obj => {
            if (obj.id == this.assetInformation.otherId) {
                this.selectedothers = obj;
            }
        })
    }

    editCountry()
    {
        this.selectedCountry = null;
        this.country.forEach(obj => {
            if (obj.id == this.assetInformation.countryId) {
                this.selectedCountry = obj;
            }
        })
    }

    editOranization() {
        this.selectedOrganization = null;
        this.organization.forEach(obj => {
            if (obj.id == this.assetInformation.lockThreatOrganizationId) {
                this.selectedOrganization = obj;
            }
        })
    }

    editassetLabel() {
        this.selectedAssetLabel = null;
        this.assetLabel.forEach(obj => {
            if (obj.id == this.assetInformation.assetLabelId) {
                this.selectedAssetLabel = obj;
            }
        })
    }

    editAssetType() {
        this.selectedAssetType = null;
        this.assetType.forEach(obj => {
            if (obj.id == this.assetInformation.assetTypeId) {
                this.selectedAssetType = obj;
            }
        })
    }

    editAssetCategory() {
        this.selectedAssetCategory = null;
        this.assetCategory.forEach(obj => {
            if (obj.id == this.assetInformation.assetCategoryId) {
                this.selectedAssetCategory = obj;
            }
        })
    }

    editAssetOwner()
    {
        this.selectedAssetOwner = null;
        this.assetOwner.forEach(obj => {
            if (obj.id == this.assetInformation.employeeId) {
                this.selectedAssetOwner = obj;
            }
        })
    }

    save() {
        this._assetInformationServiceProxy.createOrUpdateAssetinformation(this.assetInformation).subscribe(res => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            }
            else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/information-assets']);
        });
    }


}
