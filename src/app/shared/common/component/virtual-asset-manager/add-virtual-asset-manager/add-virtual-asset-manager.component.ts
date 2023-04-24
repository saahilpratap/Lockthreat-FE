import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { VirtualAssetServiceProxy, VirtualAssetDto, HardwareAsseDetailListDto, BusinessServiceOwner, GetDynamicValueDto, ParentVirtualHostListDto, BusinessServiceSDto, ITserviceListDto, BusinessProcessDetailDto, BusinessUnitGaurdianDto, BusinessUnitPrimaryDto, GetOrganizationDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ 
    selector: 'add-virtual-asset-manager',
    templateUrl: './add-virtual-asset-manager.component.html', 
    styleUrls: ['./add-virtual-asset-manager.component.scss']
})
export class AddVirtualAssetManagerComponent extends AppComponentBase {
    text: any;

    virtualAsset: VirtualAssetDto = new VirtualAssetDto();

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

    businessUnitGaurdian: BusinessUnitGaurdianDto[] = [];
    selectedbusinessUnitGaurdian: BusinessUnitGaurdianDto = new BusinessUnitGaurdianDto();

    businessProcess: BusinessProcessDetailDto[] = [];
    selectedbusinessProcess: BusinessProcessDetailDto[] = [];

    businessService: BusinessServiceSDto[] = [];
    selectedBusinessService: BusinessServiceSDto[] = [];

    itservice: ITserviceListDto[] = [];
    selectedItservice: ITserviceListDto[] = [];

    parentVirtualHost: ParentVirtualHostListDto[] = [];
    selectedParentVirtualHost: ParentVirtualHostListDto = new ParentVirtualHostListDto();

    hardwareAsset: HardwareAsseDetailListDto[] = [];
    selectedHardwareAsset: HardwareAsseDetailListDto = new HardwareAsseDetailListDto();

    assetOwner: BusinessServiceOwner[] = [];
    selectedAssetOwner: BusinessServiceOwner = new BusinessServiceOwner();

    virtualhost: boolean=false;
    recordId: any;
    isEdit: boolean;
    oraganizationId: any;

