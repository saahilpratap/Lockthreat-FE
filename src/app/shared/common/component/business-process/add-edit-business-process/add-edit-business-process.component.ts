import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { BusinessProcessServiceProxy, GetDynamicValueDto, BusinessUnitPrimaryDto, BusinessServiceSDto, AuthoratativeDocumentsDto, BusinessServiceOwner, GetOrganizationDto, BusinessProcessDto, CountryDto} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'add-edit-business-process',
    templateUrl: './add-edit-business-process.component.html',
    styleUrls: ['./add-edit-business-process.component.scss']
})
export class AddEditBusinessProcessComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    text: any;
    recordId: any;
    isEdit: boolean;
    oraganizationId: any;
    businessUnitName:string;

    businessProcess: BusinessProcessDto = new BusinessProcessDto();

    organization: GetOrganizationDto[] = [];
    selectedOrganization: GetOrganizationDto = new GetOrganizationDto();

    status: GetDynamicValueDto[] = [];
    selectedStatus: GetDynamicValueDto = new GetDynamicValueDto();

    ProcessType: GetDynamicValueDto[] = [];
    selectedProcessType: GetDynamicValueDto = new GetDynamicValueDto();

    SLA: GetDynamicValueDto[] = [];
    selectedSLA: GetDynamicValueDto = new GetDynamicValueDto();

    activity: GetDynamicValueDto[] = [];
    selectedActivity: GetDynamicValueDto = new GetDynamicValueDto();

    Country: CountryDto[] = [];
    selectedCountry: CountryDto = new CountryDto();

    processManager: BusinessServiceOwner[] = [];
    selectedProcessManager: BusinessServiceOwner = new BusinessServiceOwner();

    processOwner: BusinessServiceOwner[] = [];
    selectedProcessOwner: BusinessServiceOwner = new BusinessServiceOwner();

    authoratativeSource: AuthoratativeDocumentsDto[] = [];
    selectedAuthoratativeSource: AuthoratativeDocumentsDto[] = [];

    businessUnit: BusinessUnitPrimaryDto[] = [];
    SelectedBusinessUnit: BusinessUnitPrimaryDto = new BusinessUnitPrimaryDto();

    businessUnitDependent: BusinessUnitPrimaryDto[] = [];
    selectedbusinessUnitDependent: BusinessUnitPrimaryDto[] = [];

    regulatory: GetDynamicValueDto[] = [];
    selectedGetRegulatory: GetDynamicValueDto = new GetDynamicValueDto();

    Others: GetDynamicValueDto[] = [];
    selectedOthers: GetDynamicValueDto = new GetDynamicValueDto();

    Confidentiality: GetDynamicValueDto[] = [];
    selectedConfidentiality: GetDynamicValueDto = new GetDynamicValueDto();

    integrity: GetDynamicValueDto[] = [];
    selectedIntegrity: GetDynamicValueDto = new GetDynamicValueDto();

    availibility: GetDynamicValueDto[] = [];
    selectedAvailibility: GetDynamicValueDto = new GetDynamicValueDto();

    reviewPeriod: GetDynamicValueDto[] = [];
    selectedReviewPeriod: GetDynamicValueDto = new GetDynamicValueDto();

    businessService: BusinessServiceSDto[] = [];
    selectedBusinessService: BusinessServiceSDto[] = [];

    Priority: GetDynamicValueDto[] = [];
    selectedPriority: GetDynamicValueDto = new GetDynamicValueDto();

    constructor(
        private _businessProcessProxy: BusinessProcessServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _commonMultiDropdownService: MultiselectDropdownService,
        private _router: Router,
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
            this.getAppBusinessProcess(this.recordId);


        } else {
            this.isEdit = false;
            this.getAppBusinessProcess(this.recordId);

        }

    }

    businessServiceDependentChange(event) {

        this._commonMultiDropdownService.filterForBusinessProcessMultipleSelect(this.businessProcess.selectedBusinessProcessServices,
            this.selectedBusinessService, this.businessProcess.removedBusinessProcessServices, "BusinessService", this.isEdit).then((result: any) => {
                debugger
                this.businessProcess.selectedBusinessProcessServices = result.selectedItems;
                this.selectedBusinessService = result.dropDownItems;
                this.businessProcess.removedBusinessProcessServices = result.removedItems;
            }).catch(exception => {

            });
    }

    businessUnitDependentChange(event) {
        this._commonMultiDropdownService.filterForBusinessProcessMultipleSelect(this.businessProcess.selectedBusinessProcessUnits,
            this.selectedbusinessUnitDependent, this.businessProcess.removedBusinessProcessUnits, "BusinessUnit", this.isEdit).then((result: any) => {
                this.businessProcess.selectedBusinessProcessUnits = result.selectedItems;
                this.selectedbusinessUnitDependent = result.dropDownItems;
                this.businessProcess.removedBusinessProcessUnits = result.removedItems;
            }).catch(exception => {
            });
    }

    processOwnerChange(event) {

        this.businessProcess.processOwnerId = event.value.id;
    }

    authoratativeDocumentChange(event) {

        this._commonMultiDropdownService.filterForBusinessProcessMultipleSelect(this.businessProcess.selectedBusinessProcessAuthorativeDocuments,
            this.selectedAuthoratativeSource, this.businessProcess.removedBusinessProcessAuthorativeDocuments, "Documents", this.isEdit).then((result: any) => {

                this.businessProcess.selectedBusinessProcessAuthorativeDocuments = result.selectedItems;
                this.selectedAuthoratativeSource = result.dropDownItems;
                this.businessProcess.removedBusinessProcessAuthorativeDocuments = result.removedItems;
            }).catch(exception => {

            });

    }

    regulatoryChange(event) {
        this.businessProcess.regulatoryId = event.value.id;
    }

    businessUnitChange(event) {

        this.businessProcess.businessUnitId = event.value.id;

        this.businessUnitName = this.businessUnit.find(x => x.id === event.value.id).businessUnitTitle;
    }

    managerChange(event) {

        this.businessProcess.processManagerId = event.value.id;
    }

    getAppBusinessProcess(recordId) {
        this._businessProcessProxy.getAllBusinessprocessInfo(recordId).subscribe(result => {
            
            this.businessProcess = result;
            this.Others = result.otheres;
            this.Confidentiality = result.confidentialitys;
            this.availibility = result.availibilityes;
            this.integrity = result.intergritys;
            this.businessUnit = result.businessUnits;
            this.authoratativeSource = result.authoratativeDocuments;
            this.businessUnitDependent = result.businessUnits;
            this.organization = result.companyLists;
            this.businessService = result.businessServices;
            this.processManager = result.processManagers;
            this.processOwner = result.processOwners;
            this.SLA = result.slaApplicables;
            this.reviewPeriod = result.reviewPeriods;
            this.regulatory = result.regulatorys;
            this.Priority = result.processPrioritys;
            this.ProcessType = result.processTypes;
            this.Country = result.countries;
            this.businessUnit = result.businessUnits;
            this.status = result.statuses;
            this.activity = result.activityCycles;
            this.businessProcess.selectedBusinessProcessAuthorativeDocuments = this.businessProcess.selectedBusinessProcessAuthorativeDocuments == undefined ? [] : this.businessProcess.selectedBusinessProcessAuthorativeDocuments;
            this.businessProcess.selectedBusinessProcessServices = this.businessProcess.selectedBusinessProcessServices == undefined ? [] : this.businessProcess.selectedBusinessProcessServices;
            this.businessProcess.selectedBusinessProcessUnits = this.businessProcess.selectedBusinessProcessUnits == undefined ? [] : this.businessProcess.selectedBusinessProcessUnits;

            this.businessProcess.removedBusinessProcessUnits = [];
            this.businessProcess.removedBusinessProcessServices = [];
            this.businessProcess.removedBusinessProcessAuthorativeDocuments = [];

            if (this.isEdit) {
                this.editorganization();
                this.editProcessType();
                this.editStatus();
                this.editActivity();
                this.editSla();
                this.editCountry();
                this.editManager();
                this.editProcessOwner();
                this.editBusinessunitDependent();
                this.editAuthorativeDocument();
                this.editBusinessService();
                this.editinterity();
                this.editConfidentiality();
                this.editBusinessUnitOwner();
                this.editother();
                this.editPriority();
                this.editreview();
                this.editAvailibility();
            }
        });
    }

    editorganization() {
        this.selectedOrganization = null;
        this.organization.forEach(obj => {
            if (obj.id == this.businessProcess.lockThreatOrganizationId) {
                this.selectedOrganization = obj;
            }

        })
    }

    editProcessType() {
        this.selectedProcessType = null;
        this.ProcessType.forEach(obj => {
            if (obj.id == this.businessProcess.processTypeId) {
                this.selectedProcessType = obj;
            }

        })

    }

    editStatus() {
        this.selectedStatus = null;
        this.status.forEach(obj => {
            if (obj.id == this.businessProcess.statusId) {
                this.selectedStatus = obj;
            }
        })
    }

    editActivity()
    {
        this.selectedActivity = null;
        this.activity.forEach(obj => {
            if (obj.id == this.businessProcess.activityCycleId) {
                this.selectedActivity = obj;
            }
        })       
    }

    editSla()
    {
        this.selectedSLA = null;
        this.SLA.forEach(obj => {
            if (obj.id == this.businessProcess.slaApplicableId) {
                this.selectedSLA = obj;
            }
        })
    }

    editCountry()
    {
        this.selectedCountry = null;
        this.Country.forEach(obj => {
            if (obj.id == this.businessProcess.countryId) {
                this.selectedCountry = obj;
            }
        })
    }

    editManager()
    {
        this.selectedProcessManager = null;
        this.processManager.forEach(obj => {
            if (obj.id == this.businessProcess.processManagerId) {
                this.selectedProcessManager = obj;
            }
        })

    }

    editProcessOwner()
    {
        this.selectedProcessOwner = null;
        this.processOwner.forEach(obj => {
            if (obj.id == this.businessProcess.processOwnerId) {
                this.selectedProcessOwner = obj;
            }
        })
    }

    editBusinessunitDependent()
    {
        this.selectedbusinessUnitDependent = [];
        this.businessProcess.selectedBusinessProcessUnits.forEach(obj => {
            this.businessUnitDependent.forEach(team => {
                if (obj.businessUnitId == team.id) {

                    var temp = new BusinessUnitPrimaryDto();
                    temp.id = team.id;
                    temp.lockThreatOrganizationId = team.lockThreatOrganizationId;
                    temp.businessUnitTitle = team.businessUnitTitle;
                    this.selectedbusinessUnitDependent.push(temp);
                }
            });
        });
    }

    editAuthorativeDocument() {
        
        this.selectedAuthoratativeSource = [];
        this.businessProcess.selectedBusinessProcessAuthorativeDocuments.forEach(obj => {
            this.authoratativeSource.forEach(team => {
                if (obj.authoratativeDocumentId == team.id) {
                        var temp = new AuthoratativeDocumentsDto();
                          temp.id = team.id;
                          temp.authoratativeDocumentTitle = team.authoratativeDocumentTitle;                       
                          this.selectedAuthoratativeSource.push(temp);
                    }
                });
            });
        
    }

    editBusinessService() {
        this.selectedBusinessService = [];
        this.businessProcess.selectedBusinessProcessServices.forEach(obj => {
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

    editinterity() {
        this.selectedIntegrity = null;
        this.integrity.forEach(obj => {
            if (obj.id == this.businessProcess.intergrityId) {
                this.selectedIntegrity = obj;
            }
        })
    }

    editConfidentiality() {
        this.selectedConfidentiality = null;
        this.Confidentiality.forEach(obj => {
            if (obj.id == this.businessProcess.confidentialityId) {
                this.selectedConfidentiality = obj;
            }
        })
    }

    editBusinessUnitOwner() {
        this.SelectedBusinessUnit = null;
        this.businessUnit.forEach(obj => {
            if (obj.id == this.businessProcess.businessUnitId) {
                this.SelectedBusinessUnit = obj;
            }
        })
        if (this.isEdit && this.businessUnit.length > 0) {

            this.businessUnitName = this.businessUnit.find(x => x.id === this.businessProcess.businessUnitId).businessUnitTitle;
        } else {
            this.businessUnitName = '';
        }
    }

    editother()
    {

        this.selectedOthers = null;
        this.Others.forEach(obj => {
            if (obj.id == this.businessProcess.othersId) {
                this.selectedOthers = obj;
            }
        })
    }

    editPriority()
    {
        this.selectedPriority = null;
        this.Priority.forEach(obj => {
            if (obj.id == this.businessProcess.processPriorityId) {
                this.selectedPriority = obj;
            }
        })
        
    }

    editreview() {
        
        this.selectedReviewPeriod = null;
        this.reviewPeriod.forEach(obj => {
            if (obj.id == this.businessProcess.reviewPeriodId) {
                this.selectedReviewPeriod = obj;
            }
        })
    }

    editAvailibility() {

        this.selectedAvailibility = null;
        this.availibility.forEach(obj => {
            if (obj.id == this.businessProcess.availibilityId) {
                this.selectedAvailibility = obj;
            }
        })
        
    }

    organizationChange(event)
    {
        
        this.businessProcess.lockThreatOrganizationId = event.value.id;
    }

    countryChange(event)
    {
        
        this.businessProcess.countryId = event.value.id;
    }

    statusChange(event)
    {
        
        this.businessProcess.statusId = event.value.id;
    }

    selectslaChange(event)
    {
        
        this.businessProcess.slaApplicableId = event.value.id;
    }

    activityChange(event) {
        
        this.businessProcess.activityCycleId = event.value.id;
    }

    processTypeChange(event) {
        
        this.businessProcess.processTypeId = event.value.id;
    }

    integrityChange(event)
    {
        
        this.businessProcess.intergrityId = event.value.id;
    }

    riviewChange(event) {
        
        this.businessProcess.reviewPeriodId = event.value.id;
    }

    availibilityChange(event) {
        
        this.businessProcess.availibilityId = event.value.id;
    }

    priorityChange(event) {
        
        this.businessProcess.processPriorityId = event.value.id;
    }

    otherChange(event) {
        
        this.businessProcess.othersId = event.value.id;
    }

    confidentialityChange(event) {
        
        this.businessProcess.confidentialityId = event.value.id;
    }

    saveBusinessProcess() {
        
        this._businessProcessProxy.createOrUpdateBusinessProcess(this.businessProcess).subscribe(res => {

            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }            
            this._router.navigate(['/app/main/business-process']);
        });
    }
    
}
