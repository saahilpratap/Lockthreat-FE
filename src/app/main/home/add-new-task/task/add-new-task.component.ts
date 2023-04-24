import { Component, OnInit, Injector, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ngf } from "angular-file";
import { HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent} from "@angular/common/http";
import { Subscription } from 'rxjs';
import { MultiselectDropdownService } from 'app/shared/common/component/common-services/multiselect-dropdown-service.service';
import { TaskServiceProxy, TaskinfoDto, Frequency, Priority, GetDynamicValueDto, UploadFileDto, ProjectListsDto, MeetingsDto, BusinessServiceOwner } from '../../../../../shared/service-proxies/service-proxies';
import { appModuleAnimation } from '../../../../../shared/animations/routerTransition';

@Component({
    selector: 'add-new-task',
    templateUrl: './add-new-task.component.html',
    styleUrls: ['./add-new-task.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class AddNewTaskComponent extends AppComponentBase implements OnInit {

    taskFrequencyList = [{
        id: 1,
        name: 'OneTime'
    }, {
        id: 2,
        name: 'Daily'
    }, {
        id: 3,
        name: 'Periodic'
    }];
    taskPriorityList = [{
        id: 1,
        name: 'High'
    }, {
        id: 2,
        name: 'Medium'
    }, {
        id: 3,
        name: 'Low'
    }];
    creationDateRange: Date;
    basicInfo: boolean;
    advanced: boolean;
    title = 'Home';
    subTitle = 'Home Dashboard';
    pageTitle = 'Task';
    public upload: any[] = [{

    }];
    uploadedFiles: any[] = [];
    recordId: any;
    isEdit: boolean;
    oraganizationId: any;
    taskItem: TaskinfoDto = new TaskinfoDto();
    @ViewChild('startDatePicker', { static: true }) startDatePicker: ElementRef;
    @ViewChild('endDatePicker', { static: true }) endDatePicker: ElementRef;
    @ViewChild('actualCompletedDatePicker', { static: true }) actualCompletedDatePicker: ElementRef;
    postUrl = '...'
    myFormData:FormData//populated by ngfFormData directive
    httpEvent: HttpEvent<{}>

    tasktype: GetDynamicValueDto[] = [];
    selectedTaskType: GetDynamicValueDto = new GetDynamicValueDto();

    linked: GetDynamicValueDto[] = [];
    selectedLinked: GetDynamicValueDto = new GetDynamicValueDto();

    riskLevel: GetDynamicValueDto[] = [];
    selectedRiskLevel: GetDynamicValueDto = new GetDynamicValueDto();

    assignedUser: BusinessServiceOwner[] = [];
    selectedAssignedUser: BusinessServiceOwner = new BusinessServiceOwner();

    requesteduser: BusinessServiceOwner[] = [];
    selectedRequesteduser: BusinessServiceOwner = new BusinessServiceOwner();

    assignedTo: BusinessServiceOwner[] = [];
    selectedAssignedTo: BusinessServiceOwner = new BusinessServiceOwner();
 
    status: GetDynamicValueDto[] = [];
    selectedstatus: GetDynamicValueDto = new GetDynamicValueDto();

    notificationUser: BusinessServiceOwner[]=[];
    selectedNotificationUser: BusinessServiceOwner[]=[];

    project: ProjectListsDto[] = [];
    selectedProject: ProjectListsDto[] = [];

    relatedMembers: BusinessServiceOwner[] = [];
    selectedRelatedMembers: BusinessServiceOwner[] = [];

    meeting: MeetingsDto[] = [];
    selectedMeeting: MeetingsDto[] = [];

    contacts: BusinessServiceOwner[] = [];
    selectedContacts: BusinessServiceOwner[] = [];
    myFiles = [];


     constructor(_injector: Injector,
        private _router: Router,
         private route: ActivatedRoute,
         private _commonMultiDropdownService: MultiselectDropdownService,
        private _taskItemServiceProxy: TaskServiceProxy,      
        public HttpClient:HttpClient
             ) {
                      super(_injector);
               }

    ngOnInit() {
        this.basicInfo = true;
        this.taskItem.frequencys = Frequency.OneTime;
        this.taskItem.prioritys = Priority.High;
        this.route.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );

        if (this.recordId) {
            this.isEdit = true;
            this.getallTaskInfo(this.recordId);
        } else {            
            this.isEdit = false;
            this.getallTaskInfo(this.recordId);
        }

      
    }

    getallTaskInfo(recordId) {        
        this._taskItemServiceProxy.getTaskinfo(recordId).subscribe(res => {
            this.taskItem = res;
            this.taskItem.frequencys = res.frequencys;
            this.taskItem.prioritys = res.prioritys;
            this.tasktype = res.taskTypes;
            this.linked = res.linkedList;
            this.status = res.statuses;
            this.riskLevel = res.riskLevels;
            this.assignedUser = res.assignedUserList;
            this.assignedTo = res.assignedToList;
            this.requesteduser = res.requestedList;
            this.notificationUser = res.assignedToList;
            this.relatedMembers = res.assignedUserList;
            this.project = res.projectList;
            this.meeting = res.meetingList;
            debugger
            this.taskItem.selectedAssociatedProjects = this.taskItem.selectedAssociatedProjects == undefined ? [] : this.taskItem.selectedAssociatedProjects;
            this.taskItem.selectedMeetingTasks = this.taskItem.selectedMeetingTasks == undefined ? [] : this.taskItem.selectedMeetingTasks;
            this.taskItem.selectedRelatedMembers = this.taskItem.selectedRelatedMembers == undefined ? [] : this.taskItem.selectedRelatedMembers;
            this.taskItem.selectedTaskNotifications = this.taskItem.selectedTaskNotifications == undefined ? [] : this.taskItem.selectedTaskNotifications;
            this.taskItem.selectedTaskTaskAttachments = this.taskItem.selectedTaskTaskAttachments == undefined ? [] : this.taskItem.selectedTaskTaskAttachments;
            this.taskItem.removedAssociatedProjects = [];
            this.taskItem.removedMeetingTasks = [];
            this.taskItem.removedNotifications = [];
            this.taskItem.removedRelatedMembers = [];
            this.taskItem.removedTaskTaskAttachments = [];

            if (this.isEdit) {
                this.editTasktype();
                this.editAssignedUser();
                this.editLinked();
                this.editMeeting();
                this.editNotificationUser();
                this.editProject();
                this.editRequested();
                this.editRequestedUser();
                this.editstatus();
                this.editAssignedTo();
                this.editrisklevel();
               
            }
        })
    }

    tasktypeChange(event) {
        
        this.taskItem.taskTypeId = event.value.id;
    }

    linkedChange(event) {
        
        this.taskItem.linkedToId = event.value.id;

    }

    requestedByChange(event) {
        
        this.taskItem.requestedById = event.value.id;
    }

    assignedUserChange(event)
    {
        
        this.taskItem.assignedUserId = event.value.id;
    }

    assignedToChange(event) {
        
        this.taskItem.assignedToId = event.value.id;
    }

   notificationUserChange(event)
    {
        
        this._commonMultiDropdownService.filterForTaskUser(this.taskItem.selectedTaskNotifications,
            this.selectedNotificationUser, this.taskItem.removedNotifications, "TaskNotificationUser", this.isEdit).then((result: any) => {
                debugger
                this.taskItem.selectedTaskNotifications = result.selectedItems;
                this.selectedNotificationUser = result.dropDownItems;
                this.taskItem.removedNotifications = result.removedItems;
            }).catch(exception => {

            });
    }

    projectChange(event)
    {
       
        debugger
        this._commonMultiDropdownService.filterForTaskUser(this.taskItem.selectedAssociatedProjects,
            this.selectedProject, this.taskItem.removedAssociatedProjects, "ProjectAssociated", this.isEdit).then((result: any) => {
                debugger
                this.taskItem.selectedAssociatedProjects = result.selectedItems;
                this.selectedProject = result.dropDownItems;
                this.taskItem.removedAssociatedProjects = result.removedItems;
            }).catch(exception => {

            });
    }

    membersChange(event)
    {
        debugger
        this._commonMultiDropdownService.filterForTaskUser(this.taskItem.selectedRelatedMembers,
            this.selectedRelatedMembers, this.taskItem.removedRelatedMembers, "ReleatedMemeberUsers", this.isEdit).then((result: any) => {
                debugger
                this.taskItem.selectedRelatedMembers = result.selectedItems;
                this.selectedRelatedMembers = result.dropDownItems;
                this.taskItem.removedRelatedMembers = result.removedItems;
            }).catch(exception => {

            });
    }

    meetingChange(event)
    {
        debugger
        this._commonMultiDropdownService.filterForTaskUser(this.taskItem.selectedMeetingTasks,
            this.selectedMeeting, this.taskItem.removedMeetingTasks, "MeetingTask", this.isEdit).then((result: any) => {
                debugger
                this.taskItem.selectedMeetingTasks = result.selectedItems;
                this.selectedMeeting = result.dropDownItems;
                this.taskItem.removedMeetingTasks = result.removedItems;
            }).catch(exception => {

            });
    }

    externalChange(event)
    {

    }

    statusChange(event)
    {
        debugger
        this.taskItem.statusId = event.value.id
    }

    risklevelChange(event) {
        this.taskItem.riskLevelId = event.value.id;
    }

    editTasktype() {
        this.selectedTaskType = null;
        this.tasktype.forEach(obj => {
            if (this.taskItem.taskTypeId == obj.id) {
                this.selectedTaskType = obj;
            }
        })
    }

    editrisklevel() {
        this.selectedRiskLevel = null;
        this.riskLevel.forEach(obj => {
            if (this.taskItem.riskLevelId == obj.id) {
                this.selectedRiskLevel = obj;
            }
        })
    }

    editstatus() {
        this.selectedstatus = null;
        this.status.forEach(obj => {
            if (this.taskItem.statusId == obj.id) {
                this.selectedstatus = obj;
            }
        })
    }

    editLinked() {
        this.selectedLinked = null;
        this.linked.forEach(obj => {
            if (this.taskItem.linkedToId == obj.id) {
                this.selectedLinked = obj;
            }
        })
    }

    editRequestedUser()
    {
        this.selectedRelatedMembers = [];
        this.taskItem.selectedRelatedMembers.forEach(obj => {
            this.relatedMembers.forEach(team => {
                if (obj.employeeId == team.id)
                {
                    var temp = new BusinessServiceOwner();
                    temp.id = team.id;
                    temp.organizationId = team.organizationId;
                    temp.employeeName = team.employeeName;
                    this.selectedRelatedMembers.push(temp);
                }
            });
        });
    }

    editNotificationUser()
    {
        this.selectedNotificationUser = [];
        this.taskItem.selectedTaskNotifications.forEach(obj => {
            this.notificationUser.forEach(team => {
                if (obj.employeeId == team.id) {
                    var temp = new BusinessServiceOwner();
                    temp.id = team.id;
                    temp.organizationId = team.organizationId;
                    temp.employeeName = team.employeeName;
                    this.selectedNotificationUser.push(temp);
                }
            });
        });
    }

    editProject()
    {
        this.selectedProject = [];
        this.taskItem.selectedAssociatedProjects.forEach(obj => {
            debugger
            this.project.forEach(team => {
                if (obj.projectId == team.id) {
                    var temp = new ProjectListsDto();
                    temp.id = team.id;
                    temp.projectName = team.projectName;                    
                    this.selectedProject.push(temp);
                }
            });
        })
    }

    editMeeting()
    {
        this.selectedMeeting = [];
        this.taskItem.selectedMeetingTasks.forEach(obj => {
            this.meeting.forEach(team => {
                if (obj.meetingId == team.id) {
                    var temp = new MeetingsDto();
                    temp.id = team.id;
                    temp.meetingTitle = team.meetingTitle;
                    this.selectedMeeting.push(temp);
                }
            })
        })
    }

    editRequested()
    {
        this.selectedRequesteduser = null;
        this.requesteduser.forEach(obj => {
            if (this.taskItem.requestedById == obj.id) {
                this.selectedRequesteduser = obj;
            }
        })
    }

    editAssignedUser() {
        this.selectedAssignedUser = null;
        this.assignedUser.forEach(obj => {
            if (this.taskItem.assignedUserId == obj.id) {
                this.selectedAssignedUser = obj;
            }
        })
    }

    editAssignedTo() {
        this.selectedAssignedTo = null;
        this.assignedTo.forEach(obj => {
            if (this.taskItem.assignedToId == obj.id) {
                this.selectedAssignedTo = obj;
            }
        })
    }

    addUploadField() {
        this.upload.push({
            uploadField: '',
        });
    }

    onUpload(event) {
        debugger
        for (let file of event.files)
        {
            this.uploadedFiles.push(file);
          //  this.fileUpload();
        }
        this.fileUpload();
        //this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }

    uploadFiles(files: File[]): Subscription
    {
        
    const config = new HttpRequest('POST', this.postUrl, this.myFormData, {
      reportProgress: true
    })
    
    return this.HttpClient.request( config )
    .subscribe(event=>{
      this.httpEvent = event
      
      if (event instanceof HttpResponse) {
        alert('upload complete, old school alert used')
      }
    },
    error=>{
      alert('!failure beyond compare cause:' + error.toString())
    })
    }

    selectView(e) {
        if (e == 'BasicInfo') {
            this.basicInfo = true;
            this.advanced = false;
        }
        if (e == 'Advanced') {
            this.advanced = true;
            this.basicInfo = false;
        }
    }

    goBack() {
        this._router.navigate(['/app/main/task']);
    }
  
    save()
    {

        this.taskItem.uploadFiles = this.myFiles;
        this._taskItemServiceProxy.createorEditTask(this.taskItem).subscribe(res => {
            if (this.isEdit)
            {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            }
            else
            {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/task']);

        });
    }

    fileUpload() {
       debugger
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
            if (fileUpload.files[0].size <= (2097152)) {
                debugger
                for (let index = 0; index < fileUpload.files.length; index++) {
                    var reader = new FileReader();
                    reader.onload = (e: any) => {
                        debugger
                        let file = new UploadFileDto();
                            file.fileName = fileUpload.files[index].name;
                           file.base64 = e.target.result;
                            this.myFiles.push(file);

                    }
                    reader.readAsDataURL(fileUpload.files[index]);
                }
            }
            else {
                this.message.info("Please select Image below 2MB", "Terms");
            }

        };

        //this.labelImport.nativeElement.innerText = Array.from(fileUpload.files)
        //    .map(f => f.name)
        //    .join(', ');
        fileUpload.click();
    }

}
