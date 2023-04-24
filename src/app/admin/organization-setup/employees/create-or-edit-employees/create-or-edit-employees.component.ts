import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import { AppComponentBase } from '../../../../../shared/common/app-component-base';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeServiceProxy, GetEmployeeForEditDto, CountriesAppserviceServiceProxy, GetDynamicValueDto, CreateOrUpdateEmployeesInput, PasswordComplexitySetting, ProfileServiceProxy, BusinessUnitServiceProxy, BusinessUnitListDto, OrganizationSetupServiceProxy, OrganizationSetupListDto, OrganizationUnitServiceProxy, OrganizationUnitDto, UpdateOrganizationUnitInput } from '../../../../../shared/service-proxies/service-proxies';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'app-create-or-edit-employees',
    templateUrl: './create-or-edit-employees.component.html',
    styleUrls: ['./create-or-edit-employees.component.css']
})
export class CreateOrEditEmployeesComponent extends AppComponentBase implements OnInit {
    recordId: any;
    username: any;
    isEdit: boolean;
    title = 'Organization';
    subTitle = 'Employee';
    pageTitle = 'Add Employee';
    employeeItem: CreateOrUpdateEmployeesInput = new CreateOrUpdateEmployeesInput();
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();
    files: File[] = [];
    passwordComplexityInfo = '';
    userPasswordRepeat = '';
    grade: GetDynamicValueDto[] = [];
    userType: GetDynamicValueDto[] = [];
    riskGroup: GetDynamicValueDto[] = [];
    @ViewChild('DOBDatePicker', { static: true }) sampleDatePicker: ElementRef;
    accept: any;
    empLogo: any;
    businessUnitList: BusinessUnitListDto[] = [];
    tempOrganizationId: any;
    organizationList: UpdateOrganizationUnitInput[] = [];
    birthdate: any;
    filePan: any;
    checkuser: boolean;
    portaluser: boolean;
    constructor(
        injector: Injector,
        private _router: Router,
        private route: ActivatedRoute,
        private _employeeServiceProxy: EmployeeServiceProxy,
        private _profileService: ProfileServiceProxy,
        private _businessUnitServiceProxy: BusinessUnitServiceProxy,
        private _organizationServiceProxy: OrganizationSetupServiceProxy,
        private _organizationUnitServiceProxy: OrganizationUnitServiceProxy,
        private _businsessUnitServiceProxy: BusinessUnitServiceProxy,
        private _dynamicAppservice: CountriesAppserviceServiceProxy,
        public _DomSanitizationService: DomSanitizer,
    ) {
        super(injector);
    }

    ngOnInit() {

        this.route.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );
        if (this.recordId) {
            this.isEdit = true;
            this.getEmployeesRecordForEdit(this.recordId);
        } else {
            this.isEdit = false;
            this.getGreade();
            this.getUserType();
        }

