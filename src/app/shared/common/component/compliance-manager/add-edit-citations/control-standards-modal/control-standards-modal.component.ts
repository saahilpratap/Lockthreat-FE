import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-control-standards-modal',
  templateUrl: './control-standards-modal.component.html',
  styleUrls: ['./control-standards-modal.component.css'],
})
export class ControlStandardsModalComponent extends AppComponentBase
  implements OnInit {
  @ViewChild('AddControlStandardModal', { static: true })
  modal: ModalDirective;
  controlStandard: {
    Source: string;
    SourceVersion: string;
    UCFCID: string;
    ControlStandardID: string;
    ControlName: string;
    FrameworkObjectives: string;
    ControlClassification: string;
    Type: string;
    ControlArea: string;
    ControlCategory: string;
    ControlObjective: string;
    ControlDescription: string;
    ControlRequirements: string;
    CustomApplicability: string;
    ControlFrequency: string;
    TestingProcedure: string;
    SampleSize: string;
    RiskDrivers: string;
  };
  controlStandardList: {
    Source: string;
    SourceVersion: string;
    UCFCID: string;
    ControlStandardID: string;
    ControlName: string;
    FrameworkObjectives: string;
    ControlClassification: string;
    Type: string;
    ControlArea: string;
    ControlCategory: string;
    ControlObjective: string;
    ControlDescription: string;
    ControlRequirements: string;
    CustomApplicability: string;
    ControlFrequency: string;
    TestingProcedure: string;
    SampleSize: string;
    RiskDrivers: string;
  }[];
  constructor(_injector: Injector) {
    super(_injector);
    this.controlStandard = {
      Source: null,
      SourceVersion: null,
      UCFCID: null,
      ControlStandardID: null,
      ControlName: null,
      FrameworkObjectives: null,
      ControlClassification: null,
      Type: null,
      ControlArea: null,
      ControlCategory: null,
      ControlObjective: null,
      ControlDescription: null,
      ControlRequirements: null,
      CustomApplicability: null,
      ControlFrequency: null,
      TestingProcedure: null,
      SampleSize: null,
      RiskDrivers: null,
    };
    this.controlStandardList = [];
  }

  ngOnInit() {}

  show() {
    this.modal.show();
  }

  stripHtml(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  saveControlStandards(form: NgForm) {
    this.controlStandardList.push(JSON.parse(JSON.stringify(this.controlStandard)));
    form.resetForm();
    this.modal.hide();
  }

  editControlStandard(controlStandard) {
    this.controlStandard = controlStandard;
    this.modal.show();
  }

  deleteControlStandard(i) {
    this.controlStandardList.splice(i, 1);
  }

  close(form: NgForm) {
    form.resetForm();
    this.modal.hide();
    this.controlStandard = {
      Source: null,
      SourceVersion: null,
      UCFCID: null,
      ControlStandardID: null,
      ControlName: null,
      FrameworkObjectives: null,
      ControlClassification: null,
      Type: null,
      ControlArea: null,
      ControlCategory: null,
      ControlObjective: null,
      ControlDescription: null,
      ControlRequirements: null,
      CustomApplicability: null,
      ControlFrequency: null,
      TestingProcedure: null,
      SampleSize: null,
      RiskDrivers: null,
    };
  }
}
