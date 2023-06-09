import { AbpHttpInterceptor, RefreshTokenService } from '@abp/abpHttpInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
import { ZeroRefreshTokenService } from '@account/auth/zero-refresh-token.service';

@NgModule({
    providers: [
        ApiServiceProxies.AuditLogServiceProxy,
        ApiServiceProxies.CachingServiceProxy,
        ApiServiceProxies.ChatServiceProxy,
        ApiServiceProxies.CommonLookupServiceProxy,
        ApiServiceProxies.EditionServiceProxy,
        ApiServiceProxies.FriendshipServiceProxy,
        ApiServiceProxies.HostSettingsServiceProxy,
        ApiServiceProxies.InstallServiceProxy,
        ApiServiceProxies.LanguageServiceProxy,
        ApiServiceProxies.NotificationServiceProxy,
        ApiServiceProxies.OrganizationUnitServiceProxy,
        ApiServiceProxies.PermissionServiceProxy,
        ApiServiceProxies.ProfileServiceProxy,
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.TenantDashboardServiceProxy,
        ApiServiceProxies.TenantSettingsServiceProxy,
        ApiServiceProxies.TimingServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.UserLinkServiceProxy,
        ApiServiceProxies.UserLoginServiceProxy,
        ApiServiceProxies.WebLogServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.TenantRegistrationServiceProxy,
        ApiServiceProxies.HostDashboardServiceProxy,
        ApiServiceProxies.PaymentServiceProxy,
        ApiServiceProxies.DemoUiComponentsServiceProxy,
        ApiServiceProxies.InvoiceServiceProxy,
        ApiServiceProxies.SubscriptionServiceProxy,
        ApiServiceProxies.InstallServiceProxy,
        ApiServiceProxies.UiCustomizationSettingsServiceProxy,
        ApiServiceProxies.PayPalPaymentServiceProxy,
        ApiServiceProxies.StripePaymentServiceProxy,
        ApiServiceProxies.DashboardCustomizationServiceProxy,
        ApiServiceProxies.WebhookEventServiceProxy,
        ApiServiceProxies.WebhookSubscriptionServiceProxy,
        ApiServiceProxies.WebhookSendAttemptServiceProxy,
        ApiServiceProxies.UserDelegationServiceProxy,
        ApiServiceProxies.DynamicParameterServiceProxy,
        ApiServiceProxies.DynamicEntityParameterDefinitionServiceProxy,
        ApiServiceProxies.EntityDynamicParameterServiceProxy,
        ApiServiceProxies.DynamicParameterValueServiceProxy,
        ApiServiceProxies.EntityDynamicParameterValueServiceProxy,
        ApiServiceProxies.OrganizationSetupServiceProxy,
        ApiServiceProxies.BusinessUnitServiceProxy,
        ApiServiceProxies.EmployeeServiceProxy,
        ApiServiceProxies.TaskServiceProxy,
        ApiServiceProxies.IndustrySectorsServiceProxy,
        ApiServiceProxies.CountriesAppserviceServiceProxy,
        ApiServiceProxies.BusinessServicesServiceProxy,
        ApiServiceProxies.BusinessProcessServiceProxy,
        ApiServiceProxies.KeyPerformanceIndicatorServiceProxy,
        ApiServiceProxies.KeyRiskIndicatorsServiceProxy,
        ApiServiceProxies.ProgramServiceProxy,
        ApiServiceProxies.ITServiceServiceProxy,
        ApiServiceProxies.ProjectServiceProxy,
        ApiServiceProxies.StrategicObjectivesServiceProxy,
        ApiServiceProxies.MeetingServiceProxy,
        ApiServiceProxies.FacilitieDatacenterServiceProxy,
        ApiServiceProxies.HardWareAssetServiceProxy,
        ApiServiceProxies.AssetInformationAppserviceServiceProxy,
        ApiServiceProxies.VirtualAssetServiceProxy,
        ApiServiceProxies.SystemApplicationServiceProxy,
        ApiServiceProxies.AuditServiceProxy,     
        ApiServiceProxies.ExceptionServiceProxy,
        ApiServiceProxies.VendorServiceProxy,
        ApiServiceProxies.ContactServiceProxy,
        ApiServiceProxies.ContractServiceProxy,
        ApiServiceProxies.FindingServiceProxy,
        ApiServiceProxies.OrganizationDashboardServiceProxy,
        { provide: RefreshTokenService, useClass: ZeroRefreshTokenService },
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]

})
export class ServiceProxyModule { }
