import { Component, OnInit, ViewChild, Injector } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { AppComponentBase } from "@shared/common/app-component-base";
import { LocalizationService } from "abp-ng2-module/dist/src/localization/localization.service";
import { PermissionCheckerService } from "abp-ng2-module/dist/src/auth/permission-checker.service";
import { FeatureCheckerService } from "abp-ng2-module/dist/src/features/feature-checker.service";
import { NotifyService } from "abp-ng2-module/dist/src/notify/notify.service";
import { SettingService } from "abp-ng2-module/dist/src/settings/setting.service";
import { MessageService } from "abp-ng2-module/dist/src/message/message.service";
import { AbpMultiTenancyService } from "abp-ng2-module/dist/src/multi-tenancy/abp-multi-tenancy.service";
import { AppSessionService } from "@shared/common/session/app-session.service";
import { PrimengTableHelper } from "@shared/helpers/PrimengTableHelper";
import { AppUiCustomizationService } from "@shared/common/ui/app-ui-customization.service";
import { AppUrlService } from "@shared/common/nav/app-url.service";
import { NgxSpinnerService } from "ngx-spinner";
import { UiCustomizationSettingsDto } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-questions-library-modal",
  templateUrl: "./questions-library-modal.component.html",
  styleUrls: ["./questions-library-modal.component.css"],
})
export class QuestionsLibraryModalComponent implements OnInit {
  @ViewChild("AddQuestionLibraryModal", { static: true })
  modal: ModalDirective;
  questionLibrary: {
    QID: string;
    QuestionnaireTitle: string;
    SourceQuestion: string;
    DisplayQuestion: string;
    Question: string;
    Section: string;
    QuestionArea: string;
    Category: string;
    QuestionTarget: string;
    QuestionStatus: string;
    AuthoratativeDocuments: string;
    ControlStandards: string;
    AnswerType: string;
    AnswerText: string;
    AnswerType1: string;
    AnswerValues: string;
    AnswerPoints: string;
    TotalPoints: string;
  };
  questionLibraryList: {
    QID: string;
    QuestionnaireTitle: string;
    SourceQuestion: string;
    DisplayQuestion: string;
    Question: string;
    Section: string;
    QuestionArea: string;
    Category: string;
    QuestionTarget: string;
    QuestionStatus: string;
    AuthoratativeDocuments: string;
    ControlStandards: string;
    AnswerType: string;
    AnswerText: string;
    AnswerType1: string;
    AnswerValues: string;
    AnswerPoints: string;
    TotalPoints: string;
  }[];
  constructor() {
    this.questionLibrary = {
      QID: null,
      QuestionnaireTitle: null,
      SourceQuestion: null,
      DisplayQuestion: null,
      Question: null,
      Section: null,
      QuestionArea: null,
      Category: null,
      QuestionTarget: null,
      QuestionStatus: null,
      AuthoratativeDocuments: null,
      ControlStandards: null,
      AnswerType: null,
      AnswerText: null,
      AnswerType1: null,
      AnswerValues: null,
      AnswerPoints: null,
      TotalPoints: null,
    };
    this.questionLibraryList = [];
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

  saveQuestionLibrary(form: NgForm) {
    if (form.valid) {
      this.questionLibraryList.push(
        JSON.parse(JSON.stringify(this.questionLibrary))
      );
      form.resetForm();
      this.modal.hide();
    }
  }

  editQuestionLibrary(questionLibrary) {
    this.questionLibrary = questionLibrary;
    this.modal.show();
  }

  deleteQuestionLibrary(i) {
    this.questionLibraryList.splice(i, 1);
  }

  close(form: NgForm) {
    form.resetForm();
    this.modal.hide();
    this.questionLibrary = {
      QID: null,
      QuestionnaireTitle: null,
      SourceQuestion: null,
      DisplayQuestion: null,
      Question: null,
      Section: null,
      QuestionArea: null,
      Category: null,
      QuestionTarget: null,
      QuestionStatus: null,
      AuthoratativeDocuments: null,
      ControlStandards: null,
      AnswerType: null,
      AnswerText: null,
      AnswerType1: null,
      AnswerValues: null,
      AnswerPoints: null,
      TotalPoints: null,
    };
  }
}
