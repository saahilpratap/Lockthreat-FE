import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, OrganizationUnitDto, GetOrganizationDto, ProgramCountriesDto, ProgramUser, ProgramTeamDto, ProgramAuthoritativeDocumentsDto, ProgramCoordinatorDto, AuthoratativeDocumentsDto, CountryDto, CountriesAppserviceServiceProxy, OrganizationSetupServiceProxy, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy, ProgramDto, ProgramServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItemGroup, SelectItem } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';
import { number } from 'prop-types';


@Component({
    selector: 'add-edit-my-programs',
    templateUrl: './add-edit-my-programs.component.html',
    styleUrls: ['./add-edit-my-programs.component.scss']
})
export class AddEditMyProgramsComponent extends AppComponentBase implements OnInit {

    creationDateRange: Date;
    text: any;
    programId: number;
    program = new ProgramDto();
    item: string;
    employees: SelectItem[];
    company: GetOrganizationDto[];

    selectedcompany: GetOrganizationDto = new GetOrganizationDto();
    employeesGroup: SelectItemGroup[];

    programSponsors: ProgramUser[] = [];
    selectedprogramSponsors: ProgramUser = new ProgramUser();

    programTeam: ProgramUser[] = [];
    SelectedProgramTeam: ProgramUser[] = [];

    //  selectedprogramTeams: ProgramTeamDto[];

    selectdProgramUser: ProgramUser[] = [];

    programCordinator: ProgramUser[] = [];
    selectedprogramCordinator: ProgramUser[] = [];


    programDirector: ProgramUser[] = [];
    selectedProgramDirector: ProgramUser = new ProgramUser();

    authorativeDocument: AuthoratativeDocumentsDto[] = [];
    selectedauthorativeDocument: AuthoratativeDocumentsDto[] = [];

    recordId: any;
    isEdit: boolean;

    country: CountryDto[] = [];

    selectedCountry: CountryDto[] = []
    filePan: any;

    logoUpload: any;
    accept = 'image/*';
    filename: string;

    constructor(_injector: Injector,
        private _programAppService: ProgramServiceProxy,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _organizationServiceProxy: OrganizationSetupServiceProxy,
        private _dynamiserviceProxies: CountriesAppserviceServiceProxy,
        private _commonMultiDropdownService: MultiselectDropdownService,
        public _DomSanitizationService: DomSanitizer,
    ) {
        super(_injector);
        this.programId = this._activatedRoute.snapshot.queryParams['programId'] || '';
    }

    ngOnInit() {

        this._activatedRoute.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );

