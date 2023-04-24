import { Component, OnInit, Injector, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'quick-action',
    templateUrl: './quick-action.component.html',
    // styleUrls: ['./quick-action.component.scss']
})
export class QuickActionComponent extends AppComponentBase implements OnInit {

    //Output() toParent: new EventEmitter<string>;
    @Output() toParent = new EventEmitter<string>();
    @Input('menuID') mID: any;

    actionMenu = [
        { icon: 'flaticon-file-1', title: ' New Task' },
        { icon: 'flaticon2-search-1', title: 'Add Finding' },
        { icon: 'flaticon-network', title: 'Add Incident' },
        { icon: 'flaticon-warning-sign', title: 'Add Exception' },
        { icon: 'flaticon-warning-sign', title: 'Add Meeting' }
    ];
    hostSiteMenu = [
        { icon: 'flaticon-file-1', title: ' Add New Task' },
        { icon: 'flaticon2-search-1', title: ' Add Findings' },
        { icon: 'flaticon-network', title: 'Add Meeting' },
        { icon: 'flaticon-warning-sign', title: 'All Exception' }
    ];
    home = [
        { icon: 'flaticon-file-1', title: 'Home Dashboard' },
        { icon: 'flaticon-file-1', title: 'My Dashboard' },       
    ];
    organization = [
        { icon: 'flaticon-file-1', title: 'Organization Dashboard' },
        { icon: 'flaticon-file-1', title: 'Organization Setup' },
        { icon: 'flaticon-file-1', title: 'Business Management' },
    ];
    programsProjects = [
        { icon: 'flaticon-file-1', title: 'Project Management Dashboard' },
        { icon: 'flaticon-file-1', title: 'Project Dashboard' },
        { icon: 'flaticon-file-1', title: 'All Projects' },
    ];
    assetManagement = [
        { icon: 'flaticon-file-1', title: 'Asset Management' },
        { icon: 'flaticon-file-1', title: 'Asset Risk' },
    ];
    policyAwareness = [
        { icon: 'flaticon-file-1', title: 'Policy & Awareness Dashboard' },
        { icon: 'flaticon-file-1', title: 'All Organization Policies' },      
    ];
    complianceManager = [
        { icon: 'flaticon-file-1', title: 'Compliance Management Dashboard' },
        { icon: 'flaticon-file-1', title: 'Organization Setup' },        
    ];
    thirdPartyRisk = [
        { icon: 'flaticon-file-1', title: 'Third Party Dashboard' },
        { icon: 'flaticon-file-1', title: 'All Vendors' },
    ];
    auditManagement = [
        { icon: 'flaticon-file-1', title: 'Audit Management Dashboard' },
        { icon: 'flaticon-file-1', title: 'Audit Personal Dashboard' },
    ];
    enterpriseRiskManager = [
        { icon: 'flaticon-file-1', title: 'Organization Dashboard' },
        { icon: 'flaticon-file-1', title: 'Organization Setup' },
    ];
    incidentManagement = [
        { icon: 'flaticon-file-1', title: 'Organization Entities' },
        { icon: 'flaticon-file-1', title: 'Organization Dashboard' },
        { icon: 'flaticon-file-1', title: 'Organization Setup' },
    ];
    iRMOperations = [
        { icon: '', title: '' },
    ];
    administration = [
        { icon: 'flaticon-file-1', title: 'OrganizationUnits' },
        { icon: 'flaticon-file-1', title: 'Roles' },
        { icon: 'flaticon-file-1', title: 'Users' },
        { icon: 'flaticon-file-1', title: 'Languages' },
        { icon: 'flaticon-file-1', title: 'AuditLogs' },
        { icon: 'flaticon-file-1', title: 'Maintenance' },
        { icon: 'flaticon-file-1', title: 'Subscription' },
        { icon: 'flaticon-file-1', title: 'VisualSettings' },
        { icon: 'flaticon-file-1', title: 'Settings' },
    ];
    constructor(_injector: Injector,
        private _router: Router,
        route: ActivatedRoute
    ) {
        super(_injector);

    }

