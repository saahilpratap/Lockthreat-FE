import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GetBusinessUnitForEditDto, BusinessUnitListDto, EmployeeServiceProxy, ProgramUser, GetLockThreatOrganizationDto, ParentUnit, UpdateOrganizationUnitInput, UnitTypeDto, BusinessUnitServiceProxy, OrganizationUnitServiceProxy, OrganizationSetupServiceProxy, GetOrganizationForEditDto, CreateOrUpdateBusinessUnitInput } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { array, number } from 'prop-types';

export class UnitTypeInputDto
{
    UnitTypeId: number[];
    OraganizationId: number
}

@Component({
    selector: 'add-edit-business-units',
    templateUrl: './add-edit-business-units.component.html',
    styleUrls: ['./add-edit-business-units.component.scss']
})
export class AddEditBusinessUnitsComponent extends AppComponentBase {

    unitId: number;
    recordId: any;
    isEdit: boolean;   
    businessInput: UnitTypeInputDto = new UnitTypeInputDto();
    businessItem: GetBusinessUnitForEditDto = new GetBusinessUnitForEditDto();
    businessUnit: CreateOrUpdateBusinessUnitInput = new CreateOrUpdateBusinessUnitInput();
    parentOrganizationName: any;
    businessUnitList: BusinessUnitListDto[] = [];
    tempOrganizationId: any;
    parentOrganizationLists: GetLockThreatOrganizationDto[] = [];
    selectedUnitTypeId: any;
    UnitTypeList: UnitTypeDto[] = [];
    parentUnit: ParentUnit[] = [];
    lockthreadOrganizationId: any;
    employee: ProgramUser[] = [];
    constructor(
        injector: Injector,
        private _router: Router,
        private route: ActivatedRoute,
        private _businsessUnitServiceProxy: BusinessUnitServiceProxy,
        private _employeeserviceproxy: EmployeeServiceProxy,
        private _organizationUnitServiceProxy: OrganizationUnitServiceProxy,
        private _organizationSetupServiceProxy: OrganizationSetupServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        
        this.getUnitType();
        this.route.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );

        if (this.recordId) {            
            this.isEdit = true;
            this.getBusinessRecordForEdit(this.recordId);
        } else {
            this.isEdit = false;
          
        }
       
