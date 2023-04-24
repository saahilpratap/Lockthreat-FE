import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'add-findings',
    templateUrl: './add-findings.component.html',
    styleUrls: ['./add-findings.component.scss']
})
export class AddFindingsComponent extends AppComponentBase implements OnInit {
    @ViewChild('SampleDatePicker', { static: true }) sampleDatePicker: ElementRef;
    sampleDate: moment.Moment;
    title = 'Home';
    subTitle = 'Home Dashboard';
    pageTitle = 'Finding';
    public upload: any[] = [{
            
    }];
    uploadedFiles: any[] = [];

    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
      
    }

    addUploadField() {
        this.upload.push({
            uploadField: '',     
        });
    }
    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }
    selectView(e) {
    
    }
    selectFrequency(e) {
      
    }
    goBack() {
        this._router.navigate(['/app/main/home-dashboard']);
    }
}
