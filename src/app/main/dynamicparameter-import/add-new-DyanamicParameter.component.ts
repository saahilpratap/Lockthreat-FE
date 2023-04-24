import { Component, OnInit, Injector, ViewChild, ElementRef} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppConsts } from '@shared/AppConsts';

@Component({  
    templateUrl: './add-new-DyanamicParameter.component.html',
   
})
export class AddnewDyanamicParametercomponent  extends AppComponentBase implements OnInit {
    @ViewChild('labelImport',{ static: true })
    labelImport: ElementRef;
    fileToUpload: File = null;
    formImport: FormGroup;
    uploadUrl: string;
    concateUrl: string;
    title = 'APP Setting';
    subTitle = 'DyanamicParameter';
    pageTitle = 'DyanamicParameter';
    constructor(_injector: Injector,
        private _router: Router,
        private _httpClient: HttpClient,
    ) {
        super(_injector);
        this.uploadUrl = AppConsts.remoteServiceBaseUrl + '/File/ProcessImportFile';
        this.formImport = new FormGroup({
            importFile: new FormControl('', Validators.required)
        });
      }
    ngOnInit()
    {

    }
    goToBack()
    {
       // this._router.navigate(['/app/main/business-process']);
    }

    onFileChange(files: FileList) {
        this.labelImport.nativeElement.innerText = Array.from(files)
            .map(f => f.name)
            .join(', ');
        this.fileToUpload = files.item(0);
    }

    uploadFileMaster(): void {
        debugger
        const formData: FormData = new FormData();
        formData.append('file', this.fileToUpload);  
        this._httpClient
            .post<any>(this.uploadUrl, formData)
            .subscribe(response => {
                alert(response.result.msg);
                debugger
                if (response.result.msg != "Data inserted failed.") {
                    this.message.success('Added Succesfully..!');

                }
                else {
                    this.message.error('Failed To Upload File..!');
                }
               
                abp.ui.clearBusy();
            })

    }
}
