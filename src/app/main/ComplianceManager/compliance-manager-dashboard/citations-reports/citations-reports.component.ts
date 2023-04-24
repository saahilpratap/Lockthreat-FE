import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';

@Component({
  selector: 'citations-reports',
  templateUrl: './citations-reports.component.html',
  styleUrls: ['./citations-reports.component.css'],
})
export class CitationsReportsComponent extends AppComponentBase
  implements OnInit {
  title = 'Compliance Management';
  subTitle = 'Compliance Management Dashboard';
  pageTitle = '';
  bulkedit: any;
  cols: { field: string; header: string }[];
  selectedColumns: { field: string; header: string }[];
  constructor(_injector: Injector, private _router: Router) {
    super(_injector);
    this.cols = [
      { field: 'AuthoratativeDocument', header: 'Authoratative Document' },
      { field: 'ParentCitation', header: 'Parent Citation' },
      { field: 'OriginID', header: 'Citation (Origin ID)' },
      { field: 'CitationID', header: 'Citation ID' },
      { field: 'CitationTitle', header: 'Citation Title' },
      { field: 'CitationType', header: 'Citation Type' },
      { field: 'FrameworkObjectives', header: 'Framework Objectives' },
      { field: 'CitationClass', header: 'Citation Class' },
      { field: 'ControlObjective', header: 'Control Objective' },
      { field: 'CustomApplicability', header: 'Custom Applicability' },
    ];
    this.selectedColumns = this.cols;
  }

  ngOnInit() {}

  getBulkEdit(e) {
    this.bulkedit = e;
  }

  addNewCitationReport() {
    this._router.navigate(['/app/main/add-edit-citation-reports']);
  }
}
