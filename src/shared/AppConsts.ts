export class AppConsts {

    static readonly tenancyNamePlaceHolderInUrl = '{TENANCY_NAME}';

    static remoteServiceBaseUrl: string;
    static remoteServiceBaseUrlFormat: string;
    static appBaseUrl: string;
    static appBaseHref: string; // returns angular's base-href parameter value if used during the publish
    static appBaseUrlFormat: string;
    static recaptchaSiteKey: string;
    static subscriptionExpireNootifyDayCount: number;

    static localeMappings: any = [];

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'Lockthreat'
    };

    static readonly authorization = {
        encrptedAuthTokenName: 'enc_auth_token'
    };

    static readonly grid = {
        defaultPageSize: 10
    };

    static readonly MinimumUpgradePaymentAmount = 1;
}