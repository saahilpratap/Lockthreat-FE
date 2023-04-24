import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { ExceptionServiceProxy, GetDynamicValueDto, GetExceptionInfoDto, AuthorativeDocumentDto, RemediationDto, CitationDto, BusinessServiceOwner, SytemApplicationDto, BusinessUnitPrimaryDto, PolicyManagerDto, AssetInformationListDto, GetOrganizationDto } from '@shared/service-proxies/service-proxies';
import { MultiselectDropdownService } from 'app/shared/common/component/common-services/multiselect-dropdown-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'add-edit-exception',
    templateUrl: './add-edit-exception.component.html',
    styleUrls: ['./add-edit-exception.component.scss']
})
export class AddEditExceptionComponent extends AppComponentBase implements OnInit {

    @ViewChild('SampleDatePicker', { static: true }) sampleDatePicker: ElementRef;
    display: boolean = false;
    title = 'Home';
    subTitle = 'Home Dashboard';
    pageTitle = 'All Exception';
    sampleDate: moment.Moment;
    isEdit: boolean;
    recordId: any;

    exception: GetExceptionInfoDto = new GetExceptionInfoDto();

    critcality: GetDynamicValueDto[] = [];
    selectedcritcality: GetDynamicValueDto = new GetDynamicValueDto();

    reviewPriority: GetDynamicValueDto[] = [];
    selectedreviewPriority: GetDynamicValueDto =new GetDynamicValueDto();

    exceptionStatus: GetDynamicValueDto[] = [];
    selectedExceptionStatus: GetDynamicValueDto = new GetDynamicValueDto();

    reviewStatus: GetDynamicValueDto[] = [];
    selectedReviewStatus: GetDynamicValueDto = new GetDynamicValueDto();

    expertReviewer: BusinessServiceOwner[] = [];
    selectedExpertReviewer: BusinessServiceOwner = new BusinessServiceOwner();

    remediation: RemediationDto[] = [];
    selectedRemediation: RemediationDto = new RemediationDto();

    citation: CitationDto[] = [];
    selectedCitation: CitationDto[] = [];

    compensating: CitationDto[] = [];
    selectedcompensating: CitationDto[] = [];

    auditingControls: CitationDto[] = [];
    selectedAuditingControls: CitationDto[] = [];

    sytemApplication: SytemApplicationDto[] = [];
    selectedSytemApplication: SytemApplicationDto = new SytemApplicationDto();

    policy: PolicyManagerDto[] = [];
    selectedpolicy: PolicyManagerDto = new PolicyManagerDto();

    assetInformation: AssetInformationListDto[] = [];
    selectedAssetInformation: AssetInformationListDto = new AssetInformationListDto();

    organization: GetOrganizationDto[] = [];
    selectedOrganization: GetOrganizationDto[]=[];

    company: GetOrganizationDto[] = [];
    selectedCompany: GetOrganizationDto = new GetOrganizationDto();

    businessUnit: BusinessUnitPrimaryDto[] = [];
    selectedBusinessUnit: BusinessUnitPrimaryDto[] = [];

    exceptionRequestor: BusinessServiceOwner[] = [];
    selectExceptionRequestor: BusinessServiceOwner = new BusinessServiceOwner();

    businessUnitRequested: BusinessUnitPrimaryDto[] = [];
    selectedBusinessUnitRequested: BusinessUnitPrimaryDto = new BusinessUnitPrimaryDto();

    types: GetDynamicValueDto[] = [];
    selectedTypes: GetDynamicValueDto = new GetDynamicValueDto();

    authorativeDocument: AuthorativeDocumentDto[] = [];
    selectedAuthorativeDocument: AuthorativeDocumentDto[] = [];

    constructor(_injector: Injector,
        injector: Injector,
        private _router: Router,
        private _exceptionServiceProxy: ExceptionServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _commonMultiDropdownService: MultiselectDropdownService,
        
    ) {
        super(_injector);
    }

