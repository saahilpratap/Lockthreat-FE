import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { CountoModule } from 'angular2-counto';
import {
  ModalModule,
  TabsModule,
  TooltipModule,
  BsDropdownModule,
  PopoverModule,
} from 'ngx-bootstrap';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BusinessServicesComponent } from './organization/business-management/business-services/business-services.component';
import { OrganizationDashboardComponent } from './organization/organization-dashboard/organization-dashboard.component';
import { OrganizationSetupComponent } from './organization/organization-setup/organization-setup.component';
import { BusinessManagementComponent } from './organization/business-management/business-management.component';
import { BusinessProcessComponent } from './organization/business-management/business-process/business-process.component';
import { AddNewProcessComponent } from './organization/business-management/business-process/add-new-process/add-new-process.component';
import { AddNewServicesComponent } from './organization/business-management/business-services/add-new-services/add-new-services.component';
import { HomeDashboardComponent } from './home/home-dashboard/home-dashboard.component';
import { MyDashboardComponent } from './home/my-dashboard/my-dashboard.component';
import { AddNewTaskComponent } from './home/add-new-task/task/add-new-task.component';
import { KeyPerformanceIndicatorsComponent } from './organization/business-management/key-performance-indicators/key-performance-indicators.component';
import { KeyRiskIndicatorsComponent } from './organization/business-management/key-risk-indicators/key-risk-indicators.component';
import { ActiveAuditsComponent } from './audit-management/active-audits/active-audits.component';
import { AddEditAuditComponent } from './audit-management/active-audits/add-edit-audit/add-edit-audit.component';
import { ProjectManagementDashboardComponent } from './project-management/project-management-dashboard/project-management-dashboard.component';
import { AddEditProjectComponent } from './project-management/project-management-dashboard/add-edit-project/add-edit-project.component';
import { AddEditMyProgramComponent } from './project-management/project-management-dashboard/add-edit-my-program/add-edit-my-program.component';
import { PolicyAwarenessDashboardComponent } from './policy-awareness/policy-awareness-dashboard/policy-awareness-dashboard.component';
import { AddEditReviewQuestionnaireComponent } from './policy-awareness/policy-awareness-dashboard/add-edit-review-questionnaire/add-edit-review-questionnaire.component';
import { AddFindingsComponent } from './home/add-findings/finding/add-findings.component';
import { AddMeetingComponent } from './home/add-meeting/meeting/add-meeting.component';
import { AllExceptionComponent } from './home/all-exception/all-exception.component';
import { AddEditExceptionComponent } from './home/all-exception/add-edit-exception/add-edit-exception.component';
import { AddEditOrganizationComponent } from './organization/add-edit-organization/add-edit-organization.component';
import { AddEditKeyPerformanceIndicatorsViewComponent } from './organization/business-management/key-performance-indicators/add-edit-key-performance-indicators-view/add-edit-key-performance-indicators-view.component';
import { AddEditKeyRiskIndicatorsViewComponent } from './organization/business-management/key-risk-indicators/add-edit-key-risk-indicators-view/add-edit-key-risk-indicators-view.component';
import { StrategicObjectivesComponent } from './organization/business-management/strategic-objectives/strategic-objectives.component';
import { AddEditStrategicObjectivesComponent } from './organization/business-management/strategic-objectives/add-edit-strategic-objectives/add-edit-strategic-objectives.component';
import { BulkEditBusinessServicesModalComponent } from './organization/business-management/business-services/bulk-edit-business-services/bulk-edit-business-services-modal.component';
import { BulkEditBusinessProcessModalComponent } from './organization/business-management/business-process/bulk-edit-business-process/bulk-edit-business-process-modal.component';
import { ITServicesComponent } from './organization/business-management/it-services-management/it-services.component';
import { BulkEditItServicesModalComponent } from './organization/business-management/it-services-management/bulk-edit-it-services/bulk-edit-it-services-modal.component';
import { AddNewItServicesComponent } from './organization/business-management/it-services-management/add-new-it-services/add-new-it-services.component';
import { BulkEditKeyPerformanceIndicatorsModalComponent } from './organization/business-management/key-performance-indicators/bulk-edit-key-performance-indicators/bulk-edit-key-performance-indicators-modal.component';
import { BulkEditKeyRiskIndicatorsModalComponent } from './organization/business-management/key-risk-indicators/bulk-edit-key-risk-indicators/bulk-edit-key-risk-indicators-modal.component';
import { BulkEditStrategicObjectivesComponent } from './organization/business-management/strategic-objectives/bulk-edit-strategic-objectives/bulk-edit-strategic-objectives-modal.component';
import { AssetManagementComponent } from './asset-management/asset-management.component';
import { FacilitiesDataCenterComponent } from './asset-management/facilities-datacenter/facilities-datacenter.component';
import { HardwareAssetsComponent } from './asset-management/hardware-assets/hardware-assets.component';
import { InformationAssetsComponent } from './asset-management/information-assets/information-assets.component';
import { SystemsApplicationsComponent } from './asset-management/systems-applications/systems-applications.component';
import { VirtualAssetManagerComponent } from './asset-management/virtual-asset-manager/virtual-asset-manager.component';
import { AddEditFacilitiesDatacenterComponent } from './asset-management/facilities-datacenter/add-edit-facilities-datacenter/add-edit-facilities-datacenter.component';
import { AddEditHardwareAssetsComponent } from './asset-management/hardware-assets/add-edit-hardware-assets/add-edit-hardware-assets.component';
import { AddEdItinformationAssetsComponent } from './asset-management/information-assets/add-edit-information-assets/add-edit-information-assets.component';
import { AddEditSystemsApplicationsComponent } from './asset-management/systems-applications/add-edit-systems-applications/add-edit-systems-applications.component';
import { AddEditVirtualAssetManagerComponent } from './asset-management/virtual-asset-manager/add-edit-virtual-asset-manager/add-edit-virtual-asset-manager.component';
import { BulkEditFacilitiesDatacenterModalComponent } from './asset-management/facilities-datacenter/bulk-edit-facilities-datacenter/bulk-edit-facilities-datacenter-modal.component';
import { BulkEditHardwareAssetsModalComponent } from './asset-management/hardware-assets/bulk-edit-hardware-assets/bulk-edit-hardware-assets-modal.component';
import { BulkEditInformationAssetsModalComponent } from './asset-management/information-assets/bulk-edit-information-assets/bulk-edit-information-assets-modal.component';
import { BulkEditSystemsApplicationsModalComponent } from './asset-management/systems-applications/bulk-edit-systems-applications/bulk-edit-systems-applications-modal.component';
import { BulkEditVirtualAssetManagerModalComponent } from './asset-management/virtual-asset-manager/bulk-edit-virtual-asset-manager/bulk-edit-virtual-asset-manager-modal.component';
import { RiskManagementDashboardComponent } from './enterprise-risk-manager/risk-management-dashboard/risk-management-dashboard.component';
import { RiskManagementComponent } from './enterprise-risk-manager/risk-management/risk-management.component';
import { RiskTreatmentPlansComponent } from './enterprise-risk-manager/risk-treatment-plans/risk-treatment-plans.component';
import { RemediationPlansComponent } from './enterprise-risk-manager/remediation-plans/remediation-plans.component';
import { AddNewRiskManagementComponent } from './enterprise-risk-manager/risk-management/add-risk-management/add-risk-management.component';
import { AddNewRiskTreatmentPlansComponent } from './enterprise-risk-manager/risk-treatment-plans/add-risk-treatment-plans/add-risk-treatment-plans.component';
import { allMinutesMeetingComponent } from './home/add-meeting/all-minutes-meeting.component';
import { alltaskComponent } from './home/add-new-task/all-task.component';
import { AddnewDyanamicParametercomponent } from './dynamicparameter-import/add-new-DyanamicParameter.component';
import { ThirdPartyDashboardComponent } from './third-party-dashboard/third-party-dashboard.component';
import { AllVendorsComponent } from './third-party-dashboard/vendors/vendors.component';
import { AddNewVendorsComponent } from './third-party-dashboard/vendors/add-new-vendors/add-new-vendors.component';
import { AllContactsComponent } from './third-party-dashboard/contacts/contacts.component';
import { AddNewContactsComponent } from './third-party-dashboard/contacts/add-new-contacts/add-new-contacts.component';
import { AllContractsComponent } from './third-party-dashboard/contracts/contracts.component';
import { AddNewContractComponent } from './third-party-dashboard/contracts/add-new-contracts/add-new-contracts.component';
import { IncidentManagementDashboardComponent } from './incident-management/incident-management-dashboard/incident-management-dashboard.component';
import { allFindingComponent } from './home/add-findings/all-finding.component';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
  BsDaterangepickerConfig,
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgDragDropModule } from 'ng-drag-drop';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { ngfModule } from 'angular-file';
import { AccordionModule } from 'primeng/accordion';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MultiSelectModule } from 'primeng/multiselect';
import { IncidentsComponent } from './incident-management/incidents/incidents.component';
import { AddEditIncidentsComponent } from './incident-management/incidents/add-edit-incidents/add-edit-incidents.component';
import { BulkEditIncidentsComponent } from './incident-management/incidents/bulk-edit-incidents/bulk-edit-incidents.component';
import { AllOrganizationPoliciesComponent } from './policy-awareness/all-organization-policies/all-organization-policies.component';
import { AddEditOrganizationPoliciesComponent } from './policy-awareness/all-organization-policies/add-edit-organization-policies/add-edit-organization-policies.component';
import { BulkEditOrganizationPoliciesComponent } from './policy-awareness/all-organization-policies/bulk-edit-organization-policies/bulk-edit-organization-policies.component';
import { ComplianceManagerDashboardComponent } from './ComplianceManager/compliance-manager-dashboard/compliance-manager-dashboard.component';
import { CitationsReportsComponent } from './ComplianceManager/compliance-manager-dashboard/citations-reports/citations-reports.component';
import { AddEditCitationsReportsComponent } from './ComplianceManager/compliance-manager-dashboard/citations-reports/add-edit-citations-reports/add-edit-citations-reports.component';
import { BulkEditCitationsReportsComponent } from './ComplianceManager/compliance-manager-dashboard/citations-reports/bulk-edit-citations-reports/bulk-edit-citations-reports.component';

NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    TabsModule,
    TooltipModule,
    AppCommonModule,
    UtilsModule,
    MainRoutingModule,
    CountoModule,
    NgxChartsModule,
    TableModule,
    PaginatorModule,
    AutoCompleteModule,
    EditorModule,
    InputMaskModule,
    TreeModule,
    DragDropModule,
    ContextMenuModule,
    DialogModule,
    CheckboxModule,
    DropdownModule,
    FileUploadModule,
    NgDragDropModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    AngularFileUploaderModule,
    ngfModule,
    AccordionModule,
    PerfectScrollbarModule,
    InputSwitchModule,
    AppBsModalModule,
    AccordionModule,
    NgSelectModule,
    MultiSelectModule,
  ],

  declarations: [
    DashboardComponent,
    BusinessServicesComponent,
    OrganizationDashboardComponent,
    OrganizationSetupComponent,
    BusinessManagementComponent,
    BusinessProcessComponent,
    AddNewProcessComponent,
    AddNewServicesComponent,
    HomeDashboardComponent,
    MyDashboardComponent,
    AddNewTaskComponent,
    KeyPerformanceIndicatorsComponent,
    KeyRiskIndicatorsComponent,
    ActiveAuditsComponent,
    AddEditAuditComponent,
    ProjectManagementDashboardComponent,
    AddEditProjectComponent,
    AddEditMyProgramComponent,
    AddEditKeyPerformanceIndicatorsViewComponent,
    PolicyAwarenessDashboardComponent,
    AddEditReviewQuestionnaireComponent,
    AddFindingsComponent,
    AddMeetingComponent,
    AllExceptionComponent,
    AddEditExceptionComponent,
    AddEditOrganizationComponent,
    AddEditKeyRiskIndicatorsViewComponent,
    StrategicObjectivesComponent,
    AddEditStrategicObjectivesComponent,
    BulkEditBusinessProcessModalComponent,
    BulkEditBusinessServicesModalComponent,
    ITServicesComponent,
    BulkEditItServicesModalComponent,
    AddNewItServicesComponent,
    BulkEditKeyPerformanceIndicatorsModalComponent,
    BulkEditKeyRiskIndicatorsModalComponent,
    BulkEditStrategicObjectivesComponent,
    AssetManagementComponent,
    FacilitiesDataCenterComponent,
    HardwareAssetsComponent,
    InformationAssetsComponent,
    SystemsApplicationsComponent,
    VirtualAssetManagerComponent,
    AddEditHardwareAssetsComponent,
    AddEdItinformationAssetsComponent,
    AddEditSystemsApplicationsComponent,
    AddEditVirtualAssetManagerComponent,
    BulkEditFacilitiesDatacenterModalComponent,
    BulkEditHardwareAssetsModalComponent,
    BulkEditInformationAssetsModalComponent,
    BulkEditSystemsApplicationsModalComponent,
    BulkEditVirtualAssetManagerModalComponent,
    AddEditFacilitiesDatacenterComponent,
    RiskManagementDashboardComponent,
    RiskManagementComponent,
    RiskTreatmentPlansComponent,
    RemediationPlansComponent,
    AddNewRiskManagementComponent,
    AddNewRiskTreatmentPlansComponent,
    AddnewDyanamicParametercomponent,
    allMinutesMeetingComponent,
    alltaskComponent,
    ThirdPartyDashboardComponent,
    AllVendorsComponent,
    AddNewVendorsComponent,
    AllContactsComponent,
    AddNewContactsComponent,
    AllContractsComponent,
    AddNewContractComponent,
    allFindingComponent,
    IncidentManagementDashboardComponent,
    AddEditIncidentsComponent,
    IncidentsComponent,
    BulkEditIncidentsComponent,
    AllOrganizationPoliciesComponent,
    AddEditOrganizationPoliciesComponent,
    BulkEditOrganizationPoliciesComponent,
    ComplianceManagerDashboardComponent,
    CitationsReportsComponent,
    AddEditCitationsReportsComponent,
    BulkEditCitationsReportsComponent,
  ],
  exports: [
    BusinessServicesComponent,
    ITServicesComponent,
    ActiveAuditsComponent,
    RiskManagementComponent,
    RiskTreatmentPlansComponent,
    CitationsReportsComponent
  ],
  providers: [
    {
      provide: BsDatepickerConfig,
      useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig,
    },
    {
      provide: BsDaterangepickerConfig,
      useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig,
    },
    {
      provide: BsLocaleService,
      useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  entryComponents: [],
})
export class MainModule {}
