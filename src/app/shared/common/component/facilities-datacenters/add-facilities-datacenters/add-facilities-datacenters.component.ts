import {
  Component,
  Injector,
} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
  FacilitieDatacenterServiceProxy,
  FacilitieDatacenterDto,
  GetDynamicValueDto,
  BusinessServiceOwner,
  CountryDto,
  ITserviceListDto,
  BusinessProcessDetailDto,
  BusinessServiceSDto,
  GetOrganizationDto,
  BusinessUnitPrimaryDto,
} from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiselectDropdownService } from '../../common-services/multiselect-dropdown-service.service';

@Component({
  selector: 'add-facilities-datacenters',
  templateUrl: './add-facilities-datacenters.component.html',
  styleUrls: ['./add-facilities-datacenters.component.scss'],
})
export class AddFacilitiesDatacentersComponent extends AppComponentBase {
  text: any;
  recordId: any;
  isEdit: boolean;
  oraganizationId: any;

  facilityType: GetDynamicValueDto[] = [];
  selectedfacilityType: GetDynamicValueDto = new GetDynamicValueDto();

  integrity: GetDynamicValueDto[] = [];
  selectedintegrity: GetDynamicValueDto = new GetDynamicValueDto();

  others: GetDynamicValueDto[] = [];
  selectedothers: GetDynamicValueDto = new GetDynamicValueDto();

  Confidentiality: GetDynamicValueDto[] = [];
  selectedConfidentiality: GetDynamicValueDto = new GetDynamicValueDto();

  availibility: GetDynamicValueDto[] = [];
  selectedAvailibility: GetDynamicValueDto = new GetDynamicValueDto();

  organization: GetOrganizationDto[] = [];
  selectedOrganization: GetOrganizationDto = new GetOrganizationDto();

  businessUnitOwner: BusinessUnitPrimaryDto[] = [];
  selectedbusinessUnitOwner: BusinessUnitPrimaryDto = new BusinessUnitPrimaryDto();

  BusinessUnitOwners: BusinessUnitPrimaryDto[] = [];

  businessUnitGaurdian: BusinessUnitPrimaryDto[] = [];
  selectedbusinessUnitGaurdian: BusinessUnitPrimaryDto = new BusinessUnitPrimaryDto();

  businessProcess: BusinessProcessDetailDto[] = [];
  selectedbusinessProcess: BusinessProcessDetailDto[] = [];

  businessService: BusinessServiceSDto[] = [];
  selectedBusinessService: BusinessServiceSDto[] = [];

  itservice: ITserviceListDto[] = [];
  selectedItservice: ITserviceListDto[] = [];

  country: CountryDto[] = [];
  selectedCountry: CountryDto = new CountryDto();

  facilitieDatacenter: FacilitieDatacenterDto = new FacilitieDatacenterDto();

  assetOwner: BusinessServiceOwner[] = [];
  selectedAssetOwner: BusinessServiceOwner = new BusinessServiceOwner();

  constructor(
    injector: Injector,
    private _router: Router,
    private _facilitiesDatacenterServiceProxy: FacilitieDatacenterServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _commonMultiDropdownService: MultiselectDropdownService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.facilitieDatacenter.businessUnitOwners = [];
    this._activatedRoute.queryParams.subscribe((params) => {
      this.recordId = params['recordId'];
    });
    if (this.recordId) {
      this.isEdit = true;
      this.getAllfacilitiesDataCenter(this.recordId);
    } else {
      this.isEdit = false;
      this.getAllfacilitiesDataCenter(this.recordId);
    }
  }

  getAllfacilitiesDataCenter(recordId) {
    this._facilitiesDatacenterServiceProxy
      .getAllFacilitieDatacenterInfo(recordId)
      .subscribe((result) => {
        this.facilitieDatacenter = result;
        this.itservice = result.iTserviceLists;
        this.businessProcess = result.businessProcess;
        this.businessService = result.businessServices;
        this.availibility = result.availibilitys;
        this.others = result.otheres;
        this.integrity = result.integritys;
        this.Confidentiality = result.confidentialitys;
        // this.BusinessUnitOwners = result.businessUnitOwners;
        this.organization = result.companyLists;
        this.facilityType = result.facilityTypes;
        this.businessUnitGaurdian = result.businessUnitGaurdians;
        this.country = result.countries;
        this.assetOwner = result.employeesList;
        this.facilitieDatacenter.selectedFacilitieDatacenterITServices =
          this.facilitieDatacenter.selectedFacilitieDatacenterITServices ==
          undefined
            ? []
            : this.facilitieDatacenter.selectedFacilitieDatacenterITServices;
        this.facilitieDatacenter.selectedFacilitieDatacenterProcess =
          this.facilitieDatacenter.selectedFacilitieDatacenterProcess ==
          undefined
            ? []
            : this.facilitieDatacenter.selectedFacilitieDatacenterProcess;
        this.facilitieDatacenter.selectedFacilitieDatacenterServices =
          this.facilitieDatacenter.selectedFacilitieDatacenterServices ==
          undefined
            ? []
            : this.facilitieDatacenter.selectedFacilitieDatacenterServices;
        this.facilitieDatacenter.removedFacilitieDatacenterITService = [];
        this.facilitieDatacenter.removedFacilitieDatacenterProcess = [];
        this.facilitieDatacenter.removedFacilitieDatacenterService = [];

        if (this.isEdit) {
          this.pushBusinessOwner();
          this.editCountry();
          this.editFacilityType();
          this.editOranization();
          this.editBusinessUnitOwner();
          this.editIntegrity();
          this.editavailibility();
          this.editConfidentiality();
          this.editothers();
          this.editBusinessUnitGaurdian();
          this.editBusinessITService();
          this.editBusinessservice();
          this.editBusinessProcess();
          this.editAssetOwner();
        }
      });
  }

