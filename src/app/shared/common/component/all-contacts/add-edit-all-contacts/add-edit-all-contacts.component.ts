import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, OrganizationUnitDto, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { ContactServiceProxy, ContactInfoDto, BusinessServiceOwner, VendorsDto, GetOrganizationDto,GetDynamicValueDto, CountryDto } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'add-edit-all-contacts',
    templateUrl: './add-edit-all-contacts.component.html',
    styleUrls: ['./add-edit-all-contacts.component.scss']
})
export class AddEditAllContactsComponent extends AppComponentBase
{
    recordId: any;
    isEdit: boolean;
    text: any;
    accept: any;
    contact: ContactInfoDto = new ContactInfoDto();
        
    country: CountryDto[] = [];
    selectedCountry: CountryDto = new CountryDto();

    contactType: GetDynamicValueDto[] = [];
    selectedContactType: GetDynamicValueDto = new GetDynamicValueDto();

    organization: GetOrganizationDto[] = [];
    selectedOrganization: GetOrganizationDto = new GetOrganizationDto();

    vendor: VendorsDto[] = [];
    selectedVendor: VendorsDto = new VendorsDto();

    user: BusinessServiceOwner[] = [];
    selectedUser: BusinessServiceOwner = new BusinessServiceOwner();
    contactlogo: any;

    constructor(
        injector: Injector,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _contactService: ContactServiceProxy,
        private _userService: UserServiceProxy,
        private _profileService: ProfileServiceProxy
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
            this.getAllContactInfo(this.recordId);
        }

        else {
            this.isEdit = false;
            this.getAllContactInfo(this.recordId);
        }
    }

    getAllContactInfo(recordId)
    {
        this._contactService.getAllContactsInfo(recordId).subscribe(res => {           
            this.contact = res;
            this.contactlogo = res.profilePicture;
            this.vendor = res.vendors;
            this.country = res.countries;
            this.organization = res.companyLists;
            this.user = res.employeesList;
            this.contactType = res.contactTypes;
            if (this.isEdit) {
                this.editAll();
            }

        });
    }

    getPhone(event) {
        this.contact.phoneNumber = event;
    }

    getMobile(event) {
        this.contact.mobileNo = event;
    }

    contactTypeChange(event) {
        this.contact.contactTypeId = event.value.id;
    }

    userChange(event) {
        this.contact.loginUserId = event.value.id;
    }

    contactOwnerChange(event) {
        this.contact.lockThreatOrganizationId = event.value.id;
    }

    vendorChange(event) {
        this.contact.vendorId = event.value.id;
    }

    countryChange(event) {
        this.contact.countryId = event.value.id;
    }

    editAll() {
        this.editcontactOwner();
        this.editContactType();
        this.editcountry();
        this.editvendor();
        this.editLoginUser();
    }

    editcountry() {
        this.selectedCountry = null;
        this.country.forEach(obj => {
            if (obj.id == this.contact.countryId) {
                this.selectedCountry = obj;
            }
        })
    }

    editvendor() {
        this.selectedVendor = null;
        this.vendor.forEach(obj => {
            if (obj.id == this.contact.vendorId) {
                this.selectedVendor = obj;
            }
        })
    }

    editcontactOwner() {
        this.selectedOrganization = null;
        this.organization.forEach(obj => {
            if (obj.id == this.contact.lockThreatOrganizationId) {
                this.selectedOrganization = obj;
            }
        })
    }

    editContactType()
    {
        this.selectedContactType = null;
        this.contactType.forEach(obj => {
            if (obj.id == this.contact.contactTypeId) {
                this.selectedContactType = obj;
            }
        })
    }

    editLoginUser() {
        this.selectedUser = null;
        this.user.forEach(obj => {
            if (obj.id == this.contact.loginUserId) {
                this.selectedUser = obj;
            }
        })
    }

    saveContacts() {
        this._contactService.createOrUpdateContact(this.contact).subscribe(res => {

            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/all-contacts']);

        });     
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
                        this.contactlogo = e.target.result;
                        this.contact.profilePicture = e.target.result;
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
