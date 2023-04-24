import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, FindingInfoDto, FindingOrganizationDto, StrategicObjectivesDto, FindingSystemsApplicationDto, FindingVirtualHostDto, FindingAssetInformationDto, FindingHardwareAssetDto, FindingFacilitieDatacenterDto, FindingStrategicObjectiveDto, FindingVendorDto, FindingBusinessUnitDto, VirtualListDto, GetDynamicValueDto, FindingIncidentListDto, VendorListDto, StrategicObjectiveListDto, RiskRegisterListDto, SytemApplicationDto, BusinessUnitGaurdianDto, InternalControlListDto, ProgramAuthoritativeDocumentsDto, AssetInformationListDto, FacilitieDatacenterListDto, ControlOperatingListDto, ControlDesignListDto, GetOrganizationDto, HardwareAsseDetailListDto, BusinessServiceOwner, FindingServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'add-edit-related-findings',
    templateUrl: './add-edit-related-findings.component.html',
    styleUrls: ['./add-edit-related-findings.component.scss']
})
export class AddEditRelatedFindingsComponent extends AppComponentBase {
    
    recordId: any;
    isEdit: boolean;
    text: any;
    sampleDate: Date;
    constructor(
        injector: Injector,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _findingService: FindingServiceProxy        
    ) {
        super(injector);
    }

    finding: FindingInfoDto = new FindingInfoDto();

    findingCoordinator: BusinessServiceOwner[] = [];
    selectedFindingCoordinator: BusinessServiceOwner = new BusinessServiceOwner();

    findingManager: BusinessServiceOwner[] = [];
    selectedfindingManager: BusinessServiceOwner = new BusinessServiceOwner();

    findingOwner: BusinessServiceOwner[] = [];
    selectedfindingOwner: BusinessServiceOwner = new BusinessServiceOwner();

    findingReview: BusinessServiceOwner[] = [];
    selectedfindingReview: BusinessServiceOwner = new BusinessServiceOwner();

    Assigned: BusinessServiceOwner[] = [];
    selectedAssigned: BusinessServiceOwner = new BusinessServiceOwner();

    businessUnit: BusinessUnitGaurdianDto[] = [];
    selectedBusinessunit: BusinessUnitGaurdianDto[] = [];

    hardware: HardwareAsseDetailListDto[] = [];
    selectedHardware: HardwareAsseDetailListDto[] = [];

    organization: GetOrganizationDto[] = [];
    selectedOrganization: GetOrganizationDto[] = [];

    controlDesign: ControlDesignListDto[] = [];
    selectedControlDesign: ControlDesignListDto[] = [];

    controlOperating: ControlOperatingListDto[] = [];
    selectedControlOperating: ControlOperatingListDto[] = [];

    facilitiDatacenter: FacilitieDatacenterListDto[] = [];
    selectedFacilitiDatacenter: FacilitieDatacenterListDto[] = [];

    assetInformation: AssetInformationListDto[] = [];
    selectedAssetInformation: AssetInformationListDto[] = [];

    authorativeDocument: ProgramAuthoritativeDocumentsDto[] = [];
    SelectedAuthorativeDocument: ProgramAuthoritativeDocumentsDto[] = [];

    internalControl: InternalControlListDto[] = [];
    selectedInternalControl: InternalControlListDto[] = [];

    VirtualHost: VirtualListDto[] = [];
    SelectedVirtualHost: VirtualListDto[] = [];

    virtualMachine: VirtualListDto[] = [];
    selectedVirtualMachine: VirtualListDto[] = [];

    systeamApplication: SytemApplicationDto[] = [];
    selectedSysteamApplication: SytemApplicationDto[] = [];

    riskregister: RiskRegisterListDto[] = [];
    selectedriskRegister: RiskRegisterListDto[] = [];

    StrategicObjective: StrategicObjectivesDto[] = [];
    selectedStrategicObjective: StrategicObjectivesDto[] = [];

    Vendor: VendorListDto[] = [];
    selectedVendor: VendorListDto[] = [];

    findingIncident: FindingIncidentListDto[] = [];
    selectedFindingIncident: FindingIncidentListDto[] = [];

    category: GetDynamicValueDto[]=[];
    selectedCategory: GetDynamicValueDto = new GetDynamicValueDto();

    findingStatus: GetDynamicValueDto[] = [];
    selectedFindingStatus: GetDynamicValueDto = new GetDynamicValueDto();

    Classification: GetDynamicValueDto[] = [];
    selectedClassification: GetDynamicValueDto = new GetDynamicValueDto();

    Action: GetDynamicValueDto[] = [];
    selectedAction: GetDynamicValueDto = new GetDynamicValueDto();

    response: GetDynamicValueDto[] = [];
    selectedResponse: GetDynamicValueDto = new GetDynamicValueDto();