  editAssetOwner() {
    this.selectedAssetOwner = null;
    this.assetOwner.forEach((obj) => {
      if (obj.id == this.facilitieDatacenter.employeeId) {
        this.selectedAssetOwner = obj;
      }
    });
  }

  assetOwnerChange(event) {
    this.facilitieDatacenter.employeeId = event.value.id;
  }

  facilityChange(event) {
    this.facilitieDatacenter.facilityTypeId = event.value.id;
  }

  countryChange(event) {
    this.facilitieDatacenter.countryId = event.value.id;
  }

  oraganizationChange(event) {
    this.businessUnitOwner = [];
    this.selectedbusinessUnitOwner = null;
    this.facilitieDatacenter.lockThreatOrganizationId = event.value.id;

    this.facilitieDatacenter.businessUnitOwnerId = null;
    this.facilitieDatacenter.businessUnitOwners.forEach((obj) => {
      if (obj.lockThreatOrganizationId == event.value.id) {
        this.businessUnitOwner.push(obj);
      }
    });
  }

  businessUnitOwnerChange(event) {
    this.facilitieDatacenter.businessUnitOwnerId = event.value.id;
  }

  businessUnitGaurdianChange(event) {
    this.facilitieDatacenter.businessUnitGaurdianId = event.value.id;
  }

  businessServiceChange(event) {
    this._commonMultiDropdownService
      .filterForfacilitiesDatacenter(
        this.facilitieDatacenter.selectedFacilitieDatacenterServices,
        this.selectedBusinessService,
        this.facilitieDatacenter.removedFacilitieDatacenterService,
        'FCBusinessService',
        this.isEdit
      )
      .then((result: any) => {
        this.facilitieDatacenter.selectedFacilitieDatacenterServices =
          result.selectedItems;
        this.selectedBusinessService = result.dropDownItems;
        this.facilitieDatacenter.removedFacilitieDatacenterService =
          result.removedItems;
      })
      .catch(() => {});
  }

  businessProcessChange(event) {
    this._commonMultiDropdownService
      .filterForfacilitiesDatacenter(
        this.facilitieDatacenter.selectedFacilitieDatacenterProcess,
        this.selectedbusinessProcess,
        this.facilitieDatacenter.removedFacilitieDatacenterProcess,
        'FCBusinessProcess',
        this.isEdit
      )
      .then((result: any) => {
        this.facilitieDatacenter.selectedFacilitieDatacenterProcess =
          result.selectedItems;
        this.selectedbusinessProcess = result.dropDownItems;
        this.facilitieDatacenter.removedFacilitieDatacenterProcess =
          result.removedItems;
      })
      .catch(() => {});
  }

  itserviceChange(event) {
    this._commonMultiDropdownService
      .filterForfacilitiesDatacenter(
        this.facilitieDatacenter.selectedFacilitieDatacenterITServices,
        this.selectedItservice,
        this.facilitieDatacenter.removedFacilitieDatacenterITService,
        'FCITservice',
        this.isEdit
      )
      .then((result: any) => {
        this.facilitieDatacenter.selectedFacilitieDatacenterITServices =
          result.selectedItems;
        this.selectedItservice = result.dropDownItems;
        this.facilitieDatacenter.removedFacilitieDatacenterITService =
          result.removedItems;
      })
      .catch(() => {});
  }

  confidentialityChange(event) {
    this.facilitieDatacenter.confidentialityId = event.value.id;
  }

  availibilityChange(event) {
    this.facilitieDatacenter.availibilityId = event.value.id;
  }

