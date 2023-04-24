import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ProgramServiceProxy, ProgramDto } from '../../../../../shared/service-proxies/service-proxies';

@Component({
    selector: 'add-edit-my-program',
    templateUrl: './add-edit-my-program.component.html',
    styleUrls: ['./add-edit-my-program.component.scss']
})
export class AddEditMyProgramComponent extends AppComponentBase implements OnInit {

    fieldArray: Array<any> = [];
    newAttribute: any = {};
    programId: number;
    program: ProgramDto = new ProgramDto();
    title = 'Organization';
    subTitle = 'Organization Entities';
    pageTitle = '';

    constructor(_injector: Injector, private _programAppService: ProgramServiceProxy, private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        super(_injector);
        this.programId = this._activatedRoute.snapshot.queryParams['programId'] || '';
    }

    ngOnInit() {
        this._programAppService.getProgramInfo(this.programId).subscribe(result => {
            this.program = result;
        });
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
