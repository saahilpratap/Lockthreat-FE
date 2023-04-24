import { AbpModule } from '@abp/abp.module';
import * as ngCommon from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLocalizationService } from '@app/shared/common/localization/app-localization.service';
import { AppNavigationService } from '@app/shared/layout/nav/app-navigation.service';
import { CommonModule } from '@shared/common/common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import {
  ModalModule,
  TabsModule,
  BsDropdownModule,
  BsDatepickerModule,
  BsDatepickerConfig,
  BsDaterangepickerConfig,
} from 'ngx-bootstrap';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { CommonLookupModalComponent } from './lookup/common-lookup-modal.component';
import { EntityTypeHistoryModalComponent } from './entityHistory/entity-type-history-modal.component';
import { EntityChangeDetailModalComponent } from './entityHistory/entity-change-detail-modal.component';
import { DateRangePickerInitialValueSetterDirective } from './timing/date-range-picker-initial-value.directive';
import { DatePickerInitialValueSetterDirective } from './timing/date-picker-initial-value.directive';
import { DateTimeService } from './timing/date-time.service';
import { TimeZoneComboComponent } from './timing/timezone-combo.component';
import { CustomizableDashboardComponent } from './customizable-dashboard/customizable-dashboard.component';
import { WidgetGeneralStatsComponent } from './customizable-dashboard/widgets/widget-general-stats/widget-general-stats.component';
import { DashboardViewConfigurationService } from './customizable-dashboard/dashboard-view-configuration.service';
import { GridsterModule } from 'angular-gridster2';
import { WidgetDailySalesComponent } from './customizable-dashboard/widgets/widget-daily-sales/widget-daily-sales.component';
import { WidgetEditionStatisticsComponent } from './customizable-dashboard/widgets/widget-edition-statistics/widget-edition-statistics.component';
import { WidgetHostTopStatsComponent } from './customizable-dashboard/widgets/widget-host-top-stats/widget-host-top-stats.component';
import { WidgetIncomeStatisticsComponent } from './customizable-dashboard/widgets/widget-income-statistics/widget-income-statistics.component';
import { WidgetMemberActivityComponent } from './customizable-dashboard/widgets/widget-member-activity/widget-member-activity.component';
import { WidgetProfitShareComponent } from './customizable-dashboard/widgets/widget-profit-share/widget-profit-share.component';
import { WidgetRecentTenantsComponent } from './customizable-dashboard/widgets/widget-recent-tenants/widget-recent-tenants.component';
import { WidgetRegionalStatsComponent } from './customizable-dashboard/widgets/widget-regional-stats/widget-regional-stats.component';
import { WidgetSalesSummaryComponent } from './customizable-dashboard/widgets/widget-sales-summary/widget-sales-summary.component';
import { WidgetSubscriptionExpiringTenantsComponent } from './customizable-dashboard/widgets/widget-subscription-expiring-tenants/widget-subscription-expiring-tenants.component';
import { WidgetTopStatsComponent } from './customizable-dashboard/widgets/widget-top-stats/widget-top-stats.component';
import { FilterDateRangePickerComponent } from './customizable-dashboard/filters/filter-date-range-picker/filter-date-range-picker.component';
import { AddWidgetModalComponent } from './customizable-dashboard/add-widget-modal/add-widget-modal.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CountoModule } from 'angular2-counto';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { SingleLineStringInputTypeComponent } from './input-types/single-line-string-input-type/single-line-string-input-type.component';
import { ComboboxInputTypeComponent } from './input-types/combobox-input-type/combobox-input-type.component';
import { CheckboxInputTypeComponent } from './input-types/checkbox-input-type/checkbox-input-type.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CommonHeaderComponent } from './ui-components/common-header/common-header.component';
import { FormHeaderComponent } from './ui-components/form-header/form-header.component';
import { IntlTelInputComponent } from './ui-components/intl-tel-input/intl-tel-input.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { GridViewAssociatedPogramsComponent } from './component/associated-pograms/grid-view-associated-pograms/grid-view-associated-pograms.component';
import { AddEditAssociatedPogramsComponent } from './component/associated-pograms/add-edit-associated-pograms/add-edit-associated-pograms.component';
import { AssociatedPogramsModalComponent } from './component/associated-pograms/associated-pograms-modal/associated-pograms-modal.component';
import { AddEditAssociatedProjectComponent } from './component/associated-projects/add-edit-associated-projects/add-edit-associated-projects.component';
import { GridViewAssociatedProjectsComponent } from './component/associated-projects/grid-view-associated-projects/grid-view-associated-projects.component';
import { AssociatedProjectsModalComponent } from './component/associated-projects/associated-projects-modal/associated-projects-modal.component';
import { AddEditBusinessProcessComponent } from './component/business-process/add-edit-business-process/add-edit-business-process.component';
import { GridViewBusinessProcessComponent } from './component/business-process/grid-view-business-process/grid-view-business-process.component';
import { BusinessProcessModalComponent } from './component/business-process/business-process-modal/business-process-modal.component';
import { AddEditBusinessRisksComponent } from './component/business-risks/add-edit-business-risks/add-edit-business-risks.component';
import { GridViewBusinessRisksComponent } from './component/business-risks/grid-view-business-risks/grid-view-business-risks.component';
import { BusinessRisksModalComponent } from './component/business-risks/business-risks-modal/business-risks-modal.component';
import { AddEditBusinessServicesComponent } from './component/business-services/add-edit-business-services/add-edit-business-services.component';
import { GridViewBusinessServicesComponent } from './component/business-services/grid-view-business-services/grid-view-business-services.component';
import { BusinessServicesModalComponent } from './component/business-services/business-services-modal/business-services-modal.component';
import { AddEditBusinessUnitsComponent } from './component/business-units/add-edit-business-units/add-edit-business-units.component';
import { GridViewBusinessUnitsComponent } from './component/business-units/grid-view-business-units/grid-view-business-units-view.component';
import { BusinessUnitsModalComponent } from './component/business-units/business-units-modal/business-units-modal.component';
import { AddEditCompanyContactsComponent } from './component/company-contacts/add-edit-company-contacts/add-edit-company-contacts.component';
import { GridViewCompanyContactsComponent } from './component/company-contacts/grid-view-company-contacts/grid-view-company-contacts.component';
import { CompanyContactsModalComponent } from './component/company-contacts/company-contacts-modal/company-contacts-modal.component';
import { AddEditCompanyEmployeesComponent } from './component/company-employees/add-edit-company-employees/add-edit-company-employees.component';
import { GridViewCompanyEmployeesComponent } from './component/company-employees/grid-view-company-employees/grid-view-company-employees.component';
import { CompanyEmployeesModalComponent } from './component/company-employees/company-employees-modal/company-employees-modal.component';
import { AddAditCompanyObjectivesComponent } from './component/company-objectives/add-edit-company-objectives/add-edit-company-objectives.component';
import { GridViewCompanyObjectivesComponent } from './component/company-objectives/grid-view-company-objectives/grid-view-company-objectives.component';
import { KeyBusinessServicesModalComponent } from './component/company-objectives/company-objectives-modal/company-objectives-modal.component';
import { AddFacilitiesDatacentersComponent } from './component/facilities-datacenters/add-facilities-datacenters/add-facilities-datacenters.component';
import { GridViewFacilitiesDatacentersComponent } from './component/facilities-datacenters/grid-view-facilities-datacenters/grid-view-facilities-datacenters.component';
import { FacilitiesDatacentersModalComponent } from './component/facilities-datacenters/facilities-datacenters-modal/facilities-datacenters-modal.component';
import { AddInformationAssetsComponent } from './component/information-assets/add-edit-information-assets/add-information-assets.component';
import { GridViewInformationAssetsComponent } from './component/information-assets/grid-view-information-assets/grid-view-information-assets.component';
import { InformationAssetsModalComponent } from './component/information-assets/information-assets-modal/information-assets-modal.component';
import { AddEditItServicesComponent } from './component/it-services/add-edit-it-services/add-edit-it-services.component';
import { GridViewKeyITServicesComponent } from './component/it-services/grid-view-it-services/grid-view-it-services.component';
import { ITServicesModalComponent } from './component/it-services/it-services-modal/it-services-modal.component';
import { AddEditKeyPerformanceIndicatorsComponent } from './component/key-performance-indicators/add-edit-key-performance-indicators/add-edit-key-performance-indicators.component';
import { GridViewKeyPerformanceIndicatorsComponent } from './component/key-performance-indicators/grid-view-key-performance-indicators/grid-view-key-performance-indicators.component';
import { KeyPerformanceIndicatorsModalComponent } from './component/key-performance-indicators/key-performance-indicators-modal/key-performance-indicators-modal.component';
import { AddEditKeyRiskIndicatorsComponent } from './component/key-risk-indicators/add-edit-key-risk-indicators/add-edit-key-risk-indicators.component';
import { GridViewKeyRiskIndicatorsComponent } from './component/key-risk-indicators/grid-view-key-risk-indicators/grid-view-key-risk-indicators.component';
import { KeyRiskIndicatorsModalComponent } from './component/key-risk-indicators/key-risk-indicators-modal/key-risk-indicators-modal.component';
import { AddEditRelatedAuthoratativeSourcesComponent } from './component/related-authoratative-sources/add-edit-related-authoratative-sources/add-edit-related-authoratative-sources.component';
import { GridViewRelatedAuthoratativeSourcesComponent } from './component/related-authoratative-sources/grid-view-related-authoratative-sources/grid-view-related-authoratative-sources.component';
import { RelatedAuthoratativeSourcesModalComponent } from './component/related-authoratative-sources/related-authoratative-sources-modal/related-authoratative-sources-modal.component';
import { AddEditRelatedContractsComponent } from './component/related-contracts/add-edit-related-contracts/add-edit-related-contracts.component';
import { GridViewRelatedContractsComponent } from './component/related-contracts/grid-view-related-contracts/grid-view-related-contracts.component';
import { RelatedContractsModalComponent } from './component/related-contracts/related-contracts-modal/related-contracts-modal.component';
import { AddEditRelatedFindingsComponent } from './component/related-findings/add-edit-related-findings/add-edit-related-findings.component';
import { GridViewRelatedFindingsComponent } from './component/related-findings/grid-view-related-findings/grid-view-related-findings.component';
import { RelatedFindingsModalComponent } from './component/related-findings/related-findings-modal/related-findings-modal.component';
import { AddEditRelatedIncidentsComponent } from './component/related-incidents/add-edit-related-incidents/add-edit-related-incidents.component';
import { GridViewRelatedIncidentsComponent } from './component/related-incidents/grid-view-related-incidents/grid-view-related-incidents.component';
import { RelatedIncidentsModalComponent } from './component/related-incidents/related-incidents-modal/related-incidents-modal.component';
import { AddEditReviewDataComponent } from './component/review-data/add-edit-review-data/add-edit-review-data.component';
import { GridViewReviewDataComponent } from './component/review-data/grid-view-review-data/grid-view-review-data.component';
import { ReviewDataModalComponent } from './component/review-data/review-data-modal/review-data-modal.component';
import { AddEditReviewsComponent } from './component/reviews/add-edit-reviews/add-edit-reviews.component';
import { GridViewReviewsComponent } from './component/reviews/grid-reviews/grid-reviews.component';
import { ReviewsModalComponent } from './component/reviews/reviews-modal/reviews-modal.component';
import { AddSystemsApplicationsComponent } from './component/systems-applications/add-edit-systems-applications/add-systems-applications.component';
import { GridViewSystemsApplicationsComponent } from './component/systems-applications/grid-view-systems-applications/grid-view-systems-applications.component';
import { SystemsApplicationsModalComponent } from './component/systems-applications/systems-applications-modal/systems-applications-modal.component';
import { AddEditAllContactsComponent } from './component/all-contacts/add-edit-all-contacts/add-edit-all-contacts.component';
import { AllContactsModalComponent } from './component/all-contacts/all-contacts-modal/all-contacts-modal.component';
import { GridViewAllContactsComponent } from './component/all-contacts/grid-view-all-contacts/grid-view-all-contacts.component';
import { AddEditAllContractsComponent } from './component/all-contracts/add-edit-all-contracts/add-edit-all-contracts.component';
import { AllContractsModalComponent } from './component/all-contracts/all-contracts-modal/all-contracts-modal.component';
import { GridViewAllContractsComponent } from './component/all-contracts/grid-view-all-contracts/grid-view-all-contracts.component';
import { AddEditAllVendorsComponent } from './component/all-vendors/add-edit-all-vendors/add-edit-all-vendors.component';
import { AllVendorsModalComponent } from './component/all-vendors/all-vendors-modal/all-vendors-modal.component';
import { GridViewAllVendorsComponent } from './component/all-vendors/grid-view-all-vendors/grid-view-all-vendors.component';
import { AddEditControlProceduresComponent } from './component/control-procedures/add-edit-control-procedures/add-edit-control-procedures.component';
import { ControlProceduresModalComponent } from './component/control-procedures/control-procedures-modal/control-procedures-modal.component';
import { GridViewControlProceduresComponent } from './component/control-procedures/grid-view-control-procedures/grid-view-control-procedures.component';
import { AddEditMyProgramsComponent } from './component/my-program/add-edit-my-programs/add-edit-my-programs.component';
import { GridViewMyProgramComponent } from './component/my-program/grid-view-my-program/grid-view-my-program.component';
import { MyProgramModalComponent } from './component/my-program/my-program-modal/my-program-modal.component';
import { AddEditMyProjectsComponent } from './component/my-project/add-edit-my-projects/add-edit-my-projects.component';
import { GridViewMyProjectComponent } from './component/my-project/grid-view-my-project/grid-view-my-project.component';
import { MyProjectModalComponent } from './component/my-project/my-project-modal/my-project-modal.component';
import { GridViewHardwareAssetsComponent } from './component/hardware-assets/grid-view-hardware-assets/grid-view-hardware-assets.component';
import { AddHardwareAssetsComponent } from './component/hardware-assets/add-hardware-assets/add-hardware-assets.component';
import { HardwareAssetsModalComponent } from './component/hardware-assets/hardware-assets-modal/hardware-assets-modal.component';
import { AddVirtualAssetManagerComponent } from './component/virtual-asset-manager/add-virtual-asset-manager/add-virtual-asset-manager.component';
import { GridViewVirtualAssetManagerComponent } from './component/virtual-asset-manager/grid-view-virtual-asset-manager/grid-view-virtual-asset-manager.component';
import { VirtualAssetManagerModalComponent } from './component/virtual-asset-manager/virtual-asset-manager-modal/virtual-asset-manager-modal.component';
import { AddEditRiskManagementComponent } from './component/risk-management/add-edit-risk-management/add-edit-risk-management.component';
import { GridViewRiskManagementComponent } from './component/risk-management/grid-view-risk-management/grid-view-risk-management.component';
import { RiskManagementModalComponent } from './component/risk-management/risk-management-modal/risk-management-modal.component';
import { AddEditRiskTreatmentPlansComponent } from './component/risk-treatment-plans/add-edit-risk-treatment-plans/add-edit-risk-treatment-plans.component';
import { GridViewRiskTreatmentPlansComponent } from './component/risk-treatment-plans/grid-view-risk-treatment-plans/grid-view-risk-treatment-plans.component';
import { RiskTreatmentPlansModalComponent } from './component/risk-treatment-plans/risk-treatment-plans-modal/risk-treatment-plans-modal.component';

