import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';

import { ProjectServiceProxy, GetOrganizationDto, ProjectDto, ProjectTeamMemberExternalDto, ProjectComponentsDto, ProjectAuthoratativeDocumentDto, ProjectTeamMemberInternalDto, ProjectTeamMemberDto, ProjectCountriesDto, AuthoratativeDocumentsDto, ProjectUser, CountryDto, DynamicNameValueDto, ProgramDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';
@Component({
    selector: 'add-edit-my-projects',
    templateUrl: './add-edit-my-projects.component.html',
    styleUrls: ['./add-edit-my-projects.component.scss']
})
export class AddEditMyProjectsComponent extends AppComponentBase implements OnInit {

    text: any;
    recordId: any;
    isEdit: boolean;
    project = new ProjectDto();
    accept: any;
    company: GetOrganizationDto[] = [];
    selectedCompany: GetOrganizationDto = new GetOrganizationDto();
    projectlogo: any;

    industrysector: DynamicNameValueDto[] = [];
    selectIndustrSector: DynamicNameValueDto = new DynamicNameValueDto();

    projectComponents: DynamicNameValueDto[] = [];
    selectedprojectComponents: DynamicNameValueDto[] = [];

    projectSponsors: ProjectUser[] = [];
    selectedProjectSponsors: ProjectUser = new ProjectUser();

    parentprogram: ProgramDto[] = [];
    selectedParentProgram: ProgramDto = new ProgramDto();

    country: CountryDto[] = [];
    selectedCountry: CountryDto[] = [];

    projectTeamMembersExternal: ProjectUser[] = [];
    selectedprojectTeamMembersExternal: ProjectUser[] = [];

    projectTeamMembersInternal: ProjectUser[] = [];
    selectedprojectTeamMembersInternal: ProjectUser[] = [];

    projectTeamMembers: ProjectUser[] = [];
    selectedprojectTeamMembers: ProjectUser[] = [];

    projectDirectors: ProjectUser[] = [];
    selectedprojectDirectors: ProjectUser = new ProjectUser();

    authoratativeDocuments: AuthoratativeDocumentsDto[] = [];
    selectedAuthoratativeDocuments: AuthoratativeDocumentsDto[] = [];

    constructor(
        injector: Injector,
        private _router: Router,
        private _programAppService: ProjectServiceProxy,
        private _activatedRoute: ActivatedRoute, private _commonMultiDropdownService: MultiselectDropdownService
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
            this.getAllProject(this.recordId);
        } else {
            this.isEdit = false;
            this.getAllProject(this.recordId);
        }
    }

    companyChange(event) {
        this.project.lockThreatOrganizationId = event.value.id;
    }

    countryChange(event) {
        this._commonMultiDropdownService.filterProjectMultiselect(this.project.selectedCountries,
            this.selectedCountry, this.project.removedCountries, "Countries", this.isEdit).then((result: any) => {
                this.project.selectedCountries = result.selectedItems;
                this.selectedCountry = result.dropDownItems;
                this.project.removedCountries = result.removedItems;
            }).catch(exception => {

            });
    }

    programChange(event) {

        this.project.parentProgramId = event.value.id;
    }

    industryChange(event) {

        this.project.industryId = event.value.id;
    }

    sponsorChange(event) {

        this.project.projectSponsorId = event.value.id;

    }

    projectDirectorsChange(event) {

        this.project.projectDirectorId = event.value.id;
    }

    teamMembersChange(event) {
        this._commonMultiDropdownService.filterProjectMultiselect(this.project.selectedTeams,
            this.selectedprojectTeamMembers, this.project.removedTeams, "Team", this.isEdit).then((result: any) => {
                this.project.selectedTeams = result.selectedItems;
                this.selectedprojectTeamMembers = result.dropDownItems;
                this.project.removedTeams = result.removedItems;
            }).catch(exception => {

            });
    }

    teamMembersInternalChange(event) {
        this._commonMultiDropdownService.filterProjectMultiselect(this.project.selectedInternalTeams,
            this.selectedprojectTeamMembersInternal, this.project.removedInternalTeams, "InternalTeam", this.isEdit).then((result: any) => {
                this.project.selectedInternalTeams = result.selectedItems;
                this.selectedprojectTeamMembersInternal = result.dropDownItems;
                this.project.removedInternalTeams = result.removedItems;
            }).catch(exception => {

            });
    }

    teamMembersExternalChange(event) {
        this._commonMultiDropdownService.filterProjectMultiselect(this.project.selectedExternalTeams,
            this.selectedprojectTeamMembersExternal, this.project.removedExternalTeams, "ExternalTeam", this.isEdit).then((result: any) => {
                this.project.selectedExternalTeams = result.selectedItems;
                this.selectedprojectTeamMembersExternal = result.dropDownItems;
                this.project.removedExternalTeams = result.removedItems;
            }).catch(exception => {

            });
    }

    authoratativeDocumentsChange(event) {
        this._commonMultiDropdownService.filterProjectMultiselect(this.project.selectedAuthProjDocuments,
            this.selectedAuthoratativeDocuments, this.project.removedAuthProjDocuments, "AuthDoc", this.isEdit).then((result: any) => {
                this.project.selectedAuthProjDocuments = result.selectedItems;
                this.selectedAuthoratativeDocuments = result.dropDownItems;
                this.project.removedAuthProjDocuments = result.removedItems;
            }).catch(exception => {

            });
    }

    projectComponentsChange(event) {
        this._commonMultiDropdownService.filterProjectMultiselect(this.project.selectedProjectComponents,
            this.selectedprojectComponents, this.project.removedProjectComponents, "Projectcomponent", this.isEdit).then((result: any) => {
                this.project.selectedProjectComponents = result.selectedItems;
                this.selectedprojectComponents = result.dropDownItems;
                this.project.removedProjectComponents = result.removedItems;
            }).catch(exception => {

            });
    }

    getAllProject(organizatonId)
    {
        this._programAppService.getProjectInfo(organizatonId).subscribe(result =>
        {
            this.project = result;
            this.projectlogo = result.projectLogo;
            this.company = result.companyLists;
            this.industrysector = result.projectIndustries;
            this.projectSponsors = result.projectSponsors;
            this.parentprogram = result.parentProgramsList;
            this.country = result.countries;
            this.projectTeamMembersExternal = result.projectTeamMembersExternal;
            this.projectTeamMembersInternal = result.projectTeamMembersInternal;
            this.projectTeamMembers = result.projectTeamMembers;
            this.projectDirectors = result.projectDirectors;
            this.authoratativeDocuments = result.authoratativeDocuments;
            this.projectComponents = result.projectComponents;
            this.project.selectedTeams = this.project.selectedTeams == undefined ? [] : this.project.selectedTeams;
            this.project.selectedExternalTeams = this.project.selectedExternalTeams == undefined ? [] : this.project.selectedExternalTeams;
            this.project.selectedInternalTeams = this.project.selectedInternalTeams == undefined ? [] : this.project.selectedInternalTeams;
            this.project.selectedCountries = this.project.selectedCountries == undefined ? [] : this.project.selectedCountries;
            this.project.selectedAuthProjDocuments = this.project.selectedAuthProjDocuments == undefined ? [] : this.project.selectedAuthProjDocuments;
            this.project.selectedProjectComponents = this.project.selectedProjectComponents == undefined ? [] : this.project.selectedProjectComponents;
            if (this.isEdit)
            {
                this.editProjectCountry();
                this.editProjectExtrnalTeamMember();
                this.editProjectInternalTeamMember();
                this.editProjectTeamMember();
                this.editProjectAuthoratativeDocuments();
                this.editProjectComponents();
                this.editProjectSponsor();
                this.editProjectDirector();
                this.editCompanyName();
                this.editIndustroySector();
                this.editParentProgram();
            }            
            this.project.removedTeams = [];
            this.project.removedProjectComponents = [];
            this.project.removedExternalTeams = [];
            this.project.removedInternalTeams = [];
            this.project.removedCountries = [];
            this.project.removedAuthProjDocuments = [];
        });
    }

    editProjectCountry() {
        this.selectedCountry = [];
        this.project.selectedCountries.forEach(obj => {
            this.country.forEach(team => {
                if (obj.countryId == team.id) {
                    var temp = new CountryDto();
                    temp.id = team.id;
                    temp.name = team.name;
                    this.selectedCountry.push(temp);
                }
            });
        });
    }

    editProjectExtrnalTeamMember() {
        this.selectedprojectTeamMembersExternal = [];
        this.project.selectedExternalTeams.forEach(obj => {
            this.projectTeamMembersExternal.forEach(team => {
                if (obj.teamMembersExternalId == team.id) {
                    var temp = new ProjectUser();
                    temp.id = team.id;
                    temp.employeeName = team.employeeName;
                    temp.organizationId = team.organizationId;
                    this.selectedprojectTeamMembersExternal.push(temp);
                }
            });
        });
    }

    editProjectInternalTeamMember() {
        this.selectedprojectTeamMembersInternal = [];
        this.project.selectedInternalTeams.forEach(obj => {
            this.projectTeamMembersExternal.forEach(team => {
                if (obj.teamMembersInternalId == team.id) {
                    var temp = new ProjectUser();
                    temp.id = team.id;
                    temp.employeeName = team.employeeName;
                    temp.organizationId = team.organizationId;
                    this.selectedprojectTeamMembersInternal.push(temp);
                }
            });
        });
    }

    editProjectTeamMember() {


        this.selectedprojectTeamMembers = [];
        this.project.selectedTeams.forEach(obj => {
            this.projectTeamMembers.forEach(team => {
                if (obj.teamMembersId == team.id) {
                    var temp = new ProjectUser();
                    temp.id = team.id;
                    temp.employeeName = team.employeeName;
                    temp.organizationId = team.organizationId;
                    this.selectedprojectTeamMembers.push(temp);
                }
            });
        });

    }

    editProjectAuthoratativeDocuments() {
        this.selectedAuthoratativeDocuments = [];
        this.project.selectedAuthProjDocuments.forEach(obj => {
            this.authoratativeDocuments.forEach(team => {
                if (obj.authoratativeDocumentId == team.id) {
                    var temp = new AuthoratativeDocumentsDto();
                    temp.id = team.id;
                    temp.authoratativeDocumentTitle = team.authoratativeDocumentTitle;
                    this.selectedAuthoratativeDocuments.push(temp);
                }
            });
        });
    }

    editProjectComponents() {
        this.selectedprojectComponents = [];
        this.project.selectedProjectComponents.forEach(obj => {
            this.projectComponents.forEach(team => {
                if (obj.projectComponentId == team.id) {
                    var temp = new DynamicNameValueDto();
                    temp.id = team.id;
                    temp.name = team.name;
                    this.selectedprojectComponents.push(temp);
                }
            });
        });
    }

    editProjectSponsor() {
        this.projectSponsors.forEach(obj => {
            if (obj.id == this.project.projectSponsorId) {
                this.selectedProjectSponsors = obj;
            }
        })
    }

    editProjectDirector() {
        this.projectDirectors.forEach(obj => {
            if (obj.id == this.project.projectDirectorId) {
                this.selectedprojectDirectors = obj;
            }
        })
    }

    editCompanyName() {

        this.company.forEach(obj => {
            if (obj.id == this.project.lockThreatOrganizationId) {
                this.selectedCompany = obj;

            }
        })
    }

    editIndustroySector() {
        this.industrysector.forEach(obj => {
            if (obj.id == this.project.industryId) {
                this.selectIndustrSector = obj;

            }
        })
    }

    editParentProgram() {

        this.parentprogram.forEach(obj => {
            if (obj.id == this.project.parentProgramId) {
                this.selectedParentProgram = obj;
            }
        })

    }

    saveProject() {

        this._programAppService.addorEditProject(this.project).subscribe(result => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/project-management-dashboard']);
        })
    }

    fileimageUpload() {
        const filePanCardUpload = document.getElementById('fileimageUpload') as HTMLInputElement;
        filePanCardUpload.onchange = () => {

            var size = (filePanCardUpload.files[0].size / 1024).toFixed(2);
            var Checksizes = parseInt(size);
            if (Checksizes <= (200)) {
                for (let index = 0; index < filePanCardUpload.files.length; index++) {
                    var reader = new FileReader();
                    reader.onload = (e: any) => {
                        this.projectlogo = e.target.result;
                        this.project.projectLogo = e.target.result;
                    }
                    reader.readAsDataURL(filePanCardUpload.files[index]);
                }
            }
            else {
                this.message.info("Please select Image below 200 KB");
            }
        };
        filePanCardUpload.click();
    }
}