        this.setPasswordComplexity();
        this.getAllOrganizationUnits();
        this.getRiskGroup();
    }

    getGreade()
    {
        this._dynamicAppservice.getAllGrade().subscribe(res => {
            this.grade = res;
        });
    }    
   
    getRiskGroup() {
        this._dynamicAppservice.getAllRiskGroup().subscribe(result => {
            this.riskGroup = result;
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
                        this.filePan = e.target.result;
                        this.employeeItem.profilePicture = e.target.result;                   
                    }
                    reader.readAsDataURL(filePanCardUpload.files[index]);
                }
            }
            else {
                this.message.info("Please select Image below 200 kB",);
            }
        };
        filePanCardUpload.click();
    }

    getUserType()
    {
        this._dynamicAppservice.getAllUserType().subscribe(res => {
            this.userType = res;
        });
    }

    getDirectPhone(event)
    {
        this.employeeItem.directPhone = event;
    }

    getCellPhone(event)
    {
        this.employeeItem.phoneNumber = event;
    }

    getAllOrganizationUnits()
    {       
        this._businsessUnitServiceProxy.getAllOrganizationUnits().subscribe(res => {
            
            this.organizationList = res;            
        });
    }
  
    changeDate(event: any)
    {        
        var timeDiff = Math.abs(Date.now() - event);
        this.employeeItem.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }

    onEmployeeTypeChange(event)
    {                
         this.portaluser = (event.value == "Portal User") ? true : false;                             
          this.employeeItem.employeeTypeId = event.id;
    }

    onGradeChange(event) {
        
        this.employeeItem.employeeGradeId = event.id;
    }

    onSelect(event)
    {      
      this.files.push(...event.addedFiles);
    }

    onRemove(event)
    {       
        this.files.splice(this.files.indexOf(event), 1);
    }

    onBusinessUnitChnage(event)
    {
        this.employeeItem.businessUnitId = event.id;
    }

    getAllBusinessUnits(organizationUnitId)
    {
        this._businessUnitServiceProxy.getAllBusinessUnits('', organizationUnitId, undefined, undefined, 1000, 0).subscribe(res => {
            
            this.businessUnitList = res.items;
        });
    }

    setPasswordComplexity()
    {
        this._profileService.getPasswordComplexitySetting().subscribe(passwordComplexityResult => {
            this.passwordComplexitySetting = passwordComplexityResult.setting;
            this.setPasswordComplexityInfo();
        });
    }

    forceLower(strInput) {
        this.username = strInput.value.toLowerCase();
    }​

    userName(e)
    {
        debugger
        this.employeeItem.userName = this.username;
        this._employeeServiceProxy.checkUserAvailable(this.username).subscribe(result => {
            this.checkuser = result;           
        })                  
    }

    onNamechange(searchValue: string) {

        if (!this.isEdit) {
            let a = searchValue.split(' ');
            if (a.length >= 2) {
                debugger
                this.username = a[0] + '.' + a[a.length - 1];
                this.employeeItem.userName = a[0] + '.' + a[a.length - 1];
                this.userName(this.username);
            }
            else if (a.length == 1) {
                debugger
                this.username = a;
                this.userName(a);
                this.employeeItem.userName = this.username;
            }
        }
       
    }

    getNextEmployeeId() {
        //this._employeeServiceProxy.getNextEmployeeId().subscribe(res => {
        //    if (res !== '') {
        //        this.employeeItem.employeeId = res;
        //    }
        //});
    }

    getEmployeesRecordForEdit(recordId: any) {
      debugger
        this._employeeServiceProxy.getEmployeesForEdit(recordId).subscribe(res => {
            debugger
            this.employeeItem = res;
            this.filePan = res.profilePicture;
            this.username = res.user.userName;
            this.employeeItem.businessUnitId = res.businessUnit.id;
            this.employeeItem.emailAddress = res.user.emailAddress;
            this.getAllOrganizationUnits();
            this.getGreade();
            this.getUserType();
            this.tempOrganizationId = res.lockThreatOrganization.organizationUnitId;
            this.getAllBusinessUnits(res.lockThreatOrganization.id);
        });
    }

    save(): void
    {

        if (this.isEdit) {
            this.employeeItem.userName = this.username;
        }
        else {
            this.employeeItem.userName = this.username;
        }
       this._employeeServiceProxy.createOrUpdateEmployees(this.employeeItem).subscribe(res => {

                if (this.isEdit) {
                    abp.notify.success(this.l('SuccessfullyUpdated'));
                } else {
                    abp.notify.success(this.l('SavedSuccessfully'));
                }
                this._router.navigate(['/app/admin/organization-setup/organization-employees']);

            });                       
    }

    backToEmployees(): void {
        this._router.navigate(['/app/admin/organization-setup/organization-employees']);
    }

    setPasswordComplexityInfo(): void {

        this.passwordComplexityInfo = '<ul>';

        if (this.passwordComplexitySetting.requireDigit) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireDigit_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requireLowercase) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireLowercase_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requireUppercase) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireUppercase_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requireNonAlphanumeric) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireNonAlphanumeric_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requiredLength) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequiredLength_Hint', this.passwordComplexitySetting.requiredLength) + '</li>';
        }

        this.passwordComplexityInfo += '</ul>';
    }

    onOrgChange(e) {
     
        if (e != null) {
            this._organizationServiceProxy.getOrganizationByOrganizationUnitId(e.id).subscribe(res => {
                this.employeeItem.lockThreatOrganizationId = res;
                this.getAllBusinessUnits(res);
            });
        } else {
            this.businessUnitList = [];
        }
    }
}