import { GridViewminutesmeetingComponent } from './component/minutes-meeting/grid-view-minutes-meeting/grid-view-minutes-meeting.component';
import { GridViewtaskComponent } from './component/my-task/grid-view-task/grid-view-task.component';

import { UploadFileComponent } from './component/upload-file/upload-file.component';

import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgDragDropModule } from 'ng-drag-drop';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CheckboxModule } from 'primeng/checkbox';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { ngfModule, ngf } from 'angular-file';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AddEditIncidentComponent } from './component/incidents/add-edit-incident/add-edit-incident.component';
import { GridViewIncidentComponent } from './component/incidents/grid-view-incident/grid-view-incident.component';
import { IncidentModalComponent } from './component/incidents/incident-modal/incident-modal.component';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { AddEditOrganizationPoliciesComponent } from './component/policy-awareness/all-organization-policies/add-edit-organization-policies/add-edit-organization-policies.component';
import { GridViewOrganizationPoliciesComponent } from './component/policy-awareness/all-organization-policies/grid-view-organization-policies/grid-view-organization-policies.component';
import { OrganizationPoliciesModalComponent } from './component/policy-awareness/all-organization-policies/organization-policies-modal/organization-policies-modal.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PolicyContentDataModalComponent } from './component/policy-awareness/all-organization-policies/add-edit-organization-policies/policy-content-data-modal/policy-content-data-modal.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { AddEditCitationsComponent } from './component/compliance-manager/add-edit-citations/add-edit-citations.component';
import { GridViewCitationsComponent } from './component/compliance-manager/grid-view-citations/grid-view-citations.component';
import { CitationsModalComponent } from './component/compliance-manager/citations-modal/citations-modal.component';
import { ControlStandardsModalComponent } from './component/compliance-manager/add-edit-citations/control-standards-modal/control-standards-modal.component';
import { QuestionsLibraryModalComponent } from './component/compliance-manager/add-edit-citations/questions-library-modal/questions-library-modal.component';

