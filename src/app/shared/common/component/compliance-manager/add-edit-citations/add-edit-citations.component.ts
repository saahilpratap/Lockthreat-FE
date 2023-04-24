import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-add-edit-citations',
  templateUrl: './add-edit-citations.component.html',
  styleUrls: ['./add-edit-citations.component.css'],
})
export class AddEditCitationsComponent  extends AppComponentBase implements OnInit {
  citationsReport: any;
  text:string;
  constructor(_injector: Injector) {
      super(_injector);
      this.citationsReport = {};
      this.citationsReport.attachmentDocument = null;
      this.citationsReport.OriginalPolicyDocument = null;
  }

  ngOnInit() {}

  onUpload(event) {
    for (let file of event.files) {
        this.citationsReport.attachmentDocument = file;
    }
  }

  uploadAttachment(evt: any) {
    if (evt.target.files.length !== 0) {
      Array.from(evt.target.files).forEach((element) => {
        const file: any = element;
        const obj = { file: file, fileName: file.name };
        this.citationsReport.attachmentDocument = obj;
      });
    }
  }
  uploadContentImage(evt: any) {
    if (evt.target.files.length !== 0) {
      Array.from(evt.target.files).forEach((element) => {
        const file: any = element;
        const obj = { file: file, fileName: file.name };
        this.citationsReport.OriginalPolicyDocument = obj;
      });
    }
  }
}
