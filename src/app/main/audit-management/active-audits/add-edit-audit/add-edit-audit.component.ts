import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { MultiselectDropdownService } from 'app/shared/common/component/common-services/multiselect-dropdown-service.service';
import { AuditServiceProxy, AuditDto, AuditType, CountryDto, SytemApplicationDto, VendorListDto, FindingDetailsDto, FacilitieDatacenterListDto, BusinessProcessDetailDto, BusinessServiceSDto, BusinessUnitPrimaryDto, ProjectListDetailsDto, BusinessServiceOwner, BusinessServiceDto, ITServiceServiceProxy, GetOrganizationDto, GetDynamicValueDto } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'add-edit-audit',
    templateUrl: './add-edit-audit.component.html', 
    styleUrls: ['./add-edit-audit.component.scss']
})
export class AddEditAuditComponent extends AppComponentBase implements OnInit { 

    creationDateRange: Date;
    basicInfo: boolean;
    advanced: boolean;
    dayDropdown: boolean;

    auditdetail: AuditDto = new AuditDto(); 

    year: GetDynamicValueDto[] = [];
    selectedYear: GetDynamicValueDto = new GetDynamicValueDto(); 

    status: GetDynamicValueDto[] = [];
    selectedStaus = new GetDynamicValueDto();

    country: CountryDto[] = [];
    selectedCountry: CountryDto = new CountryDto();

    auditArea: GetDynamicValueDto[] = [];
    selectedAuditArea: GetDynamicValueDto = new GetDynamicValueDto();

    leadAuditor: BusinessServiceOwner[] = [];
    selectedLeadAuditor: BusinessServiceOwner = new BusinessServiceOwner();

    auditContact: BusinessServiceOwner[] = [];
    selectedAuditContact: BusinessServiceOwner = new BusinessServiceOwner();

    auditServicesProvider: VendorListDto[] = [];
    selectedauditServicesProvider: VendorListDto = new VendorListDto();

    project: ProjectListDetailsDto[] = [];
    selectedProject: ProjectListDetailsDto = new ProjectListDetailsDto();

    organization: GetOrganizationDto[] = [];
    selectedOrganization: GetOrganizationDto = new GetOrganizationDto();

    businessUnitOwner: BusinessUnitPrimaryDto[] = [];
    selectedbusinessUnitOwner: BusinessUnitPrimaryDto = new BusinessUnitPrimaryDto();

    businessService: BusinessServiceSDto[] = [];
    selectedBusinessService: BusinessServiceSDto[] = [];

    businessProcess: BusinessProcessDetailDto[] = [];
    selectedbusinessProcess: BusinessProcessDetailDto[] = [];

    facilitiesDatacenter: FacilitieDatacenterListDto[] = [];
    selectedFacilitiesDatacenter: FacilitieDatacenterListDto[] = [];

    finding: FindingDetailsDto[] = [];
    selectedfinding: FindingDetailsDto[] = [];

    auditAuditor: BusinessServiceOwner[] = [];
    selectedauditAuditor: BusinessServiceOwner[] = [];

    auditees: BusinessServiceOwner[] = [];
    selectedAuditees: BusinessServiceOwner[] = [];

    systemApplication: SytemApplicationDto[] = [];
    selectedsystemApplication: SytemApplicationDto[] = [];

    vendors: VendorListDto[] = [];
    selectedVendor: VendorListDto[] = [];

    audittypeList: { id: number; name: string } [] = [];
    

