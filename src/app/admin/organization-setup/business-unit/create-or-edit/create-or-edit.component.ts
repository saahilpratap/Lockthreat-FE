import { Component, OnInit, Injector, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessUnitServiceProxy, GetBusinessUnitForEditDto, OrganizationUnitServiceProxy, OrganizationUnitDto, UnitTypeDto, BusinessUnitListDto, OrganizationSetupServiceProxy, GetOrganizationForEditDto, UpdateOrganizationUnitInput } from '../../../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from '../../../../../shared/common/app-component-base';

@Component({
    selector: 'app-create-or-edit',
    templateUrl: './create-or-edit.component.html',
    styleUrls: ['./create-or-edit.component.css']
})
export class CreateOrEditBusinessUnitComponent extends AppComponentBase implements OnInit {
  

    //UnitTypeList = [{
    //    id: 1,
    //    name: 'L1 - Division'
    //}, {
    //    id: 2,
    //    name: 'L2 - Department'
    //}, {
    //    id: 3,
    //    name: 'L3 - Section '
    //}, {
    //    id: 4,
    //    name: 'IN - Virtual Entity '
    //}];
    title = 'Organization';
    subTitle = '';
    pageTitle = '';
    recordId: any;
    isEdit: boolean;
    businessItem: GetBusinessUnitForEditDto = new GetBusinessUnitForEditDto();
    parentOrganizationName: any;
    businessUnitList: BusinessUnitListDto[] = [];
    tempOrganizationId: any;
    parentOrganizationList: UpdateOrganizationUnitInput[] = [];
    selectedUnitTypeId: any;
    UnitTypeList: UnitTypeDto[]=[];
    constructor(
        injector: Injector,
        private _router: Router,
        private route: ActivatedRoute,
        private _businsessUnitServiceProxy: BusinessUnitServiceProxy,
        private _organizationUnitServiceProxy: OrganizationUnitServiceProxy,
        private _organizationSetupServiceProxy: OrganizationSetupServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        //this.getUnitType();
        //this.route.queryParams.subscribe(
        //    params => {
        //        this.recordId = params['recordId'];
        //    }
        //);

        //if (this.recordId) {
        //    this.isEdit = true;
        //    this.getBusinessRecordForEdit(this.recordId);
        //} else {
        //    this.isEdit = false;
        //    this.getNextBusinessUnitId();
        //}
        ////this.getAllBusinessUnits();
        //this.getAllOrganizationUnit();
    }
    //getAllBusinessUnits(organizationUnitId, selectedUnitTypeId) {
    //    this._businsessUnitServiceProxy.getAllBusinessUnits('', organizationUnitId, selectedUnitTypeId,'',1000,0).subscribe(res => {
    //        this.businessUnitList = res.items;
    //    });
    //}

    //getUnitType() {
    //    this._businsessUnitServiceProxy.getUnitType().subscribe(result => {            
    //        this.UnitTypeList = result;
    //    });
    //}

    //getBusinessRecordForEdit(recordId: any) {
        
    //    this.businessUnitList = [];
    //    this._businsessUnitServiceProxy.getBusinessUnitForEdit(recordId).subscribe(res => {
    //        this.businessItem = res;
    //        this.getAllOrganizationUnit();
    //        this.getAllBusinessUnits(res.lockThreatOrganizationId, res.unitTypeId);
    //        this.tempOrganizationId = this.businessItem.lockThreatOrganization.organizationUnitId;
    //    });
    //}

    //backToBusinessUnit() {
    //    this._router.navigate(['/app/admin/organization-setup/business-units']);
    //}

    //save(): void {
        
    //    this._businsessUnitServiceProxy.createOrUpdateBusinessUnit(this.businessItem).subscribe(res => {
    //        if (this.isEdit) {
    //            abp.notify.success(this.l('SuccessfullyUpdated'));
    //        } else {
    //            abp.notify.success(this.l('SavedSuccessfully'));
    //        }
    //        this._router.navigate(['/app/admin/organization-setup/business-units']);

    //    });

    //}

    //getAllOrganizationUnit() {
    //    this._businsessUnitServiceProxy.getAllOrganizationUnits().subscribe(res => {
    //        this.parentOrganizationList = res;
    //        if (this.isEdit && this.parentOrganizationList.length > 0) {
    //            this.parentOrganizationName = this.parentOrganizationList.find(x => x.id === this.tempOrganizationId).displayName;
    //        } else {
    //            this.parentOrganizationName = '';
    //        }
    //    });
    //}

    //onChange(e, type) {
      
    //    if (type === 'UnitType') {
    //        this.selectedUnitTypeId = e.id;
    //    } else if (type === 'ParentOrg') {
    //        this.tempOrganizationId = e.id;
    //        this.parentOrganizationName = this.parentOrganizationList.find(x => x.id === e.id).displayName;
    //    }

    //    if (e !== null && this.selectedUnitTypeId !== null && this.tempOrganizationId !== null) {
    //        this._organizationSetupServiceProxy.getOrganizationByOrganizationUnitId(e.id).subscribe(res => {
    //            this.businessItem.lockThreatOrganization = new GetOrganizationForEditDto();
    //            this.businessItem.lockThreatOrganizationId = res;
    //            this.getAllBusinessUnits(res, this.selectedUnitTypeId);
    //        });
    //    } else {
    //        this.businessUnitList = [];
    //        this.parentOrganizationName = '';
    //    }
    //}

    //getNextBusinessUnitId() {
    //    this._businsessUnitServiceProxy.getNextBusinessUnitId().subscribe(res => {
    //        if (res !== '') {
    //            this.businessItem.businessUnitId = res;
    //        }
    //    });
    //}
    goToBack() {
        this._router.navigate(['/app/admin/organization-setup/business-units']);
    }
}