    ngOnInit() {
        this._activatedRoute.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );
        if (this.recordId) {
            this.isEdit = true;
            this.getAllException(this.recordId);
        }
        else {
            this.isEdit = false;
            this.getAllException(this.recordId);
        }
    }
    
    getAllException(recordId)
    {
        this._exceptionServiceProxy.getAllException(recordId).subscribe(res => {
            this.exception = res;
            this.exceptionRequestor = res.employeesList;
            this.types = res.types;
            this.critcality = res.critcalitys;
            this.exceptionStatus = res.exceptionStatusList;
            this.reviewStatus = res.reviewStatusList;
            this.organization = res.companyLists;
            this.company = res.companyLists;
            this.businessUnitRequested = res.businessUnitOwners;
            this.businessUnit = res.businessUnitOwners;
            this.policy = res.policyManagers;
            this.assetInformation = res.assetInformations;
            this.sytemApplication = res.systemApplicationList;
            this.auditingControls = res.citationList;
            this.compensating = res.citationList;
            this.citation = res.citationList;
            this.remediation = res.remediationList;
            this.reviewPriority = res.reviewPrioritys;
            this.expertReviewer = res.employeesList;
            this.authorativeDocument = res.authoritativeSourceList
            this.exception.selectedExceptionAuditingControls = this.exception.selectedExceptionAuditingControls == undefined ? [] : this.exception.selectedExceptionAuditingControls;
            this.exception.selectedExceptionAuthoratativeDocuments = this.exception.selectedExceptionAuthoratativeDocuments == undefined ? [] : this.exception.selectedExceptionAuthoratativeDocuments;
            this.exception.selectedExceptionBusinessUnits = this.exception.selectedExceptionBusinessUnits == undefined ? [] : this.exception.selectedExceptionBusinessUnits;
            this.exception.selectedExceptionCitationLibrarys = this.exception.selectedExceptionCitationLibrarys == undefined ? [] : this.exception.selectedExceptionCitationLibrarys;
            this.exception.selectedExceptionCitations = this.exception.selectedExceptionCitations == undefined ? [] : this.exception.selectedExceptionCitations;
            this.exception.selectedExceptionDocuments = this.exception.selectedExceptionDocuments == undefined ? [] : this.exception.selectedExceptionDocuments;
            this.exception.selectedExceptionOrganizations = this.exception.selectedExceptionOrganizations == undefined ? [] : this.exception.selectedExceptionOrganizations;
            this.exception.selectedExceptionRemediations = this.exception.selectedExceptionRemediations == undefined ? [] : this.exception.selectedExceptionRemediations;
            this.exception.selectedExceptionRiskManagements = this.exception.selectedExceptionRiskManagements == undefined ? [] : this.exception.selectedExceptionRiskManagements;

            this.exception.removedExceptionAuditingControl = [];
            this.exception.removedExceptionAuthoratativeDocument = [];
            this.exception.removedExceptionBusinessUnit = [];
            this.exception.removedExceptionCitation = [];
            this.exception.removedExceptionCitationLibrary = [];
            this.exception.removedExceptionDocument = [];
            this.exception.removedExceptionOrganization = [];
            this.exception.removedExceptionRemediation = [];
            this.exception.removedExceptionRiskManagement = [];
            if (this.isEdit) {
                this.editall();
            }
        })
    }

    editall() {
        this.editExceptionRequestor();
        this.editexceptionstatus();
        this.editpriority();
        this.edittype();
        this.editpolicy();
        this.editbusinessUnitRequested();
        this.editcompanychange();
        this.editSystemApplication();
        this.editcritcality();
        this.editAssetInformation();
        this.editOraganization();
        this.editBusinessUnit();
        this.editCitationImpact();
        this.editAuthorativeDocument();
        this.editExpertreview();
    }

    compensatingChange(event)
    {

    }

    remediationChange(event)
    {
         
    }

    auditingControlChange(event)
    {

    }
    comapnyChange(event) {
        this.exception.lockThreatOrganizationId = event.value.id;
    }

    exceptionRequestorChange(event)
    {
        this.exception.employeeId = event.value.id;

    }

    businessUnitRequestedChange(event) {
        this.exception.businessUnitId = event.value.id;
    }
   
    exceptionStatusChange(event)
    {
        this.exception.exceptionStatusId = event.value.id;
    }
  
    critcalityChange(event) {
        this.exception.critcalityId = event.value.id;
    }

    priorityChange(event) {
        this.exception.reviewPriorityId = event.value.id;
    }
   
    typeChange(event) {
        this.exception.typeId = event.value.id;
    }

    organizationceChange(event)
    {
        this._commonMultiDropdownService.filterForExceptionMultipleSelect(this.exception.selectedExceptionOrganizations,
            this.selectedOrganization, this.exception.removedExceptionOrganization, "EXOrganization", this.isEdit).then((result: any) => {
                this.exception.selectedExceptionOrganizations = result.selectedItems;
                this.selectedOrganization = result.dropDownItems;
                this.exception.removedExceptionOrganization = result.removedItems;
            }).catch(exception => {

            });
    }

    assetinformationChange(event) {
        this.exception.assetInformationId = event.value.id;
    }

    systemApplicationNameChange(event) {
        this.exception.systemApplicationId = event.value.id;
    }

    policyChange(event) {
        this.exception.policyManagerId = event.value.id;
    }

    expertReviewerChange(event)
    {
        this.exception.expertReviewerId = event.value.id;
    }

    reviewStatusChange(event) {
        this.exception.reviewStatusId = event.value.id;
    }

    businessUnitsChange(event) {
        this._commonMultiDropdownService.filterForExceptionMultipleSelect(this.exception.selectedExceptionBusinessUnits,
            this.selectedBusinessUnit, this.exception.removedExceptionBusinessUnit, "EXBusinessUnit", this.isEdit).then((result: any) => {
                this.exception.selectedExceptionBusinessUnits = result.selectedItems;
                this.selectedBusinessUnit = result.dropDownItems;
                this.exception.removedExceptionBusinessUnit = result.removedItems;
            }).catch(exception => {

            });
    }

    authoratativeDocumentChange(event) {
        this._commonMultiDropdownService.filterForExceptionMultipleSelect(this.exception.selectedExceptionAuthoratativeDocuments,
            this.selectedAuthorativeDocument, this.exception.removedExceptionAuthoratativeDocument, "EXAuthoratativeDocument", this.isEdit).then((result: any) => {
                this.exception.selectedExceptionOrganizations = result.selectedItems;
                this.selectedAuthorativeDocument = result.dropDownItems;
                this.exception.removedExceptionAuthoratativeDocument = result.removedItems;
            }).catch(exception => {

            });
    }

    citationImpactedChange(event) {
        this._commonMultiDropdownService.filterForExceptionMultipleSelect(this.exception.selectedExceptionCitations,
            this.selectedCitation, this.exception.removedExceptionCitation, "EXCition", this.isEdit).then((result: any) => {
                this.exception.selectedExceptionCitations = result.selectedItems;
                this.selectedCitation = result.dropDownItems;
                this.exception.removedExceptionCitation = result.removedItems;
            }).catch(exception => {

            });
    }

    //edit

    editExceptionRequestor() {
        this.selectExceptionRequestor = null;
        this.exceptionRequestor.forEach(obj => {
            if (obj.id == this.exception.employeeId) {
                this.selectExceptionRequestor = obj;
            }
        })
    }

    editExpertreview() {
        this.selectedExpertReviewer = null;
        this.expertReviewer.forEach(obj => {
            if (obj.id == this.exception.expertReviewerId) {
                this.selectedExpertReviewer = obj;
            }
        })
    }

    editexceptionstatus() {
        this.selectedExceptionStatus = null;
        this.exceptionStatus.forEach(obj => {
            if (obj.id == this.exception.exceptionStatusId) {
                this.selectedExceptionStatus = obj;
            }
        })
    }

    editpriority() {
        this.selectedreviewPriority = null;
        this.reviewPriority.forEach(obj => {
            if (obj.id == this.exception.reviewPriorityId) {
                this.selectedreviewPriority = obj;
            }
        })
    }

    edittype() {
        this.selectedTypes = null;
        this.types.forEach(obj => {
            if (obj.id == this.exception.typeId) {
                this.selectedTypes = obj;
            }
        })
    }

    editpolicy() {
        this.selectedpolicy = null;
        this.policy.forEach(obj => {
            if (obj.id == this.exception.policyManagerId) {
                this.selectedpolicy = obj;
            }
        })
    }

    editbusinessUnitRequested() {
        this.selectedBusinessUnitRequested = null;
        this.businessUnitRequested.forEach(obj => {
            if (obj.id == this.exception.businessUnitId) {
                this.selectedBusinessUnitRequested = obj;
            }
        })
    }

    editcompanychange() {
        this.selectedCompany = null;
        this.company.forEach(obj => {
            if (obj.id == this.exception.lockThreatOrganizationId) {
                this.selectedCompany = obj;
            }
        })
    }

    editSystemApplication() {
        this.selectedSytemApplication = null;
        this.sytemApplication.forEach(obj => {
            if (obj.id == this.exception.systemApplicationId) {
                this.selectedSytemApplication = obj;
            }
        })
    }

    editcritcality() {
        this.selectedcritcality = null;
        this.critcality.forEach(obj => {
            if (obj.id == this.exception.critcalityId) {
                this.selectedcritcality = obj;
            }
        })
    }

    editAssetInformation() {
        this.selectedAssetInformation = null;
        this.assetInformation.forEach(obj => {
            if (obj.id == this.exception.assetInformationId) {
                this.selectedAssetInformation = obj;
            }
        })
    }

    editOraganization() {
        this.selectedOrganization = [];
        this.exception.selectedExceptionOrganizations.forEach(obj => {
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

    editBusinessUnit()
    {
        this.selectedBusinessUnit = [];
        this.exception.selectedExceptionBusinessUnits.forEach(obj => {
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

    editCitationImpact() {
        this.selectedCitation = [];
       
        this.exception.selectedExceptionCitations.forEach(obj => {
            this.citation.forEach(team => {
                if (obj.citationId == team.id) {
                    var temp = new CitationDto();
                    temp.id = team.id;
                    temp.citationTitle = team.citationTitle;
                    this.selectedCitation.push(temp);
                }
            });
        });  
    }

    editAuthorativeDocument() {
        this.selectedAuthorativeDocument = [];
        this.exception.selectedExceptionAuthoratativeDocuments.forEach(obj => {
            this.authorativeDocument.forEach(team => {
                if (obj.authoratativeDocumentId == team.id) {
                    var temp = new AuthorativeDocumentDto();
                    temp.id = team.id;
                    temp.authoratativeDocumentTitle = team.authoratativeDocumentTitle;                   
                    this.selectedAuthorativeDocument.push(temp);
                }
            });
        });  
    }

    addEditException()
    {
        this._exceptionServiceProxy.createOrUpdateException(this.exception).subscribe(res => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            }
            else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/all-exception']);
        });
    }

    showDialog() {
        this.display = true;
    }

    goBack() {
        this._router.navigate(['/app/main/all-exception']);
    }
}
