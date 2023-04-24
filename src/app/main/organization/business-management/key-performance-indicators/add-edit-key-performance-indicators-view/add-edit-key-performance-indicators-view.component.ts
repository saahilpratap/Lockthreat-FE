import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'add-edit-key-performance-indicators-view',
    templateUrl: './add-edit-key-performance-indicators-view.component.html',
    styleUrls: ['./add-edit-key-performance-indicators-view.component.scss']
})
export class AddEditKeyPerformanceIndicatorsViewComponent extends AppComponentBase implements OnInit {
    title = 'Organization';
    subTitle = 'Organization Management';
    pageTitle = '';
    creationDateRange: Date;
    basicInfo: boolean;
    advanced: boolean;
    dayDropdown: boolean;
    public upload: any[] = [{
            
    }];
    uploadedFiles: any[] = [];

    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.basicInfo = true;
        this.dayDropdown = false;
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
        //this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }
    selectView(e) {
        if (e =='BasicInfo') {
            this.basicInfo = true;
            this.advanced = false;
        }
        if (e == 'Advanced') {
            this.advanced = true;
            this.basicInfo = false;
        }
    }
    selectFrequency(e) {
        if (e == 'oneTime') {
            this.dayDropdown = false;            
        }
        if (e == 'daily') {
            this.dayDropdown = false;          
        }
        if (e == 'periodic') {
            this.dayDropdown = true;          
        }
    }
    goBack() {
        this._router.navigate(['/app/main/key-performance-indicators']);
    }
}
