import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-edit-incidents',
  templateUrl: './add-edit-incidents.component.html',
  styleUrls: ['./add-edit-incidents.component.css'],
})
export class AddEditIncidentsComponent extends AppComponentBase
  implements OnInit {
  title = 'Incident Management Dashboard';
  subTitle = '';
  pageTitle = '';
    currentURL: string;
  constructor(
    _injector: Injector,
    private _router: Router,
    private location: Location
  ) {
    super(_injector);
    this.currentURL = this._router.url;

  }

  ngOnInit() {}

  goToBack() {
    this.location.back();
  }
}
