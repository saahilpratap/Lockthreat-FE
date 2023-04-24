import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'add-edit-project',
    templateUrl: './add-edit-project.component.html',
    styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent extends AppComponentBase implements OnInit {

    fieldArray: Array<any> = [];
    newAttribute: any = {};
    title = 'Organization';
    subTitle = 'Organization Entities';
    pageTitle = '';

    constructor(_injector: Injector,
        private _router: Router,       
    ) {
        super(_injector);
       

       
    }

    ngOnInit() {
       
    }
    addFieldValue() {
        this.fieldArray.push(this.newAttribute)
        this.newAttribute = {};
    }

    deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
    }

   

   
    goBack() {
        this._router.navigate(['/app/main/project-management-dashboard']);
    }
}
