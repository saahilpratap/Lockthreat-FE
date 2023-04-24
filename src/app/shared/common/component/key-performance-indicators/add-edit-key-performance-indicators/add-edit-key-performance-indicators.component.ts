import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { KeyPerformanceIndicatorServiceProxy, KeyPerformanceDto, ProgramUser, GetDynamicValueDto, BusinessUnitPrimaryDto, GetOrganizationDto } from '@shared/service-proxies/service-proxies';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';

import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'add-edit-key-performance-indicators',
    templateUrl: './add-edit-key-performance-indicators.component.html',
    styleUrls: ['./add-edit-key-performance-indicators.component.scss']
})
export class AddEditKeyPerformanceIndicatorsComponent extends AppComponentBase {
    text: any;
    recordId: any;

    keyperformance: KeyPerformanceDto = new KeyPerformanceDto();

    oraganization: GetOrganizationDto[] = [];
    selectedOrganization: GetOrganizationDto = new GetOrganizationDto();

    status: GetDynamicValueDto[] = [];
    selectedStatus: GetDynamicValueDto = new GetDynamicValueDto();

    frequancy: GetDynamicValueDto[] = [];
    selectedfrequancy: GetDynamicValueDto = new GetDynamicValueDto();

    businessUnit: BusinessUnitPrimaryDto[] = [];
    selectedBusinessUnit: BusinessUnitPrimaryDto[] = [];


    administrators: ProgramUser[] = [];
    selectedadministrators: ProgramUser[] = [];

    Owner: ProgramUser[] = [];
    selectedOwner: ProgramUser = new ProgramUser();


    isEdit: boolean;


    constructor(
        injector: Injector,
        private _keyPerformanceIndicatorServiceProxy: KeyPerformanceIndicatorServiceProxy,
        private _commonMultiDropdownService: MultiselectDropdownService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
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
            this.getAllkeyPerformance(this.recordId);
        } else {
            this.isEdit = false;
            this.getAllkeyPerformance(this.recordId);
        }
    }

    oragnizationChange(event) {
        if (event.value.id != 0) {
            this.keyperformance.lockThreatOrganizationId = event.value.id;
            this.businessUnit = [];
            this.keyperformance.businessUnits.forEach(obj => {
                if (obj.lockThreatOrganizationId == this.keyperformance.lockThreatOrganizationId) {
                    this.businessUnit.push(obj);
                }
            });
            this.Owner = [];
            this.keyperformance.programUser.forEach(emp => {
                if (emp.organizationId == this.keyperformance.lockThreatOrganizationId) {
                    this.Owner.push(emp);
                }               
            })
        }
    }

    businessunitChange(event) {

        this._commonMultiDropdownService.filterForKeyperformanceIndicatorMultipleSelect(this.keyperformance.selectedBusinessUnits,
            this.selectedBusinessUnit, this.keyperformance.removeBusinessUnits, "BusinessUnitKPI", this.isEdit).then((result: any) => {
                this.keyperformance.selectedBusinessUnits = result.selectedItems;
                this.selectedBusinessUnit = result.dropDownItems;
                this.keyperformance.removeBusinessUnits = result.removedItems;
            }).catch(exception => {

            });
    }

    administratorChange(event) {
        
        this._commonMultiDropdownService.filterForKeyperformanceIndicatorMultipleSelect(this.keyperformance.selectedAdministrators, this.selectedadministrators,
            this.keyperformance.removeAdministrators, "Administrator", this.isEdit).then((result: any) => {
                debugger
                this.keyperformance.selectedAdministrators = result.selectedItems;
                this.selectedadministrators = result.dropDownItems;
                this.keyperformance.removeAdministrators = result.removedItems;
            }).catch(exception => {

            });
    }

    ownerChange(event) {
        this.keyperformance.employeeId = event.value.id;
    }

    frequencyChange(event) {
        this.keyperformance.frequencyId = event.value.id;
    }

    statusChange(event) {
        this.keyperformance.statusId = event.value.id;
    }

    editstatus() {
      
            this.selectedStatus = null;
            this.status.forEach(obj => {
                if (obj.id == this.keyperformance.statusId) {
                    this.selectedStatus = obj;
                }
            })
      
    }

    editfrequancy() {
       
            this.selectedfrequancy = null;
            this.frequancy.forEach(obj => {
                if (obj.id == this.keyperformance.frequencyId) {
                    this.selectedfrequancy = obj;
                }
            })
       
    }

    editAdministrator() {

        debugger
        this.selectedadministrators = [];
        this.keyperformance.selectedAdministrators.forEach(obj => {
            this.administrators.forEach(team => {
                if (obj.employeeId == team.id) {
                    var temp = new ProgramUser();
                    temp.id = team.id;
                    temp.organizationId = team.organizationId;
                    temp.employeeName = team.employeeName;
                    this.selectedadministrators.push(temp);
                }
            });
        });
    }


    getbusinessuintEdit() {

        this.selectedBusinessUnit = [];
        this.keyperformance.selectedBusinessUnits.forEach(obj => {
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

    editowner() {
        this.selectedOwner = null;
        this.Owner.forEach(obj => {
            if (obj.id == this.keyperformance.employeeId) {
                this.selectedOwner = obj;
            }
        })
    }

    editoranization() {
       this.selectedOrganization = null;
        this.oraganization.forEach(obj => {

            if (obj.id == this.keyperformance.lockThreatOrganizationId) {

                this.selectedOrganization = obj;

            }
        })
    }

    getAllkeyPerformance(keyriskid) {
        this._keyPerformanceIndicatorServiceProxy.getKeyperformanceInfo(keyriskid).subscribe(res => {
            this.keyperformance = res;
            this.oraganization = res.companyLists;
            this.status = res.statuses;
            this.frequancy = res.frequencys;
            this.businessUnit = res.businessUnits;
            this.administrators = res.programUser;
            this.Owner = res.programUser;
            this.keyperformance.selectedBusinessUnits = this.keyperformance.selectedBusinessUnits == undefined ? [] : this.keyperformance.selectedBusinessUnits;
            this.keyperformance.removeBusinessUnits = [];
            this.keyperformance.selectedAdministrators = this.keyperformance.selectedAdministrators == undefined ? [] : this.keyperformance.selectedAdministrators;
            this.keyperformance.removeAdministrators = [];
            this.editoranization();
            this.editowner();
            this.editAdministrator();
            this.editfrequancy();
            this.editstatus();
            this.getbusinessuintEdit();
            
        });
    }

    saveKeyPerformancekIndicator() {
        this._keyPerformanceIndicatorServiceProxy.createorUpdateKeyPerformance(this.keyperformance).subscribe(result => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/key-performance-indicators']);
        })
    }
}
