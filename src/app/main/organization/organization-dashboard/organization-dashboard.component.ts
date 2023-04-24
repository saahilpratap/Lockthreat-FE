import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '../../../../shared/animations/routerTransition';
//import { AddWidgetModalComponent } from '../../../shared/common/customizable-dashboard/add-widget-modal/add-widget-modal.component';
import { Router } from '@angular/router';
import { OrganizationDashboardServiceProxy, OrganizationCountDto} from 'shared/service-proxies/service-proxies';


@Component({
    selector: 'organization-dashboard',
    templateUrl: './organization-dashboard.component.html',
    styleUrls: ['./organization-dashboard.component.scss'],
    animations: [appModuleAnimation()]
})
export class OrganizationDashboardComponent extends AppComponentBase implements OnInit {

    // @ViewChild('addWidget', { static: true }) addWidget: AddWidgetModalComponent;

    organization: any;
    businessUnit: any;
    businessService: any;
    itService: any;
    businessProcess: any;
    StrategicObjectives: any;
    KPI: any;
    KRI: any;

    //public tabItem: any[] = [
    //    { img: '../assets/common/icon/organization-dashboard/tab-1.svg', count: '345', detail: 'All Key Risk' },
    //    { img: '../assets/common/icon/organization-dashboard/tab-2.svg', count: '567', detail: 'All Key Risk' },
    //    { img: '../assets/common/icon/organization-dashboard/tab-3.svg', count: '234', detail: 'All Key Risk' },
    //    { img: '../assets/common/icon/organization-dashboard/tab-4.svg', count: '575', detail: 'All Key Risk' },
    //    { img: '../assets/common/icon/organization-dashboard/tab-5.svg', count: '346', detail: 'All Key Risk' },
    //    { img: '../assets/common/icon/organization-dashboard/tab-6.svg', count: '897', detail: 'All Key Risk' },
    //    { img: '../assets/common/icon/organization-dashboard/tab-7.svg', count: '123', detail: 'All Key Risk' },
    //    { img: '../assets/common/icon/organization-dashboard/tab-8.svg', count: '123', detail: 'All Key Risk' },
    //];

    constructor(_injector: Injector,
        private _organizationDashboardService: OrganizationDashboardServiceProxy,
        private _router: Router,
    ) {
        super(_injector);
    }
    display: boolean;

    getDashboardCout()
    {
        this._organizationDashboardService.getOrganizationDashboardCount().subscribe(res => {
            this.organization = res.organizationCount;
            this.businessUnit = res.businessUnitCount;
            this.businessProcess = res.businessProcessCount;
            this.businessService = res.businessServieCount;
            this.KPI = res.kpiCount;
            this.KRI = res.kriCount;
            this.itService = res.iTserviceCount;
            this.StrategicObjectives = res.strategicObjectiveCount;

        })
    }

    ngOnInit() {
        this.display = false;
        this.getDashboardCout();
    }
    openWidget() {
        this.display = true;
    }
    close() {
        this.display = false;
    }
    clickTabMenu(menu) {
        switch (menu) {
            case 0: {
                //this._router.navigate(['/app/main/organization-setup']);
                break;
            }
            case 1: {
                //this._router.navigate(['/app/main/opportunity']);
                break;
            }
            case 2: {
                //this._router.navigate(['/app/main/organization-setup']);
                break;
            }
            case 3: {
                //this._router.navigate(['/app/main/organization-setup']);
                break;
            }
            default: {
                break;
            }
        }
    }
}
