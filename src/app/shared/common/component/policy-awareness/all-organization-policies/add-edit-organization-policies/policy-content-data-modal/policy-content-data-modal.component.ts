import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-policy-content-data-modal",
  templateUrl: "./policy-content-data-modal.component.html",
  styleUrls: ["./policy-content-data-modal.component.css"],
})
export class PolicyContentDataModalComponent implements OnInit {
  @ViewChild("AddPolicyContentDataModal", { static: true })
  modal: ModalDirective;
  policy: {
    policyID: string;
    policyArea: string;
    sectionTitle: string;
    subSection: string;
    policyTitle: string;
    policyStatement: string;
    policyControl: string;
    targetAudience: string;
    securityEnvironments: string;
    relatedPolicies: string;
  };
  policyList: any[];
  constructor() {
    this.policy = {
      policyID: null,
      policyArea: null,
      sectionTitle: null,
      subSection: null,
      policyTitle: null,
      policyStatement: null,
      policyControl: null,
      targetAudience: null,
      securityEnvironments: null,
      relatedPolicies: null,
    };
    this.policyList = [];
  }

  ngOnInit() {}

  show() {
    this.modal.show();
  }

  stripHtml(html) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  savePolicy(form: NgForm) {
    this.policyList.push(JSON.parse(JSON.stringify(this.policy)));
    this.policy = {
      policyID: null,
      policyArea: null,
      sectionTitle: null,
      subSection: null,
      policyTitle: null,
      policyStatement: null,
      policyControl: null,
      targetAudience: null,
      securityEnvironments: null,
      relatedPolicies: null,
    };
    form.resetForm();
    this.modal.hide();
  }

  editPolicyContentData(policy) {
    this.policy = policy;
    this.modal.show();
  }

  deletePolicyContentData(i) {
    this.policyList.splice(i, 1);
  }

  close(form: NgForm): void {
    form.resetForm();
    this.modal.hide();
    this.policy = {
      policyID: null,
      policyArea: null,
      sectionTitle: null,
      subSection: null,
      policyTitle: null,
      policyStatement: null,
      policyControl: null,
      targetAudience: null,
      securityEnvironments: null,
      relatedPolicies: null,
    };
  }
}
