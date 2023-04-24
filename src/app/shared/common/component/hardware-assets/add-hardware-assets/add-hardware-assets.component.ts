import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { HardWareAssetServiceProxy, HardwareAssetDto, BusinessUnitPrimaryDto, BusinessServiceOwner, BusinessUnitGaurdianDto, BusinessProcessDetailDto, ITserviceListDto, BusinessServiceSDto, FacilitieDatacenterListDto, GetDynamicValueDto, GetOrganizationDto} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';

@Component({
    selector: 'add-hardware-assets',
    templateUrl: './add-hardware-assets.component.html',
    styleUrls: ['./add-hardware-assets.component.scss']
})
export class AddHardwareAssetsComponent extends AppComponentBase {
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

    location: FacilitieDatacenterListDto[] = [];
    selectedLocation: FacilitieDatacenterListDto = new FacilitieDatacenterListDto();

    businessUnitOwner: BusinessUnitPrimaryDto[] = [];
    selectedbusinessUnitOwner: BusinessUnitPrimaryDto = new BusinessUnitPrimaryDto();

    businessUnitGaurdian: BusinessUnitGaurdianDto[] = [];
    selectedbusinessUnitGaurdian: BusinessUnitGaurdianDto = new BusinessUnitGaurdianDto();

    businessProcess: BusinessProcessDetailDto[] = [];
    selectedbusinessProcess: BusinessProcessDetailDto[] = [];

    businessService: BusinessServiceSDto[] = [];
    selectedBusinessService: BusinessServiceSDto[] = [];

    itservice: ITserviceListDto[] = [];
    selectedItservice: ITserviceListDto[] = [];

    assetOwner: BusinessServiceOwner[] = [];
    selectedAssetOwner: BusinessServiceOwner = new BusinessServiceOwner();