  integrityChange(event) {
    this.facilitieDatacenter.integrityId = event.value.id;
  }

  othersChange(event) {
    this.facilitieDatacenter.othersId = event.value.id;
  }

  editCountry() {
    this.selectedCountry = null;
    this.country.forEach((obj) => {
      if (obj.id == this.facilitieDatacenter.countryId) {
        this.selectedCountry = obj;
      }
    });
  }

  editOranization() {
    this.selectedOrganization = null;
    this.organization.forEach((obj) => {
      if (obj.id == this.facilitieDatacenter.lockThreatOrganizationId) {
        this.selectedOrganization = obj;
      }
    });
  }

  editFacilityType() {
    this.selectedfacilityType = null;
    this.facilityType.forEach((obj) => {
      if (obj.id == this.facilitieDatacenter.facilityTypeId) {
        this.selectedfacilityType = obj;
      }
    });
  }

  editIntegrity() {
    this.selectedintegrity = null;
    this.integrity.forEach((obj) => {
      if (obj.id == this.facilitieDatacenter.integrityId) {
        this.selectedintegrity = obj;
      }
    });
  }

  editavailibility() {
    this.selectedAvailibility = null;
    this.availibility.forEach((obj) => {
      if (obj.id == this.facilitieDatacenter.availibilityId) {
        this.selectedAvailibility = obj;
      }
    });
  }

  editConfidentiality() {
    this.selectedConfidentiality = null;
    this.Confidentiality.forEach((obj) => {
      if (obj.id == this.facilitieDatacenter.confidentialityId) {
        this.selectedConfidentiality = obj;
      }
    });
  }

  editothers() {
    this.selectedothers = null;
    this.others.forEach((obj) => {
      if (obj.id == this.facilitieDatacenter.othersId) {
        this.selectedothers = obj;
      }
    });
  }

  pushBusinessOwner() {
    this.businessUnitOwner = [];
    this.facilitieDatacenter.businessUnitOwners.forEach((obj) => {
      if (
        obj.lockThreatOrganizationId ==
        this.facilitieDatacenter.lockThreatOrganizationId
      ) {
        this.businessUnitOwner.push(obj);
      }
    });
  }

  editBusinessUnitOwner() {
    this.selectedbusinessUnitOwner = null;
    this.businessUnitOwner.forEach((obj) => {
      if (obj.id == this.facilitieDatacenter.businessUnitOwnerId) {
        this.selectedbusinessUnitOwner = obj;
      }
    });
  }

  editBusinessUnitGaurdian() {
    this.selectedbusinessUnitGaurdian = null;
    this.businessUnitGaurdian.forEach((obj) => {
      if (obj.id == this.facilitieDatacenter.businessUnitGaurdianId) {
        this.selectedbusinessUnitGaurdian = obj;
      }
    });
  }

  editBusinessITService() {
    this.selectedItservice = [];
    this.facilitieDatacenter.selectedFacilitieDatacenterITServices.forEach(
      (obj) => {
        this.itservice.forEach((team) => {
          if (obj.itServiceId == team.id) {
            var temp = new ITserviceListDto();
            temp.id = team.id;
            temp.itServicesId = team.itServicesId;
            temp.itServiceName = team.itServiceName;
            this.selectedItservice.push(temp);
          }
        });
      }
    );
  }

  editBusinessProcess() {
    this.selectedbusinessProcess = [];
    this.facilitieDatacenter.selectedFacilitieDatacenterProcess.forEach(
      (obj) => {
        this.businessProcess.forEach((team) => {
          if (obj.businessProcessId == team.id) {
            var temp = new BusinessProcessDetailDto();
            temp.id = team.id;
            temp.businessProcessName = team.businessProcessName;
            this.selectedbusinessProcess.push(temp);
          }
        });
      }
    );
  }

  editBusinessservice() {
    this.selectedBusinessService = [];
    this.facilitieDatacenter.selectedFacilitieDatacenterServices.forEach(
      (obj) => {
        this.businessService.forEach((team) => {
          if (obj.businessServiceId == team.id) {
            var temp = new BusinessServiceSDto();
            temp.id = team.id;
            temp.businessServiceName = team.businessServiceName;
            this.selectedBusinessService.push(temp);
          }
        });
      }
    );
  }

  savefacilitiesDataCenter() {
    this._facilitiesDatacenterServiceProxy
      .createOrUpdateFacilitieDatacenter(this.facilitieDatacenter)
      .subscribe(() => {
        if (this.isEdit) {
          abp.notify.success(this.l('SuccessfullyUpdated'));
        } else {
          abp.notify.success(this.l('SavedSuccessfully'));
        }
        this._router.navigate(['/app/main/facilities-datacenter']);
      });
  }
}