    public upload: any[] = [{
            
    }];
    uploadedFiles: any[] = [];
    recordId: any;
    isEdit: boolean;
    oraganizationId: any;
    constructor(_injector: Injector,
        private _router: Router,
        injector: Injector,
        private _auditServiceProxy: AuditServiceProxy,
        private _activatedRoute: ActivatedRoute,       
        private _commonMultiDropdownService: MultiselectDropdownService
        
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.basicInfo = true;
        this.dayDropdown = false;
        this.getAuditType();
        this._activatedRoute.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );
        if (this.recordId) {
            this.isEdit = true;
            this.getAllAudit(this.recordId);


        } else {
            this.isEdit = false;
            this.getAllAudit(this.recordId);
        }
    }

    auditserviceProviderChange(event) {
        this.auditdetail.vendorId = event.value.id;
    }

    getAuditType()
    {
        this.audittypeList = [];
        for (var n in AuditType) {
            if (typeof AuditType[n] === 'number') {
                this.audittypeList.push({ id: <any>AuditType[n], name: n });
            }
        }

    }


    getAllAudit(recordId)
    {
        this._auditServiceProxy.getAllAuditInfoDetails(recordId).subscribe(result => {
            
            this.auditdetail = result;
            this.year = result.finacialYearList;
            this.status = result.statusList;
            this.leadAuditor = result.leadAuditorList;
            this.auditees = result.leadAuditorList;
            this.auditAuditor = result.leadAuditorList;
            this.businessService = result.businessServices;
            this.businessProcess = result.businessProcess;
            this.vendors = result.vendorList;
            this.auditServicesProvider = result.vendorList;            
            this.organization = result.lockThreatOrganizationList;
            this.systemApplication = result.systemAplicationList;           
            this.project = result.projectList;
            this.auditContact = result.auditContactList;
           // this.businessUnitOwner = result.relatedBsinessList;
            this.finding = result.findingList;
            this.auditArea = result.auditAreaList;
            this.country = result.countries;
            this.facilitiesDatacenter = result.facilitiesDatacenterList;
           

            this.auditdetail.selectedAuditAuditors = this.auditdetail.selectedAuditAuditors == undefined ? [] : this.auditdetail.selectedAuditAuditors;
            this.auditdetail.selectedAuditBusinessProcess = this.auditdetail.selectedAuditBusinessProcess == undefined ? [] : this.auditdetail.selectedAuditBusinessProcess;
            this.auditdetail.selectedAuditBusinessServices = this.auditdetail.selectedAuditBusinessServices == undefined ? [] : this.auditdetail.selectedAuditBusinessServices;
            this.auditdetail.selectedAuditFacilitieDatacenters = this.auditdetail.selectedAuditFacilitieDatacenters == undefined ? [] : this.auditdetail.selectedAuditFacilitieDatacenters;
            this.auditdetail.selectedAuditFindings = this.auditdetail.selectedAuditFindings == undefined ? [] : this.auditdetail.selectedAuditFindings;
            this.auditdetail.selectedAuditTeams = this.auditdetail.selectedAuditTeams == undefined ? [] : this.auditdetail.selectedAuditTeams;
            this.auditdetail.selectedAuditVendors = this.auditdetail.selectedAuditVendors == undefined ? [] : this.auditdetail.selectedAuditVendors;
            this.auditdetail.selectedAuditSystemApplications = this.auditdetail.selectedAuditSystemApplications == undefined ? [] : this.auditdetail.selectedAuditSystemApplications;
            this.auditdetail.removedAuditAuditors = [];
            this.auditdetail.removedAuditBusinessProcess = [];
            this.auditdetail.removedAuditBusinessServices = [];
            this.auditdetail.removedAuditFacilitieDatacenters = [];
            this.auditdetail.removedAuditFindings = [];
            this.auditdetail.removedAuditTeams = [];
            this.auditdetail.removedAuditVendors = [];
            this.auditdetail.removedAuditSystemApplications = [];

            if (this.isEdit)
            {
                this.editAllAudit();
            }
            
        })
    }

    editAllAudit()
    {
        this.pushBusinessOwner();
        this.editleadAuditor();
        this.editAuditArea();    
        this.editAuditContact();       
        this.editAuditServicesProvider();
        this.editBusinessProcess();
        this.editBusinessservice();
        this.editBusinessUnit();
        this.editCountry();
        this.editfinding();
        this.editfacilityDatacenter();
        this.editOrganization();
        this.editVendor();
        this.editAuditees();
        this.editAuditAuditor();
        this.editSystemApplication();
        this.editYear();
        this.editproject();

    }

    auditTypeSelect(event: any, type: any)
    {        
        this.auditdetail.auditTypes = type;        
    }


    pushBusinessOwner() {
        this.businessUnitOwner = [];
        this.auditdetail.relatedBsinessList.forEach(obj => {
            if (obj.lockThreatOrganizationId == this.auditdetail.lockThreatOrganizationId) {
                this.businessUnitOwner.push(obj);
            }
        })
    }


    projectChange(event)
    {
        this.auditdetail.projectNameId = event.value.id;
    }

    organizationChange(event)
    {
        this.auditdetail.lockThreatOrganizationId = event.value.id;
        this.businessUnitOwner = [];
        this.selectedbusinessUnitOwner = null;      
        this.auditdetail.relatedBsinessId = null;
        this.auditdetail.relatedBsinessList.forEach(obj => {
            if (obj.lockThreatOrganizationId == event.value.id) {
                this.businessUnitOwner.push(obj);
            }
        })
    }

    fanacialYearChange(event) {
        this.auditdetail.finacialYearId = event.value.id;
    }

    auditAreaChange(event)
    {
        this.auditdetail.auditAreaId = event.value.id;
    }

    countryChange(event)
    {
        this.auditdetail.countryId = event.value.id;
    }

    auditorChange(event) {
        this.auditdetail.leadAuditorId = event.value.id;
    }

    auditcontactChange(event) {
        this.auditdetail.auditContactId = event.value.id;
    }

    businessunitChange(event)
    {
        this.auditdetail.relatedBsinessId = event.value.id;
    }

    statusChange(event) {
        this.auditdetail.statusId = event.value.id;
    }

    editYear()
    {
        this.selectedYear = null;
        this.year.forEach(obj => {
            if (obj.id == this.auditdetail.finacialYearId) {
                this.selectedYear = obj;
            }
        })

    }

    editStatus()
    {
        this.selectedStaus = null;
        this.status.forEach(obj => {
            if (obj.id == this.auditdetail.statusId) {
                this.selectedStaus = obj;
            }
        })

    }

    editCountry() {
        this.selectedCountry = null;
        this.country.forEach(obj => {
            if (obj.id == this.auditdetail.countryId) {
                this.selectedCountry = obj;
            }
        })
    }

    editAuditArea() {
        this.selectedAuditArea = null;
        this.auditArea.forEach(obj => {
            if (obj.id == this.auditdetail.auditAreaId) {
                this.selectedAuditArea = obj;
            }
        })
    }

    editleadAuditor() {
        this.selectedLeadAuditor = null;
        this.leadAuditor.forEach(obj => {
            if (obj.id == this.auditdetail.leadAuditorId) {
                this.selectedLeadAuditor = obj;
            }
        })
    }

    editAuditServicesProvider() {
        this.selectedauditServicesProvider = null;
        this.auditServicesProvider.forEach(obj => {
            if (obj.id == this.auditdetail.vendorId) {
                this.selectedauditServicesProvider = obj;
            }
        })
    }

    editAuditContact() {
        this.selectedAuditContact = null;
        this.leadAuditor.forEach(obj => {
            if (obj.id == this.auditdetail.auditContactId) {
                this.selectedAuditContact = obj;
            }
        })
    }

    editproject()
    {
        debugger
        this.selectedProject = null;
        this.project.forEach(obj => {
            if (obj.id == this.auditdetail.projectNameId) {
                this.selectedProject = obj;
            }
        })
    }

    editOrganization() {
        this.selectedOrganization = null;
        this.organization.forEach(obj => {
            if (obj.id == this.auditdetail.lockThreatOrganizationId) {
                this.selectedOrganization = obj;
            }
        })
    }

    editBusinessUnit() {
        this.selectedbusinessUnitOwner = null;
        this.businessUnitOwner.forEach(obj => {
            if (obj.id == this.auditdetail.relatedBsinessId) {
                this.selectedbusinessUnitOwner = obj;
            }
        })
        
    }

    editBusinessProcess() {
        this.selectedbusinessProcess = [];
        this.auditdetail.selectedAuditBusinessProcess.forEach(obj => {
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
        this.auditdetail.selectedAuditBusinessServices.forEach(obj => {
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

    editVendor() {
        this.selectedVendor = [];
        this.auditdetail.selectedAuditVendors.forEach(obj => {
            this.vendors.forEach(team => {
                if (obj.vendorId == team.id) {
                    var temp = new VendorListDto();
                    temp.id = team.id;
                    temp.vendorName = team.vendorName;
                    this.selectedVendor.push(temp);
                }
            });
        });
    }

    editSystemApplication() {
        this.selectedsystemApplication = [];
        this.auditdetail.selectedAuditSystemApplications.forEach(obj => {
            this.systemApplication.forEach(team => {
                if (obj.systemApplicationId == team.id) {
                    var temp = new SytemApplicationDto();
                    temp.id = team.id;
                    temp.systemApplicationName = team.systemApplicationName;
                    this.selectedsystemApplication.push(temp);
                }
            });
        });
    }

    editfacilityDatacenter() {
        this.selectedFacilitiesDatacenter = [];
        this.auditdetail.selectedAuditFacilitieDatacenters.forEach(obj => {
            this.facilitiesDatacenter.forEach(team => {
                if (obj.facilitieDatacenterId == team.id) {
                    var temp = new FacilitieDatacenterListDto();
                    temp.id = team.id;
                    temp.facilityName = team.facilityName;
                    this.selectedFacilitiesDatacenter.push(temp);
                }
            });
        });
    }

    editAuditAuditor() {
        this.selectedauditAuditor = [];        
        this.auditdetail.selectedAuditAuditors.forEach(obj => {
            this.auditAuditor.forEach(team => {
                if (obj.employeeId == team.id) {
                    var temp = new BusinessServiceOwner();
                    temp.id = team.id;
                    temp.organizationId = team.organizationId;
                    temp.employeeName = team.employeeName;
                    this.selectedauditAuditor.push(temp);
                }
            });
        });
    }

    editAuditees() {
        
        this.selectedAuditees = [];       
        this.auditdetail.selectedAuditTeams.forEach(obj => {
            this.auditees.forEach(team => {
                if (obj.employeeId == team.id) {
                    
                    var temp = new BusinessServiceOwner();
                    temp.id = team.id;
                    temp.organizationId = team.organizationId;
                    temp.employeeName = team.employeeName;
                    this.selectedAuditees.push(temp);
                }
            });
        });
    }

    editfinding()
    {
        this.selectedfinding = [];
        this.auditdetail.selectedAuditFindings.forEach(obj => {
            this.finding.forEach(team => {
                if (obj.findingId == team.id) {
                    var temp = new FindingDetailsDto();
                    temp.id = team.id;
                    temp.findingTitle = team.findingTitle;
                    this.selectedfinding.push(temp);
                }
            });
        });
    }

    findingChange(event) {

    }

    businessServiceChange() {
        this._commonMultiDropdownService.filterForAuditMultipleSelect(this.auditdetail.selectedAuditBusinessServices,
            this.selectedBusinessService, this.auditdetail.removedAuditBusinessServices, "ABusinessService", this.isEdit).then((result: any) => {
                this.auditdetail.selectedAuditBusinessServices = result.selectedItems;
                this.selectedBusinessService = result.dropDownItems;
                this.auditdetail.removedAuditBusinessServices = result.removedItems;
            }).catch(exception => {

            });
    }

    businessProcessChange() {
        this._commonMultiDropdownService.filterForAuditMultipleSelect(this.auditdetail.selectedAuditBusinessProcess,
            this.selectedbusinessProcess, this.auditdetail.removedAuditBusinessProcess, "ABusinessProcess", this.isEdit).then((result: any) => {
                this.auditdetail.selectedAuditBusinessProcess = result.selectedItems;
                this.selectedbusinessProcess = result.dropDownItems;
                this.auditdetail.removedAuditBusinessProcess = result.removedItems;
            }).catch(exception => {

            });
    }

    vendorNameChange() {
        this._commonMultiDropdownService.filterForAuditMultipleSelect(this.auditdetail.selectedAuditVendors,
            this.selectedVendor, this.auditdetail.removedAuditVendors, "AVendor", this.isEdit).then((result: any) => {
                this.auditdetail.selectedAuditVendors = result.selectedItems;
                this.selectedVendor = result.dropDownItems;
                this.auditdetail.removedAuditVendors = result.removedItems;
            }).catch(exception => {

            });
    }

    systemApplicationChange() {
        
        this._commonMultiDropdownService.filterForAuditMultipleSelect(this.auditdetail.selectedAuditSystemApplications,
            this.selectedsystemApplication, this.auditdetail.removedAuditSystemApplications, "ASystemApplication", this.isEdit).then((result: any) => {
                
                this.auditdetail.selectedAuditSystemApplications = result.selectedItems;
                this.selectedsystemApplication = result.dropDownItems;
                this.auditdetail.removedAuditSystemApplications = result.removedItems;
            }).catch(exception => {

            });
    }

    facilityDatacenterChange() {
        this._commonMultiDropdownService.filterForAuditMultipleSelect(this.auditdetail.selectedAuditFacilitieDatacenters,
            this.selectedFacilitiesDatacenter, this.auditdetail.removedAuditFacilitieDatacenters, "AFacilities", this.isEdit).then((result: any) => {
                this.auditdetail.selectedAuditFacilitieDatacenters = result.selectedItems;
                this.selectedFacilitiesDatacenter = result.dropDownItems;
                this.auditdetail.removedAuditFacilitieDatacenters = result.removedItems;
            }).catch(exception => {

            });
    }

    auditAuditorChange() {
        this._commonMultiDropdownService.filterForAuditMultipleSelect(this.auditdetail.selectedAuditAuditors,
            this.selectedauditAuditor, this.auditdetail.removedAuditAuditors, "AAuditor", this.isEdit).then((result: any) => {
                this.auditdetail.selectedAuditAuditors = result.selectedItems;
                this.selectedauditAuditor = result.dropDownItems;
                this.auditdetail.removedAuditAuditors = result.removedItems;
            }).catch(exception => {

            });
    }

    auditeesChange() {
        this._commonMultiDropdownService.filterForAuditMultipleSelect(this.auditdetail.selectedAuditTeams,
            this.selectedAuditees, this.auditdetail.removedAuditTeams, "AAuditTeam", this.isEdit).then((result: any) => {
                this.auditdetail.selectedAuditTeams = result.selectedItems;
                this.selectedAuditees = result.dropDownItems;
                this.auditdetail.removedAuditTeams = result.removedItems;
            }).catch(exception => {

            });
    }

    addUploadField() {
        this.upload.push({
            uploadField: '',     
        });
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        //this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }

    selectView(e) {
        if (e =='BasicInfo') {
            this.basicInfo = true;
            this.advanced = false;
        }
        if (e == 'Advanced') {
            this.advanced = true;
            this.basicInfo = false;
        }
    }

    selectFrequency(e) {
        if (e == 'oneTime') {
            this.dayDropdown = false;            
        }
        if (e == 'daily') {
            this.dayDropdown = false;          
        }
        if (e == 'periodic') {
            this.dayDropdown = true;          
        }
    }

    goBack() {
        this._router.navigate(['/app/main/active-audits']);
    }

    Save()
    {
        this._auditServiceProxy.createOrUpdateAudit(this.auditdetail).subscribe(res => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            }
            else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/active-audits']);
        });
    }

}
