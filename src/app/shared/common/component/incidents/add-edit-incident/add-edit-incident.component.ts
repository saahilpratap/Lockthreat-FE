import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-add-edit-incident',
  templateUrl: './add-edit-incident.component.html',
  styleUrls: ['./add-edit-incident.component.css'],
})
export class AddEditIncidentComponent extends AppComponentBase
  implements OnInit {
  incident: any;
  incidentDocuments: any[];
  constructor(_injector: Injector) {
    super(_injector);
    this.incident = {};
    this.incidentDocuments = [];
  }

  ngOnInit() {}

  saveIncident() {}

  uploadAttachment(evt: any) {
    if (evt.target.files.length !== 0) {
      Array.from(evt.target.files).forEach((element) => {
        this.incidentDocuments.push(element);
      });
    }
  }

  removeFile(i) {
    this.incidentDocuments.splice(i, 1);
  }
}
