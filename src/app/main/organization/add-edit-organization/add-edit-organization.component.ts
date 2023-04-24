import { Component, OnInit, Injector, ViewChild, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'add-edit-organization',
    templateUrl: './add-edit-organization.component.html',
    styleUrls: ['./add-edit-organization.component.scss']
})
export class AddEditOrganizationComponent extends AppComponentBase implements OnInit {
    title = 'Organization';
    subTitle = 'Organization Dashboard';
    pageTitle = '';
    editView: any;
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.editView = false;
    }
    goToBack() {

    }
}
