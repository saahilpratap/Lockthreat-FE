import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingServiceProxy, ProgramUser, MeetingInfoDto, CountryDto, GetDynamicValueDto, FacilitieDatacenterListDto } from '@shared/service-proxies/service-proxies';
import { MultiselectDropdownService } from 'app/shared/common/component/common-services/multiselect-dropdown-service.service';

@Component({
    selector: 'add-meeting',
    templateUrl: './add-meeting.component.html',
    styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent extends AppComponentBase implements OnInit {

    @ViewChild('SampleDatePicker', { static: true }) sampleDatePicker: ElementRef;

    text: string;
    task: boolean;
    issues: boolean;
    finding: boolean;
    displayTask: boolean;
    displayIssues: boolean;
    displayFindings: boolean;
    title = 'Home';
    subTitle = 'Home Dashboard';
    pageTitle = 'Meetings Management';
    isEdit: boolean;
    recordId: any;

    sampleDate: moment.Moment;
    meetinginfo: MeetingInfoDto = new MeetingInfoDto();

    Organizer: ProgramUser[] = [];
    selectedOrganizer: ProgramUser = new ProgramUser();

    moMPrepared: ProgramUser[] = [];
    selectedmoMPrepared: ProgramUser = new ProgramUser();

    meetingType: GetDynamicValueDto[] = [];
    selectedMeetingType: GetDynamicValueDto = new GetDynamicValueDto();

    meetingClassFication: GetDynamicValueDto[] = [];
    selectedmeetingClassFication: GetDynamicValueDto = new GetDynamicValueDto();

    attendeesUser: ProgramUser[] = [];
    selectedAttendeesUser: ProgramUser[] = [];

    absenteesUser: ProgramUser[] = [];
    selectedAbsenteesUser: ProgramUser[] = [];

    country: CountryDto[] = [];
    selectedCountry: CountryDto = new CountryDto();

    meetingVenue: FacilitieDatacenterListDto[] = [];
    selectedMeetingVenue: FacilitieDatacenterListDto = new FacilitieDatacenterListDto();



    constructor(_injector: Injector,
        private _meetingService: MeetingServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _commonMultiDropdownService: MultiselectDropdownService,
        private _router: Router,
    ) {
        super(_injector);
    }


    ngOnInit()
    {
        this._activatedRoute.queryParams.subscribe(
            params => {
                this.recordId = params['recordId'];
            }
        );
        if (this.recordId)
        {
            this.isEdit = true;
            this.getAllMeeting(this.recordId);
        } else {
            this.isEdit = false;
            this.getAllMeeting(this.recordId);
        }
    }

    getAllMeeting(recordId)
    {
            this._meetingService.getMeetingInfo(recordId).subscribe(result => {
            this.meetinginfo = result;
            this.Organizer = result.employeeLists;
            this.moMPrepared = result.employeeLists;
            this.meetingType = result.meetingTypes;
            this.meetingClassFication = result.meetingClassifications;
            this.absenteesUser = result.employeeLists;
            this.attendeesUser = result.employeeOrganizerLists;
            this.country = result.countries;
            this.meetingVenue = result.meetingLocationList;
            this.meetinginfo.selectedMeetingAbsenteeUsers = this.meetinginfo.selectedMeetingAbsenteeUsers == undefined ? [] : this.meetinginfo.selectedMeetingAbsenteeUsers;
            this.meetinginfo.selectedMeetingAttendUsers = this.meetinginfo.selectedMeetingAttendUsers == undefined ? [] : this.meetinginfo.selectedMeetingAttendUsers;
            this.meetinginfo.removeMeetingAbsenteeUsers = [];
            this.meetinginfo.removeMeetingAttendUsers = [];
                if (this.isEdit)
                {
                this.editCountry();
                this.editorganizer();
                this.editMeetingType();
                this.editClassfication();
                this.editAttendeesUser();
                this.editAbsenteesUser();
                this.editmom();
                this.editmeetingvenue();
                }
        });
    }

    organizerChange(event)
    {
        this.meetinginfo.organizerId = event.value.id;
    }

    meetingTypeChange(event)
    {
        this.meetinginfo.meetingTypeId = event.value.id;
    }


    meetingvenue(event)
    {
        this.meetinginfo.meetingvenueId = event.value.id;
    }

    editmeetingvenue() {
        this.selectedMeetingVenue = null;
        this.meetingVenue.forEach(obj => {
            if (obj.id == this.meetinginfo.meetingvenueId) {
                this.selectedMeetingVenue = obj;
            }
        })
    }

    meetingClassFicationChange(event) {
        this.meetinginfo.meetingClassificationId = event.value.id;
    }

    attendeesUserChange(event)
    {
        this._commonMultiDropdownService.filterForMeetingUser(this.meetinginfo.selectedMeetingAttendUsers,
            this.selectedAttendeesUser, this.meetinginfo.removeMeetingAttendUsers, "MeetingAttendUser", this.isEdit).then((result: any) => {
                this.meetinginfo.selectedMeetingAttendUsers = result.selectedItems;
                this.selectedAttendeesUser = result.dropDownItems;
                this.meetinginfo.removeMeetingAttendUsers = result.removedItems;
            }).catch(exception => {

            });
    }

    absenteesUserChange(event)
    {
        this._commonMultiDropdownService.filterForMeetingUser(this.meetinginfo.selectedMeetingAbsenteeUsers,
            this.selectedAbsenteesUser, this.meetinginfo.removeMeetingAbsenteeUsers, "MeetingAbsenteeUser", this.isEdit).then((result: any) => {
                this.meetinginfo.selectedMeetingAbsenteeUsers = result.selectedItems;
                this.selectedAbsenteesUser = result.dropDownItems;
                this.meetinginfo.removeMeetingAbsenteeUsers = result.removedItems;
            }).catch(exception => {

            });
    }

    countryChange(event)
    {
        this.meetinginfo.countryId = event.value.id;
    }

    moMPreparedChange(event) {
        this.meetinginfo.employeeId = event.value.id;
    }

    editCountry() {
        this.country.forEach(obj => {
            if (obj.id == this.meetinginfo.countryId) {
                this.selectedCountry = obj;
            }
        })
    }

    editorganizer() {
        this.Organizer.forEach(obj => {
            if (obj.id == this.meetinginfo.organizerId) {
                this.selectedOrganizer = obj;
            }
        })
    }

    editMeetingType()
    {
        this.meetingType.forEach(obj => {
            if (obj.id == this.meetinginfo.meetingTypeId) {
                this.selectedMeetingType = obj;
            }
        })
    }

    editmom() {
        this.selectedmoMPrepared = null;

        this.moMPrepared.forEach(obj => {
            if (obj.id == this.meetinginfo.employeeId) {
                this.selectedmoMPrepared = obj;
            }
        })

    }

    editClassfication()
    {
        this.meetingClassFication.forEach(obj => {
            if (obj.id == this.meetinginfo.meetingClassificationId) {
                this.selectedmeetingClassFication = obj;
            }
        })
    }

    editAbsenteesUser() {
        
        this.selectedAbsenteesUser = [];
        this.meetinginfo.selectedMeetingAbsenteeUsers.forEach(obj => {
            this.absenteesUser.forEach(team => {
                if (obj.employeeId == team.id) {
                    var temp = new ProgramUser();
                    temp.id = team.id;
                    temp.organizationId = team.organizationId;
                    temp.employeeName = team.employeeName;
                    this.selectedAbsenteesUser.push(temp);
                }
            });
        });
    }

    editAttendeesUser() {
        
        this.selectedAttendeesUser = [];
        this.meetinginfo.selectedMeetingAttendUsers.forEach(obj => {
            this.attendeesUser.forEach(team => {
                if (obj.employeeId == team.id) {
                    var temp = new ProgramUser();
                    temp.id = team.id;
                    temp.organizationId = team.organizationId;
                    temp.employeeName = team.employeeName;
                    this.selectedAttendeesUser.push(temp);
                }
            });
        });
    }

    CreateorUpdateMeeting() {
        
        this._meetingService.createorUpdateMeeting(this.meetinginfo).subscribe(result => {
            if (this.isEdit) {
                abp.notify.success(this.l('SuccessfullyUpdated'));
            }
            else {
                abp.notify.success(this.l('SavedSuccessfully'));
            }
            this._router.navigate(['/app/main/minutes-meeting']);
        });
    }

    taskModal() {
        this.displayTask = true;
    }

    issuesModal() {
        this.displayIssues = true;
    }

    findingsModal() {
        this.displayFindings = true;
    }

    goBack() {
        this._router.navigate(['/app/main/minutes-meeting']);
    }


}
