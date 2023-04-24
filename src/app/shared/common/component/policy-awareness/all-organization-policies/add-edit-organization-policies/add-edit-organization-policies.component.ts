import {
  Component,
  OnInit,
  Injector,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
@Component({
  selector: 'add-edit-organization-policies',
  templateUrl: './add-edit-organization-policies.component.html',
  styleUrls: ['./add-edit-organization-policies.component.css'],
})
export class AddEditOrganizationPoliciesComponent extends AppComponentBase
  implements OnInit {
  @ViewChild(SignaturePad, { read: ElementRef, static: true })
  signaturePad: SignaturePad;
  @ViewChild(SignaturePad, { read: ElementRef, static: true })
  signaturen: ElementRef;
  @ViewChild(SignaturePad, { read: ElementRef, static: true })
  signaturen1: ElementRef;
  policy: any;
  signaturePadOptions: Object = {
    minWidth: 0.1,
    canvasWidth: 350,
    canvasHeight: 100,
    penColor: '#60174e',
  };
  text: string;
  constructor(_injector: Injector) {
    super(_injector);
    this.policy = {};
    this.policy.attachmentDocument = null;
    this.policy.OriginalPolicyDocument = null;
    this.policy.PolicyContentType = 'Content Based';
  }

  ngOnInit() {}

  onUpload(event) {
    for (let file of event.files) {
        this.policy.attachmentDocument = file;
    }
  }

  uploadAttachment(evt: any) {
    if (evt.target.files.length !== 0) {
      Array.from(evt.target.files).forEach((element) => {
        const file: any = element;
        const obj = { file: file, fileName: file.name };
        this.policy.attachmentDocument = obj;
      });
    }
  }
  uploadOriginalPolicyDocument(evt: any) {
    if (evt.target.files.length !== 0) {
      Array.from(evt.target.files).forEach((element) => {
        const file: any = element;
        const obj = { file: file, fileName: file.name };
        this.policy.OriginalPolicyDocument = obj;
      });
    }
  }

  removeDocument() {
    this.policy.attachmentDocument = { file: null, fileName: null };
  }
  savePolicies() {}
}