        this.getAllOrganizationUnit();
    }

    getAllBusinessUnits(organizationUnitId, selectedUnitTypeId)
    {
        this._businsessUnitServiceProxy.getAllBusinessUnits('', organizationUnitId, selectedUnitTypeId, '', 1000, 0).subscribe(res => {            
            this.businessUnitList = res.items;
        });
    }

    getUnitType() {
        this._businsessUnitServiceProxy.getUnitType().subscribe(result => {            
            this.UnitTypeList = result;       
            this.unitId = result[0].id;
          
        });
    }

    getBusinessRecordForEdit(recordId: any) {
        this.businessUnitList = [];
        this._businsessUnitServiceProxy.getBusinessUnitForEdit(recordId).subscribe(res => {
            
            this.businessItem = res;
            this.getAllOrganizationUnit();
            this.businessInput.UnitTypeId = [];
            this.UnitTypeList.forEach(obj => {
                if (obj.id < res.unitTypeId) {
                    this.businessInput.UnitTypeId.push(obj.id);
                }
            })          
            var orgId = (res.lockThreatOrganizationId);
            this._businsessUnitServiceProxy.getUnittypeWiesParent(this.businessInput.UnitTypeId, orgId).subscribe(result => {
                
                this.parentUnit = result;

                this._employeeserviceproxy.getAllEmployeeOraganization(res.lockThreatOrganizationId).subscribe(result => {
                    this.employee = result;
                });
            })
           
           

            this.tempOrganizationId = this.businessItem.lockThreatOrganization.organizationUnitId;
        });
    }

    backToBusinessUnit() {
        this._router.navigate(['/app/admin/organization-setup/business-units']);
    }

    saveBbusinessUnit(): void {
       debugger
        this.businessUnit.id = this.businessItem.id;
        this.businessUnit.parentUnit = this.businessItem.parentUnit;
        this.businessUnit.lockThreatOrganizationId = this.businessItem.lockThreatOrganizationId;
        this.businessUnit.unitTypeId = this.businessItem.unitTypeId;
        this.businessUnit.businessUnitTitle = this.businessItem.businessUnitTitle;       
        this.businessUnit.isAuditableEntity = this.businessItem.isAuditableEntity;
        this.businessUnit.empId = this.businessItem.empId;
        if (this.isEdit) {
            this.businessUnit.businessUnitId = this.businessItem.businessUnitId;
            this.businessUnit.organizationUnitId = this.businessItem.organizationUnitId;
            if (this.lockthreadOrganizationId != undefined) {
                
                this.businessUnit.lockThreatOrganizationId = this.lockthreadOrganizationId;
            }
            else {
                
                this.businessUnit.lockThreatOrganizationId = this.businessItem.lockThreatOrganizationId;
            }          
        }
        else {

            this.businessUnit.organizationUnitId = this.tempOrganizationId;
        }
      
        this._businsessUnitServiceProxy.createOrUpdateBusinessUnit(this.businessUnit).subscribe(res => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/admin/organization-setup/business-units']);

        });

    }

    getAllOrganizationUnit()
    {

        this._businsessUnitServiceProxy.getAllOraganization().subscribe(res => {            
            this.parentOrganizationLists = res;

            if (this.isEdit && this.parentOrganizationLists.length > 0) {

                this.parentOrganizationName = this.parentOrganizationLists.find(x => x.organizationUnitId === this.tempOrganizationId).companyName;
            } else {
                this.parentOrganizationName = '';
            }
        });
    }

    onChange(e, type)
    {
        debugger
        if (type === 'UnitType')
        {            
            this.parentUnit = [];
            this.businessInput.UnitTypeId = [];
            this.businessItem.parentUnit = null;
            this.businessUnitList = [];
            this.UnitTypeList.forEach(obj => {
                if (obj.id < e.id) {
                    this.businessInput.UnitTypeId.push(obj.id);
                }
            })
            this.selectedUnitTypeId = e.id;
            if (this.tempOrganizationId != null && this.tempOrganizationId != undefined && this.isEdit) {                
                this._organizationSetupServiceProxy.getOrganizationByOrganizationUnitId(this.tempOrganizationId).subscribe(res => {
                    this.businessItem.lockThreatOrganization = new GetOrganizationForEditDto();                    
                    this.businessItem.lockThreatOrganizationId = res;
                    this._businsessUnitServiceProxy.getUnittypeWiesParent(this.businessInput.UnitTypeId, this.businessItem.lockThreatOrganizationId).subscribe(result => {                        
                        this.parentUnit = result;
                    })
                })
            }
        }
        else if (type === 'ParentOrg')
        {
            
            this.businessItem.parentUnit = null;
            this.employee = [];
            this.businessInput.UnitTypeId = [];
            this.businessItem.empId = null;
            this.tempOrganizationId = e.organizationUnitId;
            this.lockthreadOrganizationId = e.id;
            this.parentUnit = [];
            this._employeeserviceproxy.getAllEmployeeOraganization(e.organizationUnitId).subscribe(result => {
                this.employee = result;
            });

            if (this.isEdit) {
                var unitType = this.businessItem.unitTypeId;
                this.businessUnitList = [];
                this.UnitTypeList.forEach(obj => {
                    if (obj.id < unitType) {
                        this.businessInput.UnitTypeId.push(obj.id);
                    }
                })
                this._businsessUnitServiceProxy.getUnittypeWiesParent(this.businessInput.UnitTypeId, this.lockthreadOrganizationId).subscribe(result => {
                    this.parentUnit = result;
                })
            }
            
            this.parentOrganizationName = this.parentOrganizationLists.find(x => x.organizationUnitId === e.organizationUnitId).companyName;
        }
        if (e !== null && this.selectedUnitTypeId !== null && this.selectedUnitTypeId != undefined && this.tempOrganizationId !== null && this.tempOrganizationId != undefined && !this.isEdit)
        {
            this.businessInput.UnitTypeId = [];
            this.parentUnit = [];
            this.UnitTypeList.forEach(obj => {
                if (obj.id < this.selectedUnitTypeId) {
                    this.businessInput.UnitTypeId.push(obj.id);
                }
            })
            this._organizationSetupServiceProxy.getOrganizationByOrganizationUnitId(this.tempOrganizationId).subscribe(res => {
                debugger
                this.businessItem.lockThreatOrganization = new GetOrganizationForEditDto();                
                this.businessItem.lockThreatOrganizationId = res;
                this.businessUnit.lockThreatOrganizationId = res;
                debugger
                this._businsessUnitServiceProxy.getUnittypeWiesParent(this.businessInput.UnitTypeId, this.businessUnit.lockThreatOrganizationId).subscribe(result => {
                    debugger
                    this.parentUnit = result;
                })
               
            });
        }
        else {
         
        }
    }

    onChangesid(e) {
        
        this.businessUnit.parentUnit = e;
    }

    onparantChange(event) {
        
        this.businessUnit.parentUnit = event.id;
    }
    
    onempChange(event) {
        
        this.businessItem.empId = event.id;
    }
}