    Ranking: GetDynamicValueDto[] = [];
    selectedRanking: GetDynamicValueDto = new GetDynamicValueDto();


    ngOnInit()
    {      
        this._activatedRoute.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );
        if (this.recordId) {
            this.isEdit = true;
            this.getAllfinding(this.recordId);
        } else {
            this.isEdit = false;
            this.getAllfinding(this.recordId);
        }
    }

    getAllfinding(recordId)
    {
        this._findingService.getAllfindingInfo(recordId).subscribe(res =>
        {
            this.finding = res;
            this.findingCoordinator = res.findingCoordinatorList;
            this.findingManager = res.findingManagerList;
            this.findingOwner = res.findingOwnerList;
            this.findingReview = res.reviewesList;
            this.Assigned = res.assignedList;
            this.businessUnit = res.businessUnitList;
            this.hardware = res.hardwareAssetList;
            this.organization = res.companyList;
            this.controlDesign = res.controlDesignList;
            this.internalControl = res.internalControlList;
            this.controlOperating = res.controlOperatingList;
            this.facilitiDatacenter = res.facilitieDatacenterList;
            this.assetInformation = res.assetInformationList;
            this.authorativeDocument = res.authoritativeSourceList;
            this.VirtualHost = res.virtualHostList;
            this.virtualMachine = res.virtualMachineList;
            this.systeamApplication = res.sytemApplicationList;
            this.riskregister = res.riskRegisterList;
            this.Vendor = res.vendorList;
            this.Action = res.actionLsit;
            this.response = res.responses;
            this.Classification = res.classificationList;
            this.findingStatus = res.findingStatusList;
            this.category = res.categoryList;
            this.findingIncident = res.findingIncidentList;
            this.Ranking = res.rankingList;
            this.StrategicObjective = res.strategicObjectiveList;
            
            if (this.isEdit)
            {
                this.editAll();
            }
        })
    }


    classificationChange(event) {
        this.finding.classificationId = event.value.id;

    }

    SeverityChange(event) {
        this.finding.rankingId = event.value.id;
    }

    statusChange(event)
    {
        this.finding.findingStatusId = event.value.id;
    }

    categoryChange(event) {
        this.finding.categoryId = event.value.id;
    }
    companyChange(event) {
        this.finding.selectedFindingOrganizations = [];
        event.value.forEach(obj => {
            var item = new FindingOrganizationDto();
            item.id = 0;
            item.findingId = 0;
            item.lockThreatOrganizationId = obj.id;
            this.finding.selectedFindingOrganizations.push(item);
        })  
    }

    managerChange(event) {
        this.finding.findingManagerId = event.value.id;
    }

    businessUnitChange(event) {
        this.finding.selectedFindingBusinessUnits = [];
        event.value.forEach(obj => {
            var item = new FindingBusinessUnitDto();
            item.id = 0;
            item.findingId = 0;
            item.businessUnitId = obj.id;
            this.finding.selectedFindingBusinessUnits.push(item);
        })  
    }

    coordinatorChange(event) {
        this.finding.findingCoordinatorId = event.value.id;
    }

    OwnerChange(event) {
        this.finding.findingOwnerId = event.value.id;
    }

    vendorChange(event) {
        this.finding.selectedFindingVendors = [];
        event.value.forEach(obj => {
            var item = new FindingVendorDto();
            item.id = 0;
            item.findingId = 0;
            item.vendorId = obj.id;
            this.finding.selectedFindingVendors.push(item);
        })  
    }

    authoratativeChange(event) {

    }
    controlDesignChange(event) {

    }
    riskRegisterChange(event) {

    }

    controlOperatingChange(event) {

    }

    internalControlChange(event) {

    }
    incidentChange(event) {

    }

    strategicObjectiveTitleChange(event) 
    {
        this.finding.selectedFindingStrategicObjectives = [];
        event.value.forEach(obj => {
            var item = new FindingStrategicObjectiveDto();
            item.id = 0;
            item.findingId = 0;
            item.strategicObjectiveId = obj.id;
            this.finding.selectedFindingStrategicObjectives.push(item);
        })  
      }

    facilitiDatacenterChange(event) {
        this.finding.selectedFindingFacilitieDatacenters = [];
        event.value.forEach(obj => {
            var item = new FindingFacilitieDatacenterDto();
            item.id = 0;
            item.findingId = 0;
            item.facilitieDatacenterId = obj.id;
            this.finding.selectedFindingFacilitieDatacenters.push(item);
        })  
    }

    hardwareChange(event) {

        this.finding.selectedFindingHardwareAssets = [];
        event.value.forEach(obj => {
            var item = new FindingHardwareAssetDto();
            item.id = 0;
            item.findingId = 0;
            item.hardwareAssetId = obj.id;
            this.finding.selectedFindingHardwareAssets.push(item);
        })          
    }

    assetInformationChange(event) {
        this.finding.selectedFindingAssetInformations = [];
        event.value.forEach(obj => {
            var item = new FindingAssetInformationDto();
            item.id = 0;
            item.findingId = 0;
            item.assetInformationId = obj.id;
            this.finding.selectedFindingAssetInformations.push(item);
        })  
    }

    virtualhostChange(event) {

        this.finding.selectedFindingVirtualHosts = [];
        event.value.forEach(obj => {
            var item = new FindingVirtualHostDto();
            item.id = 0;
            item.findingId = 0;
            item.virtualAssetId = obj.id;
            this.finding.selectedFindingVirtualHosts.push(item);
        })
        
    }

    systeamApplicationChange(event)
    {

        this.finding.selectedFindingSystemsApplications = [];
        event.value.forEach(obj => {
            var item = new FindingSystemsApplicationDto();
            item.id = 0;
            item.findingId = 0;
            item.systemApplicationId = obj.id;
            this.finding.selectedFindingSystemsApplications.push(item);
        })
    }

    virtualMachineChange(event) {
        this.finding.selectedFindingVirtualMachines = [];
        event.value.forEach(obj => {
            var item = new FindingVirtualHostDto();
            item.id = 0;
            item.findingId = 0;
            item.virtualAssetId = obj.id;
            this.finding.selectedFindingVirtualMachines.push(item);
        })
    }

    ActionChange(event) {
        this.finding.actionId = event.value.id;
    }

    reviewChange(event) {
        this.finding.reviewedId = event.value.id;
    }

    responseChange(event) {
        this.finding.responseId = event.value.id;
    }

    assignedChange(event) {
        this.finding.assignedId = event.value.id;
    }

    editAll()
    {
        this.editAction();
        this.editAssigned();
        this.editBusinessUnit();
        this.editCategory();
        this.editClassfication();
        this.editCoordinator();
        this.editFacilitiesDataCenter();
        this.editfindingOwner();
        this.editFindingStatus();
        this.edithardwareAsset();
        this.editinformationAsset();
        this.editManager();
        this.editOrganization();
        this.editRanking();
        this.editResponse();
        this.editReviewdBy();
        this.editStrategicObjectives();
        this.editSystemApplication();
        this.editVendor();
        this.editvirtualHost();
        this.editvirtualMachine();        
    }

    editClassfication() {
        this.selectedClassification = null;
        this.Classification.forEach(obj => {
            if (obj.id == this.finding.classificationId) {
                this.selectedClassification = obj;
            }
        })
    }

    editRanking() {
        this.selectedRanking = null;
        this.Ranking.forEach(obj => {
            if (obj.id == this.finding.rankingId) {
                this.selectedRanking = obj;
            }
        })
    }

    editFindingStatus() {
        this.selectedFindingStatus = null;
        this.findingStatus.forEach(obj => {
            if (obj.id == this.finding.findingStatusId) {
                this.selectedFindingStatus = obj;
            }
        })
    }

    editCategory() {
        this.selectedCategory = null;
        this.category.forEach(obj => {
            if (obj.id == this.finding.categoryId) {
                this.selectedCategory = obj;
            }
        })
    }

    editOrganization() {
        this.selectedOrganization = [];
        this.finding.selectedFindingOrganizations.forEach(obj => {
            this.organization.forEach(team => {
                if (obj.lockThreatOrganizationId == team.id) {
                    var temp = new GetOrganizationDto();
                    temp.id = team.id;
                    temp.companyId = team.companyId;
                    temp.companyName = team.companyName;
                    this.selectedOrganization.push(temp);
                }
            });
        });  
    }

    editManager() {
        this.selectedfindingManager = null;
        this.findingManager.forEach(obj => {
            if (obj.id == this.finding.findingManagerId) {
                this.selectedfindingManager = obj;
            }
        })


    }

    editBusinessUnit()
    {
        this.selectedBusinessunit = [];
        this.finding.selectedFindingBusinessUnits.forEach(obj => {
            this.businessUnit.forEach(team => {
                if (obj.businessUnitId == team.id) {
                    var temp = new BusinessUnitGaurdianDto();
                    temp.id = team.id;
                    temp.lockThreatOrganizationId = team.lockThreatOrganizationId;
                    temp.businessUnitTitle = team.businessUnitTitle;
                    this.selectedBusinessunit.push(temp);
                }
            });
        });  

    }

    editCoordinator() {
        this.selectedFindingCoordinator = null;
        this.findingCoordinator.forEach(obj => {
            if (obj.id == this.finding.findingCoordinatorId) {
                this.selectedFindingCoordinator = obj;
            }
        })
    }

    editfindingOwner() {
        this.selectedfindingOwner = null;
        this.findingOwner.forEach(obj => {
            if (obj.id == this.finding.findingOwnerId) {
                this.selectedfindingOwner = obj;
            }
        })
    }

    editVendor() {
        this.selectedVendor = [];
        this.finding.selectedFindingVendors.forEach(obj => {
            this.Vendor.forEach(team => {
                if (obj.vendorId == team.id) {
                    var temp = new VendorListDto();
                    temp.id = team.id;
                    temp.vendorName = team.vendorName;                   
                    this.selectedVendor.push(temp);
                }
            });
        });  
    }

    editStrategicObjectives()
    {
        this.selectedStrategicObjective = [];
        this.finding.selectedFindingStrategicObjectives.forEach(obj => {
            this.StrategicObjective.forEach(team => {
                if (obj.strategicObjectiveId == team.id) {
                    var temp = new StrategicObjectivesDto();
                    temp.id = team.id;
                    temp.strategicObjectiveTitle = team.strategicObjectiveTitle;
                    this.selectedStrategicObjective.push(temp);
                }
            });
        });  
    }

    editFacilitiesDataCenter()
    {
        this.selectedFacilitiDatacenter = [];
        this.finding.selectedFindingFacilitieDatacenters.forEach(obj => {
            this.facilitiDatacenter.forEach(team => {
                if (obj.facilitieDatacenterId == team.id) {
                    var temp = new FacilitieDatacenterListDto();
                    temp.id = team.id;
                    temp.facilityName = team.facilityName;
                    this.selectedFacilitiDatacenter.push(temp);
                }
            });
        });  
    }

    edithardwareAsset()
    {
        this.selectedHardware = [];
        this.finding.selectedFindingHardwareAssets.forEach(obj => {
            this.hardware.forEach(team => {
                if (obj.hardwareAssetId == team.id) {
                    var temp = new HardwareAsseDetailListDto();
                    temp.id = team.id;
                    temp.hardwareAssetName = team.hardwareAssetName;
                    this.selectedHardware.push(temp);
                }
            });
        });  
    }

    editinformationAsset()
    {
        this.selectedAssetInformation = [];
        this.finding.selectedFindingAssetInformations.forEach(obj => {
            this.assetInformation.forEach(team => {
                if (obj.assetInformationId == team.id) {
                    var temp = new AssetInformationListDto();
                    temp.id = team.id;
                    temp.assetTitle = team.assetTitle;
                    this.selectedAssetInformation.push(temp);
                }
            });
        });  
    }

    editvirtualHost() {
        this.SelectedVirtualHost = [];
        this.finding.selectedFindingVirtualHosts.forEach(obj => {
            this.VirtualHost.forEach(team => {
                if (obj.virtualAssetId == team.id) {
                    var temp = new VirtualListDto();
                    temp.id = team.id;
                    temp.virtualAssetName = team.virtualAssetName;
                    this.SelectedVirtualHost.push(temp);
                }
            });
        });
    }

    editvirtualMachine()
    {
        this.selectedVirtualMachine = [];
        this.finding.selectedFindingVirtualMachines.forEach(obj => {
            this.virtualMachine.forEach(team => {
                if (obj.virtualAssetId == team.id) {
                    var temp = new VirtualListDto();
                    temp.id = team.id;
                    temp.virtualAssetName = team.virtualAssetName;
                    this.selectedVirtualMachine.push(temp);
                }
            });
        });
    }

    editSystemApplication()
    {
        this.selectedSysteamApplication = [];
        this.finding.selectedFindingSystemsApplications.forEach(obj => {
            this.systeamApplication.forEach(team => {
                if (obj.systemApplicationId == team.id) {
                    var temp = new SytemApplicationDto();
                    temp.id = team.id;
                    temp.systemApplicationName = team.systemApplicationName;
                    this.selectedSysteamApplication.push(temp);
                }
            });
        });
    }

    editResponse()
    {
        this.selectedResponse = null;
        this.response.forEach(obj => {
            if (obj.id == this.finding.responseId)
            {
                this.selectedResponse = obj;
            }
        })
    }

    editReviewdBy() {
        this.selectedfindingReview = null;
        this.findingReview.forEach(obj => {
            if (obj.id == this.finding.reviewedId) {
                this.selectedfindingReview = obj;
            }
        })
    }

    editAction() {
        this.selectedAction = null;
        this.Action.forEach(obj => {
            if (obj.id == this.finding.actionId) {
                this.selectedAction = obj;
            }
        })
    }

    editAssigned()
    {
        this.selectedAssigned = null;
        this.Assigned.forEach(obj => {
            if (obj.id == this.finding.assignedId) {
                this.selectedAssigned = obj;
            }
        })
    }

    saveFinding()
    {
        this._findingService.createOrUpdateFinding(this.finding).subscribe(result => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/all-findings']);
        })
    }
}
