import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-citations-reports',
  templateUrl: './add-edit-citations-reports.component.html',
  styleUrls: ['./add-edit-citations-reports.component.css'],
})
export class AddEditCitationsReportsComponent extends AppComponentBase
  implements OnInit {
  title = 'Compliance Management';
  subTitle = 'Compliance Management Dashboard';
  pageTitle = '';
  constructor(_injector: Injector, private _router: Router,  private location: Location) {
    super(_injector);
  }

  ngOnInit() {}

  goToBack() {
    this.location.back();
  }
}
