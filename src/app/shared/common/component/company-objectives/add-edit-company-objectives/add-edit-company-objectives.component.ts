import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, OnInit, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { StrategicObjectivesServiceProxy, GetOrganizationDto, ProgramUser,OranizationGoalDto, GetDynamicValueDto, StrategicObjectiveDto, OrganizationSetupServiceProxy} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'add-edit-company-objectives',
    templateUrl: './add-edit-company-objectives.component.html',
    styleUrls: ['./add-edit-company-objectives.component.scss']
})
export class AddAditCompanyObjectivesComponent extends AppComponentBase implements OnInit {

    recordId: any;
    text: any;
    isEdit: boolean;
    strategicObjective: StrategicObjectiveDto = new StrategicObjectiveDto();
    organizationList: GetOrganizationDto[] = [];
    goal: OranizationGoalDto[] = [];
    goalhideshow: boolean = false;
    organizationGoal: OranizationGoalDto[] = [];

    status: GetDynamicValueDto[] = [];
    type: GetDynamicValueDto[] = [];
    sponser: ProgramUser[] = [];

    selectedCompany: GetOrganizationDto = new GetOrganizationDto();
    selectedorganizationGoal: OranizationGoalDto = new OranizationGoalDto();
    selectedStatus: GetDynamicValueDto = new GetDynamicValueDto();
    selectedtype: GetDynamicValueDto = new GetDynamicValueDto();
    selectedSponser: ProgramUser = new ProgramUser();

    constructor(
        injector: Injector,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _organizationServiceProxy: OrganizationSetupServiceProxy,
        private _strategicObjectivesService: StrategicObjectivesServiceProxy
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
            this.getStrategicObjective(this.recordId);


        } else {
            this.isEdit = false;
            this.getStrategicObjective(this.recordId);

        }
        
    }


    editSponser() {
        this.sponser.forEach(obj => {
            if (obj.id == this.strategicObjective.executiveSponsorId) {
                this.selectedSponser = obj;
            }
        })   
    }

    editType() {
        this.type.forEach(obj => {
            if (obj.id == this.strategicObjective.typeId) {
                this.selectedtype = obj;
            }
        })
    }

    editCompany() {
        this.organizationList.forEach(obj => {
            if (obj.id == this.strategicObjective.lockThreatOrganizationId) {
                this.selectedCompany = obj;
            }
        })   
    }

    editStatus() {
        this.status.forEach(obj => {
            if (obj.id == this.strategicObjective.statusId) {
                this.selectedStatus = obj;
            }
        })
    }

    editGoal() {
        this.goal.forEach(obj => {
            if (obj.id == this.strategicObjective.id) {
                this.selectedorganizationGoal = obj;
            }
        })
    }

    hideandShowgoal() {
        this.goalhideshow = false;
    }

    companyChange(event)
    {
        this.goalhideshow = false;
        this.strategicObjective.goal = null;
        this.selectedorganizationGoal = null;
        this.organizationGoal = [];
        this.strategicObjective.lockThreatOrganizationId = event.value.id;

        this.goal.forEach(obj => {
            if (obj.lockThreatOrganizationId == event.value.id)
            {
                if (obj.goal != null)
                {
                    this.organizationGoal.push(obj);
                    this.goalhideshow = true;
                }
               
            }
            else {
                //this.organizationGoal = [];
            }
        })

    }

    goalChange(event)
    {        
        this.strategicObjective.goal = event.value.goal;
    }

    sponsorChange(event) {
        
        this.strategicObjective.executiveSponsorId = event.value.id;
    }

    statusChange(event) {
        this.strategicObjective.statusId = event.value.id;
    }

    typeChange(event) {
        this.strategicObjective.typeId = event.value.id;
    }

    getStrategicObjective(recordId) {
        this._strategicObjectivesService.getStrategicObjectiveInfo(recordId).subscribe(res => {            
            this.strategicObjective = res;           
            this.organizationList = res.lockThreatOrganizations;
            this.sponser = res.executiveSponsors;
            this.goal = res.goals;
            this.type = res.types;
            this.status = res.statuses;
            this.editSponser();
            this.editType();
            this.editCompany();
            this.editStatus();
            this.editGoal();
        })
    }

    saveObjectives()
    {
        this._strategicObjectivesService.createOrUpdateStrategicObjectives(this.strategicObjective).subscribe(result => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['app/main/strategic-objective']);
        })      
    }



}