    ngOnInit() {

    }
    goToMenuPage(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['/app/main/add-new-task']);
                break;
            }
            case 1: {
                this._router.navigate(['/app/main/add-findings']);
                break;
            }
            case 2: {
                this._router.navigate(['/app/main/add-meeting']);
                break;
            }
            case 3: {
                this._router.navigate(['/app/main/all-exception']);
                break;
            }

            case 4: {
                this._router.navigate(['/app/main/add-meeting']);
                break;
            }
            default: {
                //statements; 
                break;
            }
        }

    }

  
    clickHome(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['/app/main/home-dashboard']);
                break;
            }
            case 1: {
                this._router.navigate(['/app/main/home-dashboard']);
                break;
            }           
            default: {
                //statements; 
                break;
            }
        }


    }
    clickOrganization(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['/app/main/organization-dashboard']);
                break;
            }
            case 1: {
                this._router.navigate(['/app/admin/organization-setup']);
                break;
            }
            case 2: {
                this._router.navigate(['/app/main/business-management']);
                break;
            }            
            default: {
                //statements; 
                break;
            }
        }

    }
    clickProgramsProjects(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['/app/main/project-management-dashboard']);
                break;
            }
            case 1: {
                this._router.navigate(['']);
                break;
            }
            case 2: {
                this._router.navigate(['']);
                break;
            }           
            default: {
                //statements; 
                break;
            }
        }


    }
    clickAssetManagement(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['']);
                break;
            }
            case 1: {
                this._router.navigate(['']);
                break;
            }            
            default: {
                //statements; 
                break;
            }
        }


    }
    clickPolicyAwareness(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['/app/main/policy-awareness-dashboard']);
                break;
            }
            case 1: {
                this._router.navigate(['']);
                break;
            }           
            default: {
                //statements; 
                break;
            }
        }


    }
    clickComplianceManager(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['']);
                break;
            }
            case 1: {
                this._router.navigate(['']);
                break;
            }
            default: {
                //statements; 
                break;
            }
        }


    }
    clickThirdPartyRisk(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['']);
                break;
            }
            case 1: {
                this._router.navigate(['']);
                break;
            }           
            default: {
                //statements; 
                break;
            }
        }


    }
    clickAuditManagement(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['/app/main/active-audits']);
                break;
            }
            case 1: {
                this._router.navigate(['']);
                break;
            }            
            default: {
                //statements; 
                break;
            }
        }


    }
    clickEnterpriseRiskManager(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['']);
                break;
            }
            case 1: {
                this._router.navigate(['']);
                break;
            }           
            default: {
                //statements; 
                break;
            }
        }


    }
    clickIncidentManagement(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['']);
                break;
            }
            case 1: {
                this._router.navigate(['']);
                break;
            }
            case 2: {
                this._router.navigate(['']);
                break;
            }           
            default: {
                //statements; 
                break;
            }
        }


    }
    clickIRMOperations(menu) {
        switch (menu) {
            case 0: {
              
                break;
            }
            default: {
                //statements; 
                break;
            }
        }


    }
    clickAdministration(menu) {
        switch (menu) {
            case 0: {
                this._router.navigate(['']);
                break;
            }
            case 1: {
                this._router.navigate(['']);
                break;
            }
            case 2: {
                this._router.navigate(['']);
                break;
            }
            case 3: {
                this._router.navigate(['']);
                break;
            }
            case 4: {
                this._router.navigate(['']);
                break;
            }
            case 5: {
                this._router.navigate(['']);
                break;
            }
            case 6: {
                this._router.navigate(['']);
                break;
            }
            case 7: {
                this._router.navigate(['']);
                break;
            }
            case 8: {
                this._router.navigate(['/app/main/add-new-task']);
                break;
            }
            case 9: {
                this._router.navigate(['/app/main/add-findings']);
                break;
            }
            case 10: {
                this._router.navigate(['/app/main/add-meeting']);
                break;
            }
            case 11: {
                this._router.navigate(['/app/main/all-exception']);
                break;
            }
            default: {
                //statements; 
                break;
            }
        }
    }
    onChange(value) {
        this.toParent.emit(value);
    }
}
