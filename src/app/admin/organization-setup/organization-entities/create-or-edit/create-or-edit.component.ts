import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
  CreateOrUpdateOrganizationSetupInput,
  EmployeeServiceProxy,
  ProgramUser,
  OrganizationSetupServiceProxy,
  LevelType,
  CountryDto,
  IndustrySectorDto,
  UpdateOrganizationUnitInput,
  OrganizationUnitServiceProxy,
  IndustrySectorsServiceProxy,
  CountriesAppserviceServiceProxy,
} from '../../../../../shared/service-proxies/service-proxies';
import { Router, ActivatedRoute } from '@angular/router';
import { IntlTelInputComponent } from 'app/shared/common/ui-components/intl-tel-input/intl-tel-input.component';

@Component({
  selector: 'create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.scss'],
})
export class CreateOrEditOrganizationEntitiesComponent extends AppComponentBase
  implements OnInit {
  @Input() phoneNumber: IntlTelInputComponent;
  index = 0;
  organizationLevels = [
    {
      id: 1,
      name: 'Level 1 - Consortium',
    },
    {
      id: 2,
      name: 'Level 2 - Business Group',
    },
    {
      id: 3,
      name: 'Level 3 - Company',
    },
  ];

  //industrySectors = [{
  //    id: 1,
  //    name: 'Chemicals'
  //}, {
  //    id: 2,
  //    name: 'Construction Materials'
  //}, {
  //    id: 3,
  //    name: 'Containers & Packaging'
  //}, {
  //    id: 4,
  //    name: 'Metals and Mining'
  //}];

  industrySectors: IndustrySectorDto[] = [];
  country: CountryDto[] = [];
  addressCountry: CountryDto[] = [];
  organizationItem: CreateOrUpdateOrganizationSetupInput = new CreateOrUpdateOrganizationSetupInput();
  isEdit: boolean;
  parentOrganizationList: UpdateOrganizationUnitInput[] = [];
  recordId: any;
  phones: string;
  title = 'Organization';
  subTitle = 'Organization Entities';
  pageTitle = 'Add Employee';
  employee: ProgramUser[] = [];
  selectedRelatedInfo: string;
  constructor(
    injector: Injector,
    private _organizationServiceProxy: OrganizationSetupServiceProxy,
    private _organizationUnitServiceProxy: OrganizationUnitServiceProxy,
    private _employeeserviceproxy: EmployeeServiceProxy,
    private _industrySectorsServiceProxy: IndustrySectorsServiceProxy,
    private _countriesServiceProxy: CountriesAppserviceServiceProxy,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    super(injector);
    this.selectedRelatedInfo = 'Business Management';
  }

  ngOnInit() {
    debugger;
    this.getcountry();
    this.getIndustrySectors();

    this.route.queryParams.subscribe((params) => {
      this.recordId = params['recordId'];
    });

    if (this.recordId) {
      this.isEdit = true;
      this.getOrganizationRecordForEdit(this.recordId);
    } else {
      this.isEdit = false;
      this.getNextCompanyId();
    }
  }

  getAllEmployee(orgid) {
    debugger;
    this._employeeserviceproxy
      .getAllEmployeeOraganization(orgid)
      .subscribe((result) => {
        debugger;
        this.employee = result;
      });
  }

  getMessage($event) {
    this.organizationItem.phone = $event;
  }
  PrimaryContactNameChange(event) {
    debugger;
    this.organizationItem.primaryContactId = event.id;
  }
  CompanyAdminChange(event) {
    debugger;
    this.organizationItem.companyAdministratorId = event.id;
  }
  getcountry() {
    this._countriesServiceProxy.getAll().subscribe((result) => {
      this.country = result;
      this.addressCountry = result;
    });
  }
  getIndustrySectors() {
    this._industrySectorsServiceProxy.getAll().subscribe((result) => {
      this.industrySectors = result;
    });
  }

  getOrganizationRecordForEdit(recordId: number): void {
    this._organizationServiceProxy
      .getOrganizationForEdit(recordId)
      .subscribe((res) => {
        debugger;
        this.organizationItem = res;
        this.phones = res.phone;
        this.getAllEmployee(res.id);
        this.onOrgLevelChange(res);
      });
  }

  onOrgLevelChange(event): void {
    if (this.isEdit) {
      if (event.leveltype !== 1) {
        this._organizationUnitServiceProxy
          .getOrganizationUnitBaseOnLevel(event.leveltype)
          .subscribe((res) => {
            this.parentOrganizationList = res;
          });
      }
    } else {
      if (event.id !== 1) {
        this.parentOrganizationList = [];
        this.organizationItem.parentOrganizationId = null;
        this._organizationUnitServiceProxy
          .getOrganizationUnitBaseOnLevel(event.id)
          .subscribe((res) => {
            debugger;
            this.parentOrganizationList = res;
          });
      }
    }
  }

  save(): void {
    // this.organizationItem.phone=
    this._organizationServiceProxy
      .createOrUpdateOrganizationSetup(this.organizationItem)
      .subscribe((res) => {
        if (this.isEdit) {
          abp.notify.success(this.l('SuccessfullyUpdated'));
        } else {
          abp.notify.success(this.l('SavedSuccessfully'));
        }
        this._router.navigate([
          '/app/admin/organization-setup/organization-entities',
        ]);
      });
  }

  backToOrgSetup(): void {
    this._router.navigate([
      '/app/admin/organization-setup/organization-entities',
    ]);
  }

  getNextCompanyId() {
    //this._organizationServiceProxy.getNextCompanyId().subscribe(res => {
    //    if (res !== '') {
    //        this.organizationItem.companyId = res;
    //    }
    //});
  }
}