@NgModule({
  imports: [
    ngCommon.CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    UtilsModule,
    AbpModule,
    CommonModule,
    TableModule,
    PaginatorModule,
    GridsterModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxChartsModule,
    BsDatepickerModule.forRoot(),
    PerfectScrollbarModule,
    CountoModule,
    AppBsModalModule,
    NgxIntlTelInputModule,
    NgSelectModule,
    EditorModule,
    InputMaskModule,
    TreeModule,
    ContextMenuModule,
    NgDragDropModule,
    DialogModule,
    DragDropModule,
    CheckboxModule,
    AngularFileUploaderModule,
    ngfModule,
    AccordionModule,
    MultiSelectModule,
    InputSwitchModule,
    TooltipModule,
    TabViewModule,
    RadioButtonModule,
    SignaturePadModule,
    CalendarModule,
    FileUploadModule,
  ],
  declarations: [
    TimeZoneComboComponent,
    CommonLookupModalComponent,
    EntityTypeHistoryModalComponent,
    EntityChangeDetailModalComponent,
    DateRangePickerInitialValueSetterDirective,
    DatePickerInitialValueSetterDirective,
    CustomizableDashboardComponent,
    WidgetGeneralStatsComponent,
    WidgetDailySalesComponent,
    WidgetEditionStatisticsComponent,
    WidgetHostTopStatsComponent,
    WidgetIncomeStatisticsComponent,
    WidgetMemberActivityComponent,
    WidgetProfitShareComponent,
    WidgetRecentTenantsComponent,
    WidgetRegionalStatsComponent,
    WidgetSalesSummaryComponent,
    WidgetSubscriptionExpiringTenantsComponent,
    WidgetTopStatsComponent,
    FilterDateRangePickerComponent,
    AddWidgetModalComponent,
    SingleLineStringInputTypeComponent,
    ComboboxInputTypeComponent,
    CheckboxInputTypeComponent,
    CommonHeaderComponent,
    FormHeaderComponent,
    IntlTelInputComponent,
    GridViewAssociatedPogramsComponent,
    AddEditAssociatedPogramsComponent,
    AssociatedPogramsModalComponent,
    AddEditAssociatedProjectComponent,
    GridViewAssociatedProjectsComponent,
    AssociatedProjectsModalComponent,
    AddEditBusinessProcessComponent,
    GridViewBusinessProcessComponent,
    BusinessProcessModalComponent,
    AddEditBusinessRisksComponent,
    GridViewBusinessRisksComponent,
    BusinessRisksModalComponent,
    AddEditBusinessServicesComponent,
    GridViewBusinessServicesComponent,
    BusinessServicesModalComponent,
    AddEditBusinessUnitsComponent,
    GridViewBusinessUnitsComponent,
    BusinessUnitsModalComponent,
    AddEditCompanyContactsComponent,
    GridViewCompanyContactsComponent,
    // AddEditKeyRiskIndicatorsViewComponent,
    CompanyContactsModalComponent,
    AddEditCompanyEmployeesComponent,
    GridViewCompanyEmployeesComponent,
    CompanyEmployeesModalComponent,
    AddAditCompanyObjectivesComponent,
    GridViewCompanyObjectivesComponent,
    KeyBusinessServicesModalComponent,
    AddFacilitiesDatacentersComponent,
    GridViewFacilitiesDatacentersComponent,
    FacilitiesDatacentersModalComponent,
    AddInformationAssetsComponent,
    GridViewInformationAssetsComponent,
    InformationAssetsModalComponent,
    AddEditItServicesComponent,
    GridViewKeyITServicesComponent,
    ITServicesModalComponent,
    AddEditKeyPerformanceIndicatorsComponent,
    GridViewKeyPerformanceIndicatorsComponent,
    KeyPerformanceIndicatorsModalComponent,
    AddEditKeyRiskIndicatorsComponent,
    GridViewKeyRiskIndicatorsComponent,
    KeyRiskIndicatorsModalComponent,
    AddEditRelatedAuthoratativeSourcesComponent,
    GridViewRelatedAuthoratativeSourcesComponent,
    RelatedAuthoratativeSourcesModalComponent,
    AddEditRelatedContractsComponent,
    GridViewRelatedContractsComponent,
    RelatedContractsModalComponent,
    AddEditRelatedFindingsComponent,
    GridViewRelatedFindingsComponent,
    RelatedFindingsModalComponent,
    AddEditRelatedIncidentsComponent,
    GridViewRelatedIncidentsComponent,
    RelatedIncidentsModalComponent,
    AddEditReviewDataComponent,
    GridViewReviewDataComponent,
    ReviewDataModalComponent,
    AddEditReviewsComponent,
    GridViewReviewsComponent,
    ReviewsModalComponent,
    AddSystemsApplicationsComponent,
    GridViewSystemsApplicationsComponent,
    SystemsApplicationsModalComponent,
    GridViewAllContactsComponent,
    AllContactsModalComponent,
    AddEditAllContactsComponent,
    AddEditAllContractsComponent,
    AllContractsModalComponent,
    GridViewAllContractsComponent,
    AddEditAllVendorsComponent,
    AllVendorsModalComponent,
    GridViewAllVendorsComponent,
    AddEditControlProceduresComponent,
    ControlProceduresModalComponent,
    GridViewControlProceduresComponent,
    AddEditMyProgramsComponent,
    GridViewMyProgramComponent,
    MyProgramModalComponent,
    AddEditMyProjectsComponent,
    GridViewMyProjectComponent,
    MyProjectModalComponent,
    GridViewHardwareAssetsComponent,
    AddHardwareAssetsComponent,
    HardwareAssetsModalComponent,
    AddVirtualAssetManagerComponent,
    GridViewVirtualAssetManagerComponent,
    VirtualAssetManagerModalComponent,
    AddEditRiskManagementComponent,
    GridViewRiskManagementComponent,
    RiskManagementModalComponent,
    AddEditRiskTreatmentPlansComponent,
    GridViewRiskTreatmentPlansComponent,
    RiskTreatmentPlansModalComponent,
    UploadFileComponent,
    GridViewminutesmeetingComponent,
    GridViewtaskComponent,
    AddEditIncidentComponent,
    GridViewIncidentComponent,
    IncidentModalComponent,
    AddEditOrganizationPoliciesComponent,
    GridViewOrganizationPoliciesComponent,
    OrganizationPoliciesModalComponent,
    PolicyContentDataModalComponent,
    AddEditCitationsComponent,
    GridViewCitationsComponent,
    CitationsModalComponent,
    ControlStandardsModalComponent,
    QuestionsLibraryModalComponent,
  ],
  exports: [
    TimeZoneComboComponent,
    CommonLookupModalComponent,
    EntityTypeHistoryModalComponent,
    EntityChangeDetailModalComponent,
    DateRangePickerInitialValueSetterDirective,
    DatePickerInitialValueSetterDirective,
    CustomizableDashboardComponent,
    NgxChartsModule,
    CommonHeaderComponent,
    FormHeaderComponent,
    IntlTelInputComponent,
    GridViewAssociatedPogramsComponent,
    AddEditAssociatedPogramsComponent,
    AssociatedPogramsModalComponent,
    AddEditAssociatedProjectComponent,
    GridViewAssociatedProjectsComponent,
    AssociatedProjectsModalComponent,
    AddEditBusinessProcessComponent,
    GridViewBusinessProcessComponent,
    BusinessProcessModalComponent,
    AddEditBusinessRisksComponent,
    GridViewBusinessRisksComponent,
    BusinessRisksModalComponent,
    AddEditBusinessServicesComponent,
    GridViewBusinessServicesComponent,
    BusinessServicesModalComponent,
    AddEditBusinessUnitsComponent,
    GridViewBusinessUnitsComponent,
    BusinessUnitsModalComponent,
    AddEditCompanyContactsComponent,
    GridViewCompanyContactsComponent,
    // AddEditKeyRiskIndicatorsViewComponent,
    CompanyContactsModalComponent,
    AddEditCompanyEmployeesComponent,
    GridViewCompanyEmployeesComponent,
    CompanyEmployeesModalComponent,
    AddAditCompanyObjectivesComponent,
    GridViewCompanyObjectivesComponent,
    KeyBusinessServicesModalComponent,
    AddFacilitiesDatacentersComponent,
    GridViewFacilitiesDatacentersComponent,
    FacilitiesDatacentersModalComponent,
    AddInformationAssetsComponent,
    GridViewInformationAssetsComponent,
    InformationAssetsModalComponent,
    AddEditItServicesComponent,
    GridViewKeyITServicesComponent,
    ITServicesModalComponent,
    AddEditKeyPerformanceIndicatorsComponent,
    GridViewKeyPerformanceIndicatorsComponent,
    KeyPerformanceIndicatorsModalComponent,
    AddEditKeyRiskIndicatorsComponent,
    GridViewKeyRiskIndicatorsComponent,
    KeyRiskIndicatorsModalComponent,
    AddEditRelatedAuthoratativeSourcesComponent,
    GridViewRelatedAuthoratativeSourcesComponent,
    RelatedAuthoratativeSourcesModalComponent,
    AddEditRelatedContractsComponent,
    GridViewRelatedContractsComponent,
    RelatedContractsModalComponent,
    AddEditRelatedFindingsComponent,
    GridViewRelatedFindingsComponent,
    RelatedFindingsModalComponent,
    AddEditRelatedIncidentsComponent,
    GridViewRelatedIncidentsComponent,
    RelatedIncidentsModalComponent,
    AddEditReviewDataComponent,
    GridViewReviewDataComponent,
    ReviewDataModalComponent,
    AddEditReviewsComponent,
    GridViewReviewsComponent,
    ReviewsModalComponent,
    AddSystemsApplicationsComponent,
    GridViewSystemsApplicationsComponent,
    SystemsApplicationsModalComponent,
    GridViewAllContactsComponent,
    AllContactsModalComponent,
    AddEditAllContactsComponent,
    AddEditAllContractsComponent,
    AllContractsModalComponent,
    GridViewAllContractsComponent,
    AddEditAllVendorsComponent,
    AllVendorsModalComponent,
    GridViewAllVendorsComponent,
    AddEditControlProceduresComponent,
    ControlProceduresModalComponent,
    GridViewControlProceduresComponent,
    AddEditMyProgramsComponent,
    GridViewMyProgramComponent,
    MyProgramModalComponent,
    AddEditMyProjectsComponent,
    GridViewMyProjectComponent,
    MyProjectModalComponent,
    GridViewHardwareAssetsComponent,
    AddHardwareAssetsComponent,
    AddVirtualAssetManagerComponent,
    GridViewVirtualAssetManagerComponent,
    AddEditRiskManagementComponent,
    GridViewRiskManagementComponent,
    AddEditRiskTreatmentPlansComponent,
    GridViewRiskTreatmentPlansComponent,
    RiskTreatmentPlansModalComponent,
    GridViewminutesmeetingComponent,
    GridViewtaskComponent,
    UploadFileComponent,
    AddEditIncidentComponent,
    GridViewIncidentComponent,
    IncidentModalComponent,
    AddEditOrganizationPoliciesComponent,
    GridViewOrganizationPoliciesComponent,
    OrganizationPoliciesModalComponent,
    AddEditCitationsComponent,
    GridViewCitationsComponent,
    CitationsModalComponent,
  ],
  providers: [
    DateTimeService,
    AppLocalizationService,
    AppNavigationService,
    DashboardViewConfigurationService,

    {
      provide: BsDatepickerConfig,
      useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig,
    },
    {
      provide: BsDaterangepickerConfig,
      useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig,
    },
  ],

  entryComponents: [
    WidgetGeneralStatsComponent,
    WidgetDailySalesComponent,
    WidgetEditionStatisticsComponent,
    WidgetHostTopStatsComponent,
    WidgetIncomeStatisticsComponent,
    WidgetMemberActivityComponent,
    WidgetProfitShareComponent,
    WidgetRecentTenantsComponent,
    WidgetRegionalStatsComponent,
    WidgetSalesSummaryComponent,
    WidgetSubscriptionExpiringTenantsComponent,
    WidgetTopStatsComponent,
    FilterDateRangePickerComponent,
    SingleLineStringInputTypeComponent,
    ComboboxInputTypeComponent,
    CheckboxInputTypeComponent,
  ],
})
export class AppCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppCommonModule,
      providers: [AppAuthService, AppRouteGuard],
    };
  }
}
