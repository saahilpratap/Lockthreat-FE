import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateOrEditOrganizationEntitiesService {

    companyObjectives: boolean = false;
    businessUnits: boolean = false;
    businessServices: boolean = false;
    iTServices: boolean = false;
    associatedPrograms: boolean = false;
    associatedProjects: boolean = false;
    companyEmployees: boolean = false;
    companyContacts: boolean = false;
    systemsApplications: boolean = false;
    facilitiesDatacenters: boolean = false;
    businessProcess: boolean = false;
    businessRisks: boolean = false;
    relatedAuthoratativeSourcesrelatedAuthoratativeSources: boolean = false;
    relatedContracts: boolean = false;
    reviews: boolean = false;
    reviewData: boolean = false;
    keyRiskIndicators: boolean = false;
    relatedIncidents: boolean = false;
    title = 'Organization';
    subTitle = 'Organization Entities';
    pageTitle = '';
    constructor() { }


    onTabClose(event) {
        alert(event);
    }

    onTabOpen(event) {
        alert(event);
    }
}