        if (this.recordId) {

            this.isEdit = true;
            this.getAllProgram(this.recordId);


        } else {
            this.isEdit = false;
            this.getAllProgram(this.recordId);
        }
    }

    companyChange(event) {
        if (event.value.id != 0) {
            this.program.lockThreatOrganizationId = event.value.id;

            this.programSponsors = [];

            this.programDirector = [];
            this.program.programSponsors.forEach(obj => {
                if (obj.organizationId == this.program.lockThreatOrganizationId) {
                    this.programSponsors.push(obj);

                }
            });
            this.program.programDirectors.forEach(obj => {
                if (obj.organizationId == this.program.lockThreatOrganizationId) {
                    this.programDirector.push(obj);

                }
            })
        }
    }

    programsponser(event) {

        this.program.programSponsorId = event.value.id;
    }

    programDirectorChange(event) {
        this.program.programDirectorId = event.value.id;
    }

    countryOnchange(event) {
        this._commonMultiDropdownService.filterProgramMultiselect(this.program.selectedCountries, this.selectedCountry,
            this.program.removedCountries, "Countries", this.isEdit).then((result: any) => {
                this.program.selectedCountries = result.selectedItems;
                this.selectedCountry = result.dropDownItems;
                this.program.removedCountries = result.removedItems;
            }).catch(exception => {

            });
    }

    programteamChange(event) {
        
        this._commonMultiDropdownService.filterProgramMultiselect(this.program.selectedProgramTeams, this.SelectedProgramTeam,
            this.program.removedProgramTeams, "Team", this.isEdit).then((result: any) => {
                debugger
                this.program.selectedProgramTeams = result.selectedItems;
                this.SelectedProgramTeam = result.dropDownItems;
                this.program.removedProgramTeams = result.removedItems;
            }).catch(exception => {

            });
    }

    programCordinators(event) {
        
        this._commonMultiDropdownService.filterProgramMultiselect(this.program.selectedProgramCoordinators, this.selectedprogramCordinator,
            this.program.removedProgramCoordinators, "Coordinator", this.isEdit).then((result: any) => {
                debugger
                this.program.selectedProgramCoordinators = result.selectedItems;
                this.selectedprogramCordinator = result.dropDownItems;
                this.program.removedProgramCoordinators = result.removedItems;
            }).catch(exception => {

            });
    }

    getAllProgram(recordId) {

        this._programAppService.getProgramInfo(recordId).subscribe(result => {
            this.program = result; 
            this.logoUpload  = result.programLogo; 
            this.program.selectedProgramTeams = this.program.selectedProgramTeams == undefined ? [] : this.program.selectedProgramTeams;
            this.program.selectedProgramCoordinators = this.program.selectedProgramCoordinators == undefined ? [] : this.program.selectedProgramCoordinators;
            this.program.selectedCountries = this.program.selectedCountries == undefined ? [] : this.program.selectedCountries;
            this.company = result.companyLists;
            this.country = result.countries;
            this.programTeam = result.programTeams;
            this.programCordinator = result.programCoordinators;
            this.authorativeDocument = result.authoratativeDocuments;
            this.programDirector = result.programDirectors;
            this.programSponsors = result.programSponsors;
            this.editCountry();
            this.editProgramCordinator();
            this.editprogramTeam();
            this.editCompanyName();
            this.editProgramDirector();
            this.editProgramSponcer();
            this.program.removedProgramTeams = [];
            this.program.removedProgramCoordinators = [];
            this.program.removedCountries = [] = [];
        })

    }

    saveProgram() {

        this._programAppService.addorEditProgram(this.program).subscribe(result => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/project-management-dashboard']);
        })
    }

    editCountry() {

        this.selectedCountry = [];
        this.program.selectedCountries.forEach(obj => {
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

    editProgramCordinator() {        
        this.selectedprogramCordinator = [];
        this.program.selectedProgramCoordinators.forEach(obj => {
            this.programTeam.forEach(team => {
                
                if (obj.programCoordinatorsId == team.id) {
                    
                    var temp = new ProgramUser();
                    temp.id = team.id;
                    temp.organizationId = team.organizationId;
                    temp.employeeName = team.employeeName;
                    this.selectedprogramCordinator.push(temp);
                }
            });
        });
    }

    editprogramTeam() {

        this.SelectedProgramTeam = [];
        this.program.selectedProgramTeams.forEach(obj => {
            this.programTeam.forEach(team => {
                if (obj.programTeamsId == team.id) {
                    var temp = new ProgramUser();
                    temp.id = team.id;
                    temp.organizationId = team.organizationId;
                    temp.employeeName = team.employeeName;
                    this.SelectedProgramTeam.push(temp);
                }
            });
        });
    }

    editCompanyName() {

        this.company.forEach(obj => {
            if (obj.id == this.program.lockThreatOrganizationId) {

                this.selectedcompany = obj;

            }
        })

    }

    editProgramSponcer() {

        this.program.programSponsors.forEach(obj => {
            if (obj.id == this.program.programSponsorId) {
                this.selectedprogramSponsors = obj;

            }
        });

    }

    editProgramDirector() {
        this.program.programDirectors.forEach(obj => {
            if (obj.id == this.program.programDirectorId) {
                this.selectedProgramDirector = obj;

            }
        });
    }

    uploadLogo() {
        const filePanCardUpload = document.getElementById('fileimageUpload') as HTMLInputElement;
        filePanCardUpload.onchange = () => {
            var size = (filePanCardUpload.files[0].size / 1024).toFixed(2);
            var Checksizes = parseInt(size);
            if (Checksizes <= (200)) {
                for (let index = 0; index < filePanCardUpload.files.length; index++) {
                    var reader = new FileReader();
                    reader.onload = (e: any) => {
                        this.logoUpload = e.target.result;
                        this.program.programLogo = e.target.result;
                    }
                    reader.readAsDataURL(filePanCardUpload.files[index]);
                }
            }
            else {
                this.message.info("Please select Image below 200 KB", "Terms");
            }
        };
        filePanCardUpload.click();
    }
  

    programAuthoratativeDocument(event) {
        this._commonMultiDropdownService.filterProgramMultiselect(this.program.selectedProgramAuthoritativeDocuments,
            this.selectedauthorativeDocument, this.program.removedProgramAuthDocs, "AuthDoc", this.isEdit).then((result: any) => {
                this.program.selectedProgramAuthoritativeDocuments = result.selectedItems;
                this.selectedauthorativeDocument = result.dropDownItems;
                this.program.removedProgramAuthDocs = result.removedItems;
            }).catch(exception => {

            });
    }
}