    parenthostname: boolean = true;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        injector: Injector,
        private _commonMultiDropdownService: MultiselectDropdownService,
        private _virtualappservice: VirtualAssetServiceProxy
        
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
            this.getAllVirtualAsset(this.recordId);
        }
        else {
            this.isEdit = false;
            this.getAllVirtualAsset(this.recordId);
        }
    }

    getAllVirtualAsset(recordId)
    {
        this._virtualappservice.getAllVirtualAssetInfo(recordId).subscribe(res => {
            this.virtualAsset = res;          
            this.businessProcess = res.businessProcess;
            this.itservice = res.iTserviceLists;
            this.businessUnitGaurdian = res.businessUnitGaurdians;
          //  this.businessUnitOwner = res.businessUnitOwners;
            this.businessService = res.businessServices;
            this.organization = res.companyLists;
            this.hardwareAsset = res.hardwareAssetList;
            this.parentVirtualHost = res.parentVirtualHostList;
            this.availibility = res.availibilitys;
            this.Confidentiality = res.confidentialitys;
            this.others = res.otheres;
            this.integrity = res.integritys;
            this.assetOwner = res.employeesList;

            this.virtualAsset.selectedVirtualAssetBusinessprocess = this.virtualAsset.selectedVirtualAssetBusinessprocess == undefined ? [] : this.virtualAsset.selectedVirtualAssetBusinessprocess;
            this.virtualAsset.selectedVirtualAssetBusinessServices = this.virtualAsset.selectedVirtualAssetBusinessServices == undefined ? [] : this.virtualAsset.selectedVirtualAssetBusinessServices;
            this.virtualAsset.selectedVirtualAssetITservices = this.virtualAsset.selectedVirtualAssetITservices == undefined ? [] : this.virtualAsset.selectedVirtualAssetITservices;

            this.virtualAsset.removedVirtualAssetBusinessprocess = [];
            this.virtualAsset.removedVirtualAssetBusinessServices = [];
            this.virtualAsset.removedVirtualAssetITservice = [];
            if (this.isEdit) {
                if (res.virtualMachine == true) {
                    this.virtualhost = true;
                }
                this.pushBusinessOwner();
                this.editOranization();
                this.editHardwareAsset();
                this.editParentVirtualHost();
                this.editBusinessUnitOwner();
                this.editBusinessUnitGaurdian();
                this.editBusinessITService();
                this.editBusinessservice();
                this.editBusinessProcess();
                this.editIntegrity();
                this.editavailibility();
                this.editothers();
                this.editConfidentiality();
                this.editAssetOwner();
                this.editvirtalhostandparenthost();
            }
        })
    }

    pushBusinessOwner() {
        this.businessUnitOwner = [];
        this.virtualAsset.businessUnitOwners.forEach(obj => {
            if (obj.lockThreatOrganizationId == this.virtualAsset.lockThreatOrganizationId) {
                this.businessUnitOwner.push(obj);
            }
        })
    }

    assetOwnerChange(event) {
        this.virtualAsset.businessOwnerId = event.value.id;
    }

    confidentialityChange(event)
    {
        this.virtualAsset.confidentialityId = event.value.id;
    }

    availibilityChange(event)
    {
        this.virtualAsset.availibilityId = event.value.id;
    }

    integrityChange(event)
    {
        this.virtualAsset.integrityId = event.value.id;
    }

    othersChange(event)
    {
        this.virtualAsset.othersId = event.value.id;
    }

    checkValue(event: any)
    {
        this.virtualhost = event;
        this.selectedHardwareAsset = null;
        if (this.virtualhost == true) {
            this.parenthostname = false;
        }
        else {
            this.parenthostname = true;
        }
    }


    editvirtalhostandparenthost() {
        if (this.isEdit) {
            if (this.virtualAsset.virtualMachine == true)
            {
                this.parenthostname = false;
            }
        }
    }

    oraganizationChange(event)
    {
        this.virtualAsset.lockThreatOrganizationId = event.value.id;      
        this.businessUnitOwner = [];
        this.selectedbusinessUnitOwner = null;
        this.virtualAsset.businessUnitId = null;
        this.virtualAsset.businessUnitOwners.forEach(obj => {
            if (obj.lockThreatOrganizationId == event.value.id) {
                this.businessUnitOwner.push(obj);
            }
        })
    }

    businessUnitOwnerChange(event)
    {
        this.virtualAsset.businessUnitId = event.value.id;
    }

    businessUnitGaurdianChange(event) {
        this.virtualAsset.businessUnitGaurdianId = event.value.id;
    }

    hardwareAssetChaneg(event) {
        this.virtualAsset.hostedServerNameId = event.value.id;
    }

    parentVirtualAssetChange(event)
    {       
        this.selectedHardwareAsset = null;
        this.virtualAsset.parentVirtualHostId = event.value.id;
        if (event.value.hostedServerNameId != null && event.value.hostedServerNameId != undefined) {
            this.virtualAsset.hostedServerNameId = event.value.hostedServerNameId;
            this.hardwareAsset.forEach(obj => {
                if (obj.id == event.value.hostedServerNameId) {
                    this.selectedHardwareAsset = obj;
                }
            })
        }
        

    }

    businessServiceChange(event)
    {
        this._commonMultiDropdownService.filterForVirtualAssetMultipleSelect(this.virtualAsset.selectedVirtualAssetBusinessServices,
            this.selectedBusinessService, this.virtualAsset.removedVirtualAssetBusinessServices, "VABusinessService", this.isEdit).then((result: any) => {
                this.virtualAsset.selectedVirtualAssetBusinessServices = result.selectedItems;
                this.selectedBusinessService = result.dropDownItems;
                this.virtualAsset.removedVirtualAssetBusinessServices = result.removedItems;
            }).catch(exception => {

            });
    }

    businessProcessChange(event) {

        this._commonMultiDropdownService.filterForVirtualAssetMultipleSelect(this.virtualAsset.selectedVirtualAssetBusinessprocess,
            this.selectedbusinessProcess, this.virtualAsset.removedVirtualAssetBusinessprocess, "VABusinessProcess", this.isEdit).then((result: any) => {
                this.virtualAsset.selectedVirtualAssetBusinessprocess = result.selectedItems;
                this.selectedbusinessProcess = result.dropDownItems;
                this.virtualAsset.removedVirtualAssetBusinessprocess = result.removedItems;
            }).catch(exception => {

            });
    }

    itserviceChange(event) {

        this._commonMultiDropdownService.filterForVirtualAssetMultipleSelect(this.virtualAsset.selectedVirtualAssetITservices,
            this.selectedItservice, this.virtualAsset.removedVirtualAssetITservice, "VAITservice", this.isEdit).then((result: any) => {
                this.virtualAsset.selectedVirtualAssetITservices = result.selectedItems;
                this.selectedItservice = result.dropDownItems;
                this.virtualAsset.removedVirtualAssetITservice = result.removedItems;
            }).catch(exception => {

            });
    }

    editOranization() {
        this.selectedOrganization = null;
        this.organization.forEach(obj => {
            if (obj.id == this.virtualAsset.lockThreatOrganizationId) {
                this.selectedOrganization = obj;
            }
        })
    }

    editParentVirtualHost() {
        this.selectedParentVirtualHost = null;
        this.parentVirtualHost.forEach(obj => {
            if (obj.id == this.virtualAsset.parentVirtualHostId) {
                this.selectedParentVirtualHost = obj;
            }
        })
    }

    editHardwareAsset() {
        this.selectedHardwareAsset = null;


        this.hardwareAsset.forEach(obj => {
            if (obj.id == this.virtualAsset.hostedServerNameId) {
                this.selectedHardwareAsset = obj;
            }
        })
    }

    editBusinessUnitOwner() {
        this.selectedbusinessUnitOwner = null;
        this.businessUnitOwner.forEach(obj => {
            if (obj.id == this.virtualAsset.businessUnitId) {
                this.selectedbusinessUnitOwner = obj;
            }
        })
    }

    editBusinessUnitGaurdian() {
        this.selectedbusinessUnitGaurdian = null;
        this.businessUnitGaurdian.forEach(obj => {
            if (obj.id == this.virtualAsset.businessUnitGaurdianId) {
                this.selectedbusinessUnitGaurdian = obj;
            }
        })
    }

    editBusinessITService() {
        this.selectedItservice = [];
        this.virtualAsset.selectedVirtualAssetITservices.forEach(obj => {
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
        this.virtualAsset.selectedVirtualAssetBusinessprocess.forEach(obj => {
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

    editBusinessservice()
    {
        this.selectedBusinessService = [];

        this.virtualAsset.selectedVirtualAssetBusinessServices.forEach(obj => {
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

    editAssetOwner() {
        this.selectedAssetOwner = null;
        this.assetOwner.forEach(obj => {
            if (obj.id == this.virtualAsset.businessOwnerId) {
                this.selectedAssetOwner = obj;
            }
        })
    }

    editIntegrity() {
        this.selectedintegrity = null;
        this.integrity.forEach(obj => {
            if (obj.id == this.virtualAsset.integrityId) {
                this.selectedintegrity = obj;
            }
        })
    }

    editavailibility() {
        this.selectedAvailibility = null;
        this.availibility.forEach(obj => {
            if (obj.id == this.virtualAsset.availibilityId) {
                this.selectedAvailibility = obj;
            }
        })
    }

    editConfidentiality() {
        this.selectedConfidentiality = null;
        this.Confidentiality.forEach(obj => {
            if (obj.id == this.virtualAsset.confidentialityId) {
                this.selectedConfidentiality = obj;
            }
        })
    }

    editothers() {
        this.selectedothers = null;
        this.others.forEach(obj => {
            if (obj.id == this.virtualAsset.othersId) {
                this.selectedothers = obj;
            }
        })
    }

    SaveVirtualAsset() {
        this._virtualappservice.createOrUpdateVirtualAsset(this.virtualAsset).subscribe(res => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            }
            else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/virtual-asset-manager']);
        });
    }

}
