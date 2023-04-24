import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, OrganizationUnitDto, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { VendorServiceProxy, GetDynamicValueDto, VendorProductServiceDto, VendorInfoDto, CountryDto } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'add-edit-all-vendors',
    templateUrl: './add-edit-all-vendors.component.html',
    styleUrls: ['./add-edit-all-vendors.component.scss']
})
export class AddEditAllVendorsComponent extends AppComponentBase {
    creationDateRange: Date;
    text: any;    
    recordId: any;
    isEdit: boolean;
    vendor: VendorInfoDto = new VendorInfoDto();
    vendorType: GetDynamicValueDto[] = [];
    selectedVendorType: GetDynamicValueDto = new GetDynamicValueDto();
    country: CountryDto[] = [];

    selectedCountry: CountryDto = new CountryDto();
    industrys: GetDynamicValueDto[] = [];
    selectedIndustrys: GetDynamicValueDto = new GetDynamicValueDto();
    vendorCriticalRatings: GetDynamicValueDto[] = [];
    selectedVendorCriticalRating: GetDynamicValueDto = new GetDynamicValueDto();
    vendorInitialRatings: GetDynamicValueDto[] = [];
    selectedVendorInitialRating: GetDynamicValueDto = new GetDynamicValueDto();
    vendorProductType: GetDynamicValueDto[] = [];
    selectedVendorProductType: GetDynamicValueDto[] = [];
    constructor(
        injector: Injector,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _vendorServiceProxy: VendorServiceProxy,
        private _userService: UserServiceProxy,
        private _profileService: ProfileServiceProxy
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
            this.getAllVendorInfo(this.recordId);
        }
        else {
            this.isEdit = false;
            this.getAllVendorInfo(this.recordId);
        }
    }

    vendorInitialChange(event)
    {
        this.vendor.vendorInitialRatingId = event.value.id;
    }

    vendorCriticalChange(event) {
        this.vendor.vendorCriticalRatingId = event.value.id;
    }

    CountryChange(event) {
        this.vendor.countryId = event.value.id;
    }

    industryChange(event) {
        this.vendor.industryId = event.value.id;
    }

    vendorTypeChange(event) {
        this.vendor.vendorTypeId = event.value.id;
    }

    editAll() {
        this.editCountry();
        this.editindustry();
        this.editVendorCritical();
        this.editVendorInitial();
        this.editvendorType();
        this.editVendorProductTypes();
    }

    selectedvendorProductTypes()
    {
        this.vendor.selectedVendorProductServices = [];
        this.selectedVendorProductType.forEach(obj => {
            var item = new VendorProductServiceDto();
            item.id = 0;
            item.vendorId = 0;
            item.vendorServiceId = obj.id;
            this.vendor.selectedVendorProductServices.push(item);
        })
    }

    editVendorProductTypes() {
        debugger
        this.selectedVendorProductType = [];
        this.vendor.selectedVendorProductServices.forEach(obj => {
            debugger
            this.vendorProductType.forEach(team => {
                if (obj.vendorServiceId == team.id) {
                    var temp = new GetDynamicValueDto();
                    temp.id = team.id;
                    temp.value = team.value;                   
                    this.selectedVendorProductType.push(temp);
                }
            });
        });
    }

    editVendorInitial() {
        this.selectedVendorInitialRating = null;
        this.vendorInitialRatings.forEach(obj => {
            if (obj.id == this.vendor.vendorInitialRatingId) {
                this.selectedVendorInitialRating = obj;
            }
        })
    }

    editVendorCritical() {
        this.selectedVendorCriticalRating = null;
        this.vendorCriticalRatings.forEach(obj => {
            if (obj.id == this.vendor.vendorCriticalRatingId) {
                this.selectedVendorCriticalRating = obj;
            }
        })
    }

    editindustry() {
        this.selectedIndustrys = null;
        this.industrys.forEach(obj => {
            if (obj.id == this.vendor.industryId) {
                this.selectedIndustrys = obj;
            }
        })
    }

    editvendorType() {
        this.selectedVendorType = null;
        this.vendorType.forEach(obj => {
            if (obj.id == this.vendor.vendorTypeId) {
                this.selectedVendorType = obj;
            }
        })
    }

    editCountry() {
        this.selectedCountry = null;
        this.country.forEach(obj => {
            if (obj.id == this.vendor.countryId) {
                this.selectedCountry = obj;
            }
        })
    }

    getPhone(event) {
        this.vendor.phoneNumber = event;
    }

    getCellPhone(event) {
        this.vendor.cellPhoneNumber = event;
    }

    getfaxnumber(event) {
        this.vendor.faxNumber = event;
    }

    getAllVendorInfo(recordId)
    {
        this._vendorServiceProxy.getAllVendorInfo(recordId).subscribe(res => {
            this.vendor = res;
            this.country = res.countrys;
            this.vendorType = res.vendorTypes;
            this.industrys = res.industrys;
            this.vendor.selectedVendorProductServices = this.vendor.selectedVendorProductServices == undefined ? [] : this.vendor.selectedVendorProductServices;
            this.vendorCriticalRatings = res.vendorCriticalRatings;
            this.vendorInitialRatings = res.vendorInitialRatings;
            this.vendorProductType = res.vendorProductList;
            if (this.isEdit) {
                this.editAll();
            }
        });
    }

    saveVendors()
    {
        this.selectedvendorProductTypes();
        this._vendorServiceProxy.createOrUpdateVendor(this.vendor).subscribe(res => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/all-vendors']);

        });       
    }
}
