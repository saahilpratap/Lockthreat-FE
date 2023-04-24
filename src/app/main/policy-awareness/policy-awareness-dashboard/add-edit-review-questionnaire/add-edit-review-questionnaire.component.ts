import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'add-edit-review-questionnaire',
    templateUrl: './add-edit-review-questionnaire.component.html',
    styleUrls: ['./add-edit-review-questionnaire.component.scss']
})
export class AddEditReviewQuestionnaireComponent extends AppComponentBase implements OnInit {
    title = 'Policy & Awareness';
    subTitle = 'Policy & Awareness  Dashboard';
    pageTitle = '';
    private fieldArray: Array<any> = [];
    private newAttribute: any = {};

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
        this._router.navigate(['/app/main/policy-awareness-dashboard']);
    }
}
