import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { AddEditKeyPerformanceIndicatorsViewComponent } from './organization/business-management/key-performance-indicators/add-edit-key-performance-indicators-view/add-edit-key-performance-indicators-view.component';
import { AddEditKeyRiskIndicatorsViewComponent } from './organization/business-management/key-risk-indicators/add-edit-key-risk-indicators-view/add-edit-key-risk-indicators-view.component';
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
import { StrategicObjectivesComponent } from './organization/business-management/strategic-objectives/strategic-objectives.component';
import { AddEditStrategicObjectivesComponent } from './organization/business-management/strategic-objectives/add-edit-strategic-objectives/add-edit-strategic-objectives.component';
import { ITServicesComponent } from './organization/business-management/it-services-management/it-services.component';
import { AddNewItServicesComponent } from './organization/business-management/it-services-management/add-new-it-services/add-new-it-services.component';
import { AssetManagementComponent } from './asset-management/asset-management.component';
import { AddEditFacilitiesDatacenterComponent } from './asset-management/facilities-datacenter/add-edit-facilities-datacenter/add-edit-facilities-datacenter.component';
import { AddEditHardwareAssetsComponent } from './asset-management/hardware-assets/add-edit-hardware-assets/add-edit-hardware-assets.component';
import { AddEdItinformationAssetsComponent } from './asset-management/information-assets/add-edit-information-assets/add-edit-information-assets.component';
import { AddEditSystemsApplicationsComponent } from './asset-management/systems-applications/add-edit-systems-applications/add-edit-systems-applications.component';
import { AddEditVirtualAssetManagerComponent } from './asset-management/virtual-asset-manager/add-edit-virtual-asset-manager/add-edit-virtual-asset-manager.component';
import { FacilitiesDataCenterComponent } from './asset-management/facilities-datacenter/facilities-datacenter.component';
import { HardwareAssetsComponent } from './asset-management/hardware-assets/hardware-assets.component';
import { InformationAssetsComponent } from './asset-management/information-assets/information-assets.component';
import { SystemsApplicationsComponent } from './asset-management/systems-applications/systems-applications.component';
import { VirtualAssetManagerComponent } from './asset-management/virtual-asset-manager/virtual-asset-manager.component';
import { RiskManagementDashboardComponent } from './enterprise-risk-manager/risk-management-dashboard/risk-management-dashboard.component';
import { RiskManagementComponent } from './enterprise-risk-manager/risk-management/risk-management.component';
import { RiskTreatmentPlansComponent } from './enterprise-risk-manager/risk-treatment-plans/risk-treatment-plans.component';
import { RemediationPlansComponent } from './enterprise-risk-manager/remediation-plans/remediation-plans.component';
import { AddNewRiskManagementComponent } from './enterprise-risk-manager/risk-management/add-risk-management/add-risk-management.component';
import { AddNewRiskTreatmentPlansComponent } from './enterprise-risk-manager/risk-treatment-plans/add-risk-treatment-plans/add-risk-treatment-plans.component';
import { AddnewDyanamicParametercomponent } from './dynamicparameter-import/add-new-DyanamicParameter.component';
import { allMinutesMeetingComponent } from './home/add-meeting/all-minutes-meeting.component';
import { alltaskComponent } from './home/add-new-task/all-task.component';
import { ThirdPartyDashboardComponent } from './third-party-dashboard/third-party-dashboard.component';
import { AllVendorsComponent } from './third-party-dashboard/vendors/vendors.component';
import { AddNewVendorsComponent } from './third-party-dashboard/vendors/add-new-vendors/add-new-vendors.component';
import { AllContactsComponent } from './third-party-dashboard/contacts/contacts.component';
import { AddNewContactsComponent } from './third-party-dashboard/contacts/add-new-contacts/add-new-contacts.component';
import { AllContractsComponent } from './third-party-dashboard/contracts/contracts.component';
import { AddNewContractComponent } from './third-party-dashboard/contracts/add-new-contracts/add-new-contracts.component';
import { IncidentManagementDashboardComponent } from './incident-management/incident-management-dashboard/incident-management-dashboard.component';
import { allFindingComponent } from './home/add-findings/all-finding.component';
import { IncidentsComponent } from './incident-management/incidents/incidents.component';
import { AddEditIncidentsComponent } from './incident-management/incidents/add-edit-incidents/add-edit-incidents.component';
import { AllOrganizationPoliciesComponent } from './policy-awareness/all-organization-policies/all-organization-policies.component';
import { AddEditOrganizationPoliciesComponent } from './policy-awareness/all-organization-policies/add-edit-organization-policies/add-edit-organization-policies.component';
import { ComplianceManagerDashboardComponent } from './ComplianceManager/compliance-manager-dashboard/compliance-manager-dashboard.component';
import { CitationsReportsComponent } from './ComplianceManager/compliance-manager-dashboard/citations-reports/citations-reports.component';
import { AddEditCitationsReportsComponent } from './ComplianceManager/compliance-manager-dashboard/citations-reports/add-edit-citations-reports/add-edit-citations-reports.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
            data: { permission: 'Pages.Tenant.Dashboard' },
          },
          { path: 'business-services', component: BusinessServicesComponent },
          {
            path: 'organization-dashboard',
            component: OrganizationDashboardComponent,
          },
          { path: 'organization-setup', component: OrganizationSetupComponent },
          {
            path: 'business-management',
            component: BusinessManagementComponent,
          },
          { path: 'business-process', component: BusinessProcessComponent },
          { path: 'add-new-process', component: AddNewProcessComponent },
          { path: 'add-new-services', component: AddNewServicesComponent },
          { path: 'home-dashboard', component: HomeDashboardComponent },
          { path: 'my-dashboard', component: MyDashboardComponent },
          { path: 'add-new-task', component: AddNewTaskComponent },
          {
            path: 'project-management-dashboard',
            component: ProjectManagementDashboardComponent,
          },
          {
            path: 'key-performance-indicators',
            component: KeyPerformanceIndicatorsComponent,
          },
          {
            path: 'key-risk-indicators',
            component: KeyRiskIndicatorsComponent,
          },
          {
            path: 'add-edit-key-performance-indicators',
            component: AddEditKeyPerformanceIndicatorsViewComponent,
          },
          {
            path: 'add-edit-key-risk-indicators',
            component: AddEditKeyRiskIndicatorsViewComponent,
          },
          { path: 'active-audits', component: ActiveAuditsComponent },
          { path: 'add-edit-audit', component: AddEditAuditComponent },
          { path: 'add-edit-project', component: AddEditProjectComponent },
          { path: 'add-edit-my-program', component: AddEditMyProgramComponent },
          { path: 'all-findings', component: allFindingComponent },
          { path: 'add-findings', component: AddFindingsComponent },
          { path: 'add-meeting', component: AddMeetingComponent },
          { path: 'minutes-meeting', component: allMinutesMeetingComponent },
          { path: 'task', component: alltaskComponent },
          { path: 'all-exception', component: AllExceptionComponent },
          { path: 'add-edit-exception', component: AddEditExceptionComponent },
          {
            path: 'add-edit-organization',
            component: AddEditOrganizationComponent,
          },
          {
            path: 'policy-awareness-dashboard',
            component: PolicyAwarenessDashboardComponent,
          },
          {
            path: 'add-edit-review-questionnaire',
            component: AddEditReviewQuestionnaireComponent,
          },
          {
            path: 'strategic-objective',
            component: StrategicObjectivesComponent,
          },
          {
            path: 'add-edit-strategic-objective',
            component: AddEditStrategicObjectivesComponent,
          },
          { path: 'it-services', component: ITServicesComponent },
          {
            path: 'add-edit-it-services',
            component: AddNewItServicesComponent,
          },
          { path: 'asset-management', component: AssetManagementComponent },
          {
            path: 'facilities-datacenter',
            component: FacilitiesDataCenterComponent,
          },
          { path: 'hardware-assets', component: HardwareAssetsComponent },
          { path: 'information-assets', component: InformationAssetsComponent },
          {
            path: 'systems-applications',
            component: SystemsApplicationsComponent,
          },
          {
            path: 'virtual-asset-manager',
            component: VirtualAssetManagerComponent,
          },
          {
            path: 'add-edit-facilities-datacenter',
            component: AddEditFacilitiesDatacenterComponent,
          },
          {
            path: 'add-edit-hardware-assets',
            component: AddEditHardwareAssetsComponent,
          },
          {
            path: 'add-edit-information-assets',
            component: AddEdItinformationAssetsComponent,
          },
          {
            path: 'add-edit-systems-applications',
            component: AddEditSystemsApplicationsComponent,
          },
          {
            path: 'add-edit-virtual-asset-manager',
            component: AddEditVirtualAssetManagerComponent,
          },
          {
            path: 'risk-management-dashboard',
            component: RiskManagementDashboardComponent,
          },
          { path: 'risk-management', component: RiskManagementComponent },
          {
            path: 'risk-treatment-plans',
            component: RiskTreatmentPlansComponent,
          },
          { path: 'remediation-plans', component: RemediationPlansComponent },
          {
            path: 'add-edit-risk-management',
            component: AddNewRiskManagementComponent,
          },
          {
            path: 'add-edit-risk-treatment-plans',
            component: AddNewRiskTreatmentPlansComponent,
          },
          {
            path: 'dynamicparameter-import',
            component: AddnewDyanamicParametercomponent,
          },
          {
            path: 'third-party-dashboard',
            component: ThirdPartyDashboardComponent,
          },
          { path: 'all-vendors', component: AllVendorsComponent },
          { path: 'add-edit-vendors', component: AddNewVendorsComponent },
          { path: 'all-contacts', component: AllContactsComponent },
          { path: 'add-edit-contact', component: AddNewContactsComponent },
          { path: 'all-contracts', component: AllContractsComponent },
          { path: 'add-edit-contract', component: AddNewContractComponent },
          {
            path: 'incident-management',
            component: IncidentManagementDashboardComponent,
          },
          { path: 'incidents', component: IncidentsComponent },
          { path: 'add-edit-incident', component: AddEditIncidentsComponent },
          {
            path: 'all-organization-policies',
            component: AllOrganizationPoliciesComponent,
          },
          {
            path: 'add-edit-organization-policies',
            component: AddEditOrganizationPoliciesComponent,
          },
          {
            path: 'compliance-manager',
            component: ComplianceManagerDashboardComponent,
          },
          {
            path: 'citation-reports',
            component: CitationsReportsComponent,
          },
          {
            path: 'add-edit-citation-reports',
            component: AddEditCitationsReportsComponent,
          },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: '**', redirectTo: 'dashboard' },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MainRoutingModule {}