    hardwareAsset: HardwareAssetDto = new HardwareAssetDto();
    recordId: any;
    isEdit: boolean;
    oraganizationId: any;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _hardwareAssetServiceProxy: HardWareAssetServiceProxy,
        private _commonMultiDropdownService: MultiselectDropdownService,
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
            this.getAllHardwareAsset(this.recordId);
        }
        else {
            this.isEdit = false;
            this.getAllHardwareAsset(this.recordId);
        }
    }

    getAllHardwareAsset(recordId)
    {
        this._hardwareAssetServiceProxy.getAllhardwareAssetInfo(recordId).subscribe(res => {
            this.hardwareAsset = res;
            this.availibility = res.availibilitys;
            this.integrity = res.integritys;
            this.organization = res.companyLists;
            this.Confidentiality = res.confidentialitys;
            this.others = res.otheres;
            this.location = res.locationLists;
         //   this.businessUnitOwner = res.businessUnitOwners;
            this.businessUnitGaurdian = res.businessUnitGaurdians;
            this.itservice = res.iTserviceLists;
            this.businessProcess = res.businessProcess;
            this.businessService = res.businessServices;
            this.assetOwner = res.employeesList;

            this.hardwareAsset.selectedHardwareAssetITservices = this.hardwareAsset.selectedHardwareAssetITservices == undefined ? [] : this.hardwareAsset.selectedHardwareAssetITservices;
            this.hardwareAsset.selectedHardwareAssetBusinessprocess = this.hardwareAsset.selectedHardwareAssetBusinessprocess == undefined ? [] : this.hardwareAsset.selectedHardwareAssetBusinessprocess;
            this.hardwareAsset.selectedHardwareAssetBusinessServices = this.hardwareAsset.selectedHardwareAssetBusinessServices == undefined ? [] : this.hardwareAsset.selectedHardwareAssetBusinessServices;

            this.hardwareAsset.removedHardwareAssetBusinessprocess = [];
            this.hardwareAsset.removedHardwareAssetBusinessService = [];
            this.hardwareAsset.removedHardwareAssetITservice = [];

            if (this.isEdit) {
                this.pushBusinessOwner();
                this.editIntegrity();
                this.editavailibility();
                this.editConfidentiality();
                this.editothers();
                this.editOranization();
                this.editLocation();
                this.editBusinessUnitOwner();
                this.editBusinessUnitGaurdian();
                this.editBusinessITService();
                this.editBusinessservice();
                this.editBusinessProcess();
                this.editAssetOwner();
            }

        })
    }

    pushBusinessOwner() {
        this.businessUnitOwner = [];
        this.hardwareAsset.businessUnitOwners.forEach(obj => {
            if (obj.lockThreatOrganizationId == this.hardwareAsset.lockThreatOrganizationId) {
                this.businessUnitOwner.push(obj);
            }
        })
    }

    confidentialityChange(event) {
        this.hardwareAsset.confidentialityId = event.value.id;

    }

    assetOwnerChange(event) {
        this.hardwareAsset.employeeId = event.value.id;
    }

    availibilityChange(event) {
        this.hardwareAsset.availibilityId = event.value.id;
    }

    integrityChange(event) {
        this.hardwareAsset.integrityId = event.value.id;
    }

    othersChange(event) {
        this.hardwareAsset.othersId = event.value.id;
    }

    oraganizationChange(event)
    {
        this.hardwareAsset.lockThreatOrganizationId = event.value.id;
        this.businessUnitOwner = [];
        this.selectedbusinessUnitOwner = null;
        this.hardwareAsset.businessUnitOwnerId = null;
        this.hardwareAsset.businessUnitOwners.forEach(obj => {
            if (obj.lockThreatOrganizationId == event.value.id) {
                this.businessUnitOwner.push(obj);
            }
        })

    }

    businessUnitOwnerChange(event) {
        this.hardwareAsset.businessUnitOwnerId = event.value.id;
    }

    businessUnitGaurdianChange(event) {
        this.hardwareAsset.businessUnitGaurdianId = event.value.id;
    }

    businessServiceChange(event) {
        this._commonMultiDropdownService.filterForHardwareAssetMultipleSelect(this.hardwareAsset.selectedHardwareAssetBusinessServices,
            this.selectedBusinessService, this.hardwareAsset.removedHardwareAssetBusinessService, "HABusinessService", this.isEdit).then((result: any) => {
                this.hardwareAsset.selectedHardwareAssetBusinessServices = result.selectedItems;
                this.selectedBusinessService = result.dropDownItems;
                this.hardwareAsset.removedHardwareAssetBusinessService = result.removedItems;
            }).catch(exception => {

            });
    }

    businessProcessChange(event) {

        this._commonMultiDropdownService.filterForHardwareAssetMultipleSelect(this.hardwareAsset.selectedHardwareAssetBusinessprocess,
            this.selectedbusinessProcess, this.hardwareAsset.removedHardwareAssetBusinessprocess, "HABusinessProcess", this.isEdit).then((result: any) => {
                this.hardwareAsset.selectedHardwareAssetBusinessprocess = result.selectedItems;
                this.selectedbusinessProcess = result.dropDownItems;
                this.hardwareAsset.removedHardwareAssetBusinessprocess = result.removedItems;
            }).catch(exception => {

            });
    }

    itserviceChange(event) {

        this._commonMultiDropdownService.filterForHardwareAssetMultipleSelect(this.hardwareAsset.selectedHardwareAssetITservices,
            this.selectedItservice, this.hardwareAsset.removedHardwareAssetITservice, "HAITservice", this.isEdit).then((result: any) => {
                this.hardwareAsset.selectedHardwareAssetITservices = result.selectedItems;
                this.selectedItservice = result.dropDownItems;
                this.hardwareAsset.removedHardwareAssetITservice = result.removedItems;
            }).catch(exception => {

            });
    }

    editAssetOwner() {
        this.selectedAssetOwner = null;
        this.assetOwner.forEach(obj => {
            if (obj.id == this.hardwareAsset.employeeId) {
                this.selectedAssetOwner = obj;
            }
        })
    }

    locationChange(event) {
        this.hardwareAsset.locationsId = event.value.id;
    }

    editIntegrity() {
        this.selectedintegrity = null;
        this.integrity.forEach(obj => {
            if (obj.id == this.hardwareAsset.integrityId) {
                this.selectedintegrity = obj;
            }
        })
    }

    editavailibility() {
        this.selectedAvailibility = null;
        this.availibility.forEach(obj => {
            if (obj.id == this.hardwareAsset.availibilityId) {
                this.selectedAvailibility = obj;
            }
        })
    }

    editConfidentiality() {
        this.selectedConfidentiality = null;
        this.Confidentiality.forEach(obj => {
            if (obj.id == this.hardwareAsset.confidentialityId) {
                this.selectedConfidentiality = obj;
            }
        })
    }

    editothers() {
        this.selectedothers = null;
        this.others.forEach(obj => {
            if (obj.id == this.hardwareAsset.othersId) {
                this.selectedothers = obj;
            }
        })
    }

    editLocation() {
        this.selectedLocation = null;
        this.location.forEach(obj => {
            if (obj.id == this.hardwareAsset.locationsId) {
                this.selectedLocation = obj;
            }
        })
    }

    editOranization() {
        this.selectedOrganization = null;
        this.organization.forEach(obj => {
            if (obj.id == this.hardwareAsset.lockThreatOrganizationId) {
                this.selectedOrganization = obj;
            }
        })
    }

   

    editBusinessUnitOwner() {
        this.selectedbusinessUnitOwner = null;
        this.businessUnitOwner.forEach(obj => {
            if (obj.id == this.hardwareAsset.businessUnitOwnerId) {
                this.selectedbusinessUnitOwner = obj;
            }
        })
    }

    editBusinessUnitGaurdian() {
        this.selectedbusinessUnitGaurdian = null;
        this.businessUnitGaurdian.forEach(obj => {
            if (obj.id == this.hardwareAsset.businessUnitGaurdianId) {
                this.selectedbusinessUnitGaurdian = obj;
            }
        })
    }

    editBusinessITService() {
        this.selectedItservice = [];
        this.hardwareAsset.selectedHardwareAssetITservices.forEach(obj => {
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
        this.hardwareAsset.selectedHardwareAssetBusinessprocess.forEach(obj => {
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
        this.hardwareAsset.selectedHardwareAssetBusinessServices.forEach(obj => {
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

    saveHardwareAsset() {
        this._hardwareAssetServiceProxy.createOrUpdateHardwareAsset(this.hardwareAsset).subscribe(res => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            }
            else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/hardware-assets']);
        });
    }
}
