import { AfterViewChecked, Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, OrganizationUnitDto, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
    
import { ContractServiceProxy, ContractITServiceDto, BusinessServiceOwner, ContractEmployeeDto, ContractBusinessProcessDto, ContractBusinessServiceDto, VendorsDto, GetDynamicValueDto, GetOrganizationDto,ContractDto, BusinessProcessDetailDto, ITserviceListDto, BusinessServiceSDto} from '@shared/service-proxies/service-proxies';
import { ActivatedRoute, Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts/release/utils';


@Component({
    selector: 'add-edit-all-contracts',
    templateUrl: './add-edit-all-contracts.component.html',
    styleUrls: ['./add-edit-all-contracts.component.scss']
})
export class AddEditAllContractsComponent extends AppComponentBase {

    recordId: any;
    isEdit: boolean;
    sampleDate: Date;
    text: any;

    contract: ContractDto = new ContractDto();

    businessProcess: BusinessProcessDetailDto[] = [];
    selectedBusinessProcess: BusinessProcessDetailDto[] = [];

    businessService: BusinessServiceSDto[] = [];
    selectedBusinessService: BusinessServiceSDto[] = [];

    businessItService: ITserviceListDto[] = [];
    selectedBusinessItservice: ITserviceListDto[] = [];

    employee: BusinessServiceOwner[] = [];
    selectedEmployee: BusinessServiceOwner = new BusinessServiceOwner();

    employeeNotification: BusinessServiceOwner[] = [];
    selectedemployeeNotification: BusinessServiceOwner[] = [];

    organization: GetOrganizationDto[] = [];
    selectedOrganization: GetOrganizationDto = new GetOrganizationDto();

    vendor: VendorsDto[] = [];
    selectedVendor: VendorsDto = new VendorsDto();

    contractType: GetDynamicValueDto[] = [];
    selectedContractType: GetDynamicValueDto = new GetDynamicValueDto();

    contractCategorys: GetDynamicValueDto[] = [];
    selectedcontractCategorys: GetDynamicValueDto = new GetDynamicValueDto();



    constructor(
        injector: Injector,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _contractService: ContractServiceProxy,
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
            this.getAllContractInfo(this.recordId);
        }
        else
        {
            this.isEdit = false;
            this.getAllContractInfo(this.recordId);
        }
    }

    getAllContractInfo(recordId) {
        this._contractService.getAllContractInfo(recordId).subscribe(res => {
            this.contract = res;
            this.businessProcess = res.businessProcess;
            this.businessService = res.businessServices;
            this.businessItService = res.iTserviceLists;
            this.contractCategorys = res.contractCategorys;
            this.contractType = res.contractTypes;
            this.employee = res.employeesList;
            this.vendor = res.vendors;
            this.organization = res.companyLists;
            this.employeeNotification = res.employeesList;
            if (this.isEdit)
            {
                this.getalledit();
            }

        });
    }

    contractTypeChange(event)
    {
        this.contract.contractTypeId = event.value.id;
    }
   
    itServiceChange(event)
    {
        
        this.contract.selectedContractITService = [];
        event.value.forEach(obj => {
            var item = new ContractITServiceDto();
            item.id = 0;
            item.contractId = 0;
            item.itServiceId = obj.id;
            this.contract.selectedContractITService.push(item);
        })                
    }

    businessserviceChange(event)
    {
        this.contract.selectedContractBusinessService = [];
        event.value.forEach(obj => {
            var item = new ContractBusinessServiceDto();
            item.id = 0;
            item.contractId = 0;
            item.businessServiceId = obj.id;
            this.contract.selectedContractBusinessService.push(item);
        })        
    }

    businessProcessChange(event) {
        this.contract.selectedContractBusinessProcess = [];
        event.value.forEach(obj => {
            var item = new ContractBusinessProcessDto();
            item.id = 0;
            item.contractId = 0;
            item.businessProcessId = obj.id;
            this.contract.selectedContractBusinessProcess.push(item);
        })
    }

    notificationsChange(event) {
        this.contract.selectedContractEmployeeNotification = [];
        event.value.forEach(obj => {
            var item = new ContractEmployeeDto();
            item.id = 0;
            item.contractId = 0;
            item.employeeId = obj.id;
            this.contract.selectedContractEmployeeNotification.push(item);
        })
    }
   
    ContractCategoryChange(event)
    {
        this.contract.contractCategoryId = event.value.id;
    }

    vendorChange(event)
    {
        this.contract.vendorId = event.value.id;
    }

    organizationChange(event) {
        this.contract.lockThreatOrganizationId = event.value.id;
    }

    ContractOwnerChange(event)
    {
        this.contract.employeeId = event.value.id;
    }

    getalledit() {
        this.editBusinessITService();
        this.editBusinessProcess();
        this.editBusinessService();
        this.editcontractCategory();
        this.editContractType();
        this.editemployee();
        this.editemployeeNotification();
        this.editOrganization();
        this.editvendor();
    }

    editContractType()
    {
        this.selectedContractType = null;
        this.contractType.forEach(obj => {
            if (obj.id == this.contract.contractTypeId) {
                this.selectedContractType = obj;
            }
        })
    }

    editvendor() {
        this.selectedVendor = null;
        this.vendor.forEach(obj => {
            if (obj.id == this.contract.vendorId) {
                this.selectedVendor = obj;
            }
        })
    }

    editcontractCategory() {
        this.selectedcontractCategorys = null;
        this.contractCategorys.forEach(obj => {
            if (obj.id == this.contract.contractCategoryId) {
                this.selectedcontractCategorys = obj;
            }
        })
    }

    editBusinessITService() {
        this.selectedBusinessItservice = [];
        this.contract.selectedContractITService.forEach(obj => {
            this.businessItService.forEach(team => {
                if (obj.itServiceId == team.id) {
                    var temp = new ITserviceListDto();
                    temp.id = team.id;
                    temp.itServicesId = team.itServicesId;
                    temp.itServiceName = team.itServiceName;
                    this.selectedBusinessItservice.push(temp);
                }
            });
        });
    }

    editBusinessProcess() {
        this.selectedBusinessProcess = [];
        this.contract.selectedContractBusinessProcess.forEach(obj => {
            this.businessProcess.forEach(team => {
                if (obj.businessProcessId == team.id) {
                    var temp = new BusinessProcessDetailDto();
                    temp.id = team.id;
                    temp.businessProcessName = team.businessProcessName;
                    this.selectedBusinessProcess.push(temp);
                }
            });
        });
    }

    editBusinessService()
    {
        this.selectedBusinessService = [];
        this.contract.selectedContractBusinessService.forEach(obj => {
            this.businessService.forEach(team => {
                if (obj.businessServiceId == team.id) {
                    var temp = new BusinessServiceSDto();
                    temp.id = team.id;
                    temp.businessServiceName = team.businessServiceName;
                    this.selectedBusinessService.push(temp);
                }
            });
        });
    }

    editOrganization()
    {
        this.selectedOrganization = null;
        this.organization.forEach(obj => {
            if (obj.id == this.contract.lockThreatOrganizationId) {
                this.selectedOrganization = obj;
            }
        })
    }

    editemployee() {
        this.selectedEmployee = null;
        this.employee.forEach(obj => {
            if (obj.id == this.contract.employeeId) {
                this.selectedEmployee = obj;
            }
        })
    }

    editemployeeNotification()
    {
        this.selectedemployeeNotification = [];
        this.contract.selectedContractEmployeeNotification.forEach(obj => {
            this.employeeNotification.forEach(team => {
                if (obj.employeeId == team.id) {
                    var temp = new BusinessServiceOwner();
                    temp.id = team.id;
                    temp.employeeName = team.employeeName;
                    temp.organizationId = team.organizationId;
                    this.selectedemployeeNotification.push(temp);
                }
            });
        });
    }
    
    saveContracts() {

        this._contractService.createOrUpdateContract(this.contract).subscribe(res => {

            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            } else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/all-contracts']);

        });   
    }


}
