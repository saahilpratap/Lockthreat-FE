import { AbpModule } from '@abp/abp.module';
import * as ngCommon from '@angular/common';
import { ModuleWithProviders, NgModule, Injector } from '@angular/core';
import { AppUrlService } from './nav/app-url.service';
import { AppUiCustomizationService } from './ui/app-ui-customization.service';
import { AppSessionService } from './session/app-session.service';
import { CookieConsentService } from './session/cookie-consent.service';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';


@NgModule({
    imports: [
        ngCommon.CommonModule,
        AbpModule
    ]
})
export class CommonModule {

    primengTableHelper: PrimengTableHelper;

    constructor(injector: Injector) {
        this.primengTableHelper = new PrimengTableHelper();
    }
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommonModule,
            providers: [
                AppUiCustomizationService,
                CookieConsentService,
                AppSessionService,
                AppUrlService
            ]
        };
    }
}
