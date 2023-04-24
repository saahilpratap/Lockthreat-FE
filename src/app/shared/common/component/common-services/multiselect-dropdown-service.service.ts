import { Injectable, Injector, PACKAGE_ROOT_URL } from '@angular/core';
import {
    ProgramTeamDto, ProgramCoordinatorDto, MeetingAbsenteeUserDto, HardwareAssetITserviceDto, HardwareAssetBusinessprocessDto,
    FacilitieDatacenterITServiceDto, FacilitieDatacenterServiceDto, HardwareAssetBusinessServiceDto,
    FacilitieDatacenterProcessDto, TaskAssociatedProjectDto, TaskNotificationDto,
    AssetInformationITserviceDto, AssetInformationBusinessServiceDto, AssetInformationBusinessprocessDto,
    TaskRelatedMemberDto, MeetingTaskDto, MeetingAttendUserDto, ServiceBusinessUnitDto,
    KPIBusinessUnitDto, ITserviceBusinessServiceDto, ITserviceBusinessUnitDto, BusinessProcessUnitDto,
    BusinessProcessServiceDto, BusinessProcessAuthorativeDocumentDto, KPIAdminisratorDto,
    BusinessUnitKeyRiskDto, ProgramCountriesDto, ProjectCountriesDto, ProjectTeamMemberDto,
    VirtualAssetITserviceDto, VirtualAssetBusinessprocessDto, VirtualAssetBusinessServiceDto,
    SysteamApplicationITserviceDto, SysteamApplicationBusinessProcessDto, SystemApplicationServiceDto,
    ProjectTeamMemberInternalDto, ProjectTeamMemberExternalDto, ProjectAuthoratativeDocumentDto, ProjectComponentsDto, ProgramAuthoritativeDocumentsDto,
    AuditAuditorDto, AuditBusinessProcessDto, AuditBusinessServiceDto, AuditFacilitieDatacenterDto, AuditTeamDto, AuditVendorDto,
    AuditFindingDto, AuditSystemApplicationDto,
    ExceptionAuditingControlDto, ExceptionBusinessUnitDto, ExceptionCitationDto, ExceptionCitationLibraryDto, ExceptionAuthoratativeDocumentDto,
    ExceptionOrganizationDto, ExceptionRemediationDto, ExceptionRiskManagementDto


} from '../../../../../shared/service-proxies/service-proxies'; 
import { AppComponentBase } from '../../../../../shared/common/app-component-base'; 

@Injectable({
    providedIn: 'root'
})
export class MultiselectDropdownService extends AppComponentBase {

    constructor(injector: Injector) {
        super(injector);
    }

    filterProgramMultiselect(source: any, dest: any, drop: any, filterFor: string, isEdit = false) {
        let promise = new Promise((resolve, reject) => {
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "Team") {
                                if (data.programTeamsId == obj.id) {
                                    exist = true;
                                }
                            } else {
                                if (filterFor == "Coordinator") {
                                    if (data.programCoordinatorId == obj.id) {
                                        exist = true;
                                    }
                                } else {
                                    if (filterFor == "Countries") {
                                        if (data.countryId == obj.id) {
                                            exist = true;
                                        }
                                    } else {
                                        if (filterFor == "AuthDoc") {
                                            if (data.authoratativeDocumentId == obj.id) {
                                                exist = true;
                                            }
                                        } else {
                                            if (filterFor == "") {

                                            } else {

                                            }
                                        }
                                    }
                                }
                            }
                        });
                        if (!exist) {
                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "Team") {
                    debugger
                    let item = source.filter(t => t.programTeamsId == obj.id);
                    if (item.length == 0) {
                        debugger
                        var team = new ProgramTeamDto();
                        team.id = 0;
                        team.grcProgramId = 0;
                        team.programTeamsId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "Coordinator") {
                        let item = source.filter(t => t.programCoordinatorId == obj.id);
                        if (item.length == 0) {
                            var coordinator = new ProgramCoordinatorDto();
                            coordinator.id = 0;
                            coordinator.grcProgramId = 0;
                            coordinator.programCoordinatorsId = obj.id;
                            source.push(coordinator);
                        }
                    }
                    else {
                        if (filterFor == "Countries") {
                            let item = source.filter(t => t.countryId == obj.id);
                            if (item.length == 0) {
                                var country = new ProgramCountriesDto();
                                country.id = 0;
                                country.projectId = 0;
                                country.countryId = obj.id;
                                source.push(country);
                            }
                        }
                        else {
                            if (filterFor == "AuthDoc") {
                                let item = source.filter(t => t.authoratativeDocumentsId == obj.id);
                                if (item.length == 0) {
                                    var authDoc = new ProgramAuthoritativeDocumentsDto();
                                    authDoc.id = 0;
                                    authDoc.authoratativeDocumentId = obj.id;
                                    authDoc.grcProgramId = 0;
                                    source.push(authDoc);
                                }
                            } else {
                                if (filterFor == "") {
                                    let item = source.filter(t => t.programCoordinatorId == obj.id);
                                    if (item.length == 0) {

                                    }
                                } else {

                                }
                            }
                        }
                    }
                }

            });
            debugger
            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterProjectMultiselect(source: any, dest: any, drop: any, filterFor: string, isEdit = false) {
        let promise = new Promise((resolve, reject) => {
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "Team") {
                                if (data.teamMembersId == obj.id) {
                                    exist = true;
                                }
                            } else {
                                if (filterFor == "InternalTeam") {
                                    if (data.teamMembersInternalId == obj.id) {
                                        exist = true;
                                    }
                                } else {
                                    if (filterFor == "Countries") {
                                        if (data.countryId == obj.id) {
                                            exist = true;
                                        }
                                    } else {
                                        if (filterFor == "ExternalTeam") {
                                            if (data.teamMembersExternalId == obj.id) {
                                                exist = true;
                                            }
                                        } else {
                                            if (filterFor == "AuthDoc") {
                                                if (data.authoratativeDocumentId == obj.id) {
                                                    exist = true;
                                                }
                                            } else {
                                                if (filterFor == "Projectcomponent") {
                                                    if (data.projectComponentId == obj.id) {
                                                        exist = true;
                                                    }
                                                } else {

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        if (!exist) {
                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "Team") {
                    debugger
                    let item = source.filter(t => t.teamMembersId == obj.id);
                    if (item.length == 0) {
                        var team = new ProjectTeamMemberDto();
                        team.id = 0;
                        team.projectId = 0;
                        team.teamMembersId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "InternalTeam") {
                        let item = source.filter(t => t.teamMembersInternalId == obj.id);
                        if (item.length == 0) {
                            var internal = new ProjectTeamMemberInternalDto();
                            internal.id = 0;
                            internal.projectId = 0;
                            internal.teamMembersInternalId = obj.id;
                            source.push(internal);
                        }
                    }
                    else {
                        if (filterFor == "Countries") {
                            let item = source.filter(t => t.countryId == obj.id);
                            if (item.length == 0) {
                                var country = new ProjectCountriesDto();
                                country.id = 0;
                                country.projectId = 0;
                                country.countryId = obj.id;
                                source.push(country);
                            }
                        }
                        else {
                            if (filterFor == "ExternalTeam") {
                                let item = source.filter(t => t.teamMembersExternalId == obj.id);
                                if (item.length == 0) {
                                    var ext = new ProjectTeamMemberExternalDto();
                                    ext.id = 0;
                                    ext.projectId = 0;
                                    ext.teamMembersExternalId = obj.id;
                                    source.push(ext);
                                }
                            }

                            else {
                                if (filterFor == "AuthDoc")
                                {
                                    let item = source.filter(t => t.authoratativeDocumentId == obj.id);
                                    if (item.length == 0) {
                                        var authDoc = new ProjectAuthoratativeDocumentDto();
                                        authDoc.id = 0;
                                        authDoc.projectId = 0;
                                        authDoc.authoratativeDocumentId = obj.id;
                                        source.push(authDoc);
                                    }
                                }
                                else {
                                    let item = source.filter(t => t.projectComponentId == obj.id);
                                    if (item.length == 0) {
                                        var comp = new ProjectComponentsDto();
                                        comp.id = 0;
                                        comp.projectId = 0;
                                        comp.projectComponentId = obj.id;
                                        source.push(comp);
                                    }
                                }
                            }
                        }
                    }
                }

            });

            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterBusinessServiceMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false) {
        debugger
        let promise = new Promise((resolve, reject) => {
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "BusinessUnit") {
                                
                                if (data.businessUnitId == obj.id) {
                                    
                                    exist = true;
                                }
                            } else {
                                if (filterFor == "ITservice") {
                                    if (data.itServiceId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {
                                   
                                }
                            }
                        });
                        if (!exist) {
                            
                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    debugger
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "BusinessUnit") {
                    debugger
                    let item = source.filter(t => t.businessUnitId == obj.id);
                    if (item.length == 0) {
                        
                        var team = new ServiceBusinessUnitDto();
                        team.id = 0;
                        team.businessServiceId = 0;
                        team.businessUnitId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "ITservice") {                        
                        let item = source.filter(t => t.itServiceId == obj.id);
                        if (item.length == 0) {
                            
                            var internal = new ITserviceBusinessServiceDto();
                            internal.id = 0;
                            internal.businessServiceId = 0;
                            internal.itServiceId = obj.id;
                            source.push(internal);
                        }
                    } else {                        
                    }
                }

            });

            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForKeyRiskIndicatorMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false) {
        
        let promise = new Promise((resolve, reject) => {
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "BusinessUnit") {
                                
                                if (data.businessUnitId == obj.id) {
                                    
                                    exist = true;
                                }
                            } 
                        });
                        if (!exist) {
                            
                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "BusinessUnit") {                    
                    let item = source.filter(t => t.businessUnitId == obj.id);
                    if (item.length == 0) {                        
                        var team = new BusinessUnitKeyRiskDto();
                        team.id = 0;
                        team.keyRiskIndicatorId = 0;
                        team.businessUnitId = obj.id;
                        source.push(team);
                    }
                }                

            });

            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForKeyperformanceIndicatorMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false) {

        let promise = new Promise((resolve, reject) => {
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "Administrator") {

                                if (data.employeeId == obj.id) {

                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "BusinessUnitKPI") {
                                    if (data.businessUnitId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {

                                }
                            }
                        });
                        if (!exist) {

                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "Administrator") {
                    let item = source.filter(t => t.employeeId == obj.id);
                    if (item.length == 0) {
                        var team = new KPIAdminisratorDto();
                        team.id = 0;
                        team.keyPerformanceIndicatorId = 0;
                        team.employeeId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "BusinessUnitKPI") {
                        let item = source.filter(t => t.businessUnitId == obj.id);
                        if (item.length == 0) {
                            var internal = new KPIBusinessUnitDto();
                            internal.id = 0;
                            internal.keyPerformanceIndicatorId = 0;
                            internal.businessUnitId = obj.id;
                            source.push(internal);
                        }
                    }
                }

            });

            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForBusinessProcessMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false) {
        let promise = new Promise((resolve, reject) => {
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "BusinessUnit") {
                                if (data.businessUnitId == obj.id) {
                                    exist = true;
                                }
                            } else {
                                if (filterFor == "BusinessService") {
                                    if (data.businessServiceId == obj.id) {
                                        exist = true;
                                    }
                                } else {
                                    if (filterFor == "Documents") {
                                        if (data.authoratativeDocumentId == obj.id) {
                                            exist = true;
                                        }
                                    } 
                                }
                            }
                        });
                        if (!exist) {
                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "BusinessUnit") {
                    debugger
                    let item = source.filter(t => t.businessUnitId == obj.id);
                    if (item.length == 0) {
                        var businessunit = new BusinessProcessUnitDto();
                        businessunit.id = 0;
                        businessunit.businessProcessId = 0;
                        businessunit.businessUnitId = obj.id;
                        source.push(businessunit);
                    }
                }
                else {
                    if (filterFor == "BusinessService") {
                        debugger
                        let item = source.filter(t => t.businessServiceId == obj.id);
                        if (item.length == 0) {
                            debugger
                            var service = new BusinessProcessServiceDto();
                            service.id = 0;
                            service.businessProcessId = 0;
                            service.businessServiceId = obj.id;
                            source.push(service);
                        }
                    } else {
                        if (filterFor == "Documents") {
                            let item = source.filter(t => t.authoratativeDocumentId == obj.id);
                            if (item.length == 0) {
                                var doc = new BusinessProcessAuthorativeDocumentDto();
                                doc.id = 0;
                                doc.businessProcessId = 0;
                                doc.authoratativeDocumentId = obj.id;
                                source.push(doc);
                            }
                        } 
                    }
                }

            });

            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForITserviceMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false) {
        let promise = new Promise((resolve, reject) => {
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "BusinessUnit") {

                                if (data.businessUnitId == obj.id) {

                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "BusinessService") {
                                    if (data.businessServiceId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {

                                }
                            }
                        });
                        if (!exist) {

                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "BusinessUnit") {
                    debugger
                    let item = source.filter(t => t.businessUnitId == obj.id);
                    if (item.length == 0) {
                        debugger
                        var team = new ITserviceBusinessUnitDto();
                        team.id = 0;
                        team.itServiceId = 0;
                        team.businessUnitId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "BusinessService") {
                        let item = source.filter(t => t.businessServiceId == obj.id);
                        if (item.length == 0) {
                            var itservice = new ITserviceBusinessServiceDto();
                            itservice.id = 0;
                            itservice.itServiceId = 0;
                            itservice.businessServiceId = obj.id;
                            source.push(itservice);
                        }
                    }
                }

            });

            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForMeetingUser(source: any, dest: any, drop: any, filterFor: string, isEdit = false) {
        let promise = new Promise((resolve, reject) => {
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "MeetingAbsenteeUser") {

                                if (data.employeeId == obj.id) {

                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "MeetingAttendUser") {
                                    if (data.employeeId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {

                                }
                            }
                        });
                        if (!exist) {

                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "MeetingAbsenteeUser") {                    
                    let item = source.filter(t => t.employeeId == obj.id);
                    if (item.length == 0)
                    {                        
                        var team = new MeetingAbsenteeUserDto();
                        team.id = 0;
                        team.meetingId = 0;
                        team.employeeId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "MeetingAttendUser") {
                        let item = source.filter(t => t.employeeId == obj.id);
                        if (item.length == 0) {
                            var temp = new MeetingAttendUserDto();
                            temp.id = 0;
                            temp.meetingId = 0;
                            temp.employeeId = obj.id;
                            source.push(temp);
                        }
                    }
                }

            });

            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForTaskUser(source: any, dest: any, drop: any, filterFor: string, isEdit = false)
    {
        let promise = new Promise((resolve, reject) => {
            debugger
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "TaskNotificationUser") {
                                if (data.employeeId == obj.id) {
                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "ProjectAssociated") {
                                    if (data.projectId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {
                                    if (filterFor == "ReleatedMemeberUsers") {
                                        if (data.employeeId == obj.id) {
                                            exist = true;
                                        }
                                    }
                                    else {
                                        if (filterFor == "MeetingTask") {
                                            if (data.meetingId == obj.id) {
                                                exist = true;
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        if (!exist) {
                            debugger
                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "TaskNotificationUser") {
                    let item = source.filter(t => t.employeeId == obj.id);
                    if (item.length == 0) {
                        var team = new TaskNotificationDto();
                        team.id = 0;
                        team.addTaskId = 0;
                        team.employeeId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "ProjectAssociated") {
                        let item = source.filter(t => t.projectId == obj.id);
                        if (item.length == 0) {
                            var temp = new TaskAssociatedProjectDto();
                            temp.id = 0;
                            temp.addTaskId = 0;
                            temp.projectId = obj.id;
                            source.push(temp);
                        }
                    }
                    else {
                        if (filterFor == "ReleatedMemeberUsers") {
                            let item = source.filter(t => t.employeeId == obj.id);
                            if (item.length == 0) {
                                var country = new TaskRelatedMemberDto();
                                country.id = 0;
                                country.addTaskId = 0;
                                country.employeeId = obj.id;
                                source.push(country);
                            }
                        }
                        else {
                            if (filterFor == "MeetingTask") {
                                let item = source.filter(t => t.meetingId == obj.id);
                                if (item.length == 0) {
                                    var meeting = new MeetingTaskDto();
                                    meeting.id = 0;
                                    meeting.addTaskId = 0;
                                    meeting.meetingId = obj.id;
                                    source.push(meeting);
                                }
                            }
                        }
                    }
                }

            });

            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForfacilitiesDatacenter(source: any, dest: any, drop: any, filterFor: string, isEdit = false) {
        let promise = new Promise((resolve, reject) => {
            debugger
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "FCBusinessService") {
                                if (data.businessServiceId == obj.id) {
                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "FCBusinessProcess") {
                                    if (data.businessProcessId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {
                                    if (filterFor == "FCITservice") {
                                        if (data.itServiceId == obj.id) {
                                            exist = true;
                                        }
                                    }
                                    else {
                                        
                                    }
                                }
                            }
                        });
                        if (!exist) {
                            debugger
                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "FCBusinessService") {
                    let item = source.filter(t => t.businessServiceId == obj.id);
                    if (item.length == 0) {
                        var team = new FacilitieDatacenterServiceDto();
                        team.id = 0;
                        team.facilitieDatacenterId = 0;
                        team.businessServiceId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "FCBusinessProcess") {
                        let item = source.filter(t => t.businessProcessId == obj.id);
                        if (item.length == 0) {
                            var temp = new FacilitieDatacenterProcessDto();
                            temp.id = 0;
                            temp.facilitieDatacenterId = 0;
                            temp.businessProcessId = obj.id;
                            source.push(temp);
                        }
                    }
                    else {
                        if (filterFor == "FCITservice") {
                            let item = source.filter(t => t.itServiceId == obj.id);
                            if (item.length == 0) {
                                var itservice = new FacilitieDatacenterITServiceDto();
                                itservice.id = 0;
                                itservice.facilitieDatacenterId = 0;
                                itservice.itServiceId = obj.id;
                                source.push(itservice);
                            }
                        }
                        else {
                            
                        }
                    }
                }

            });

            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForHardwareAssetMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false)
    {
        let promise = new Promise((resolve, reject) => {
          
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "HABusinessService") {
                                if (data.businessServiceId == obj.id) {
                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "HABusinessProcess") {
                                    if (data.businessProcessId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {
                                    if (filterFor == "HAITservice") {
                                        if (data.itServiceId == obj.id) {
                                            exist = true;
                                        }
                                    }
                                    else {

                                    }
                                }
                            }
                        });
                        if (!exist) {
                            debugger
                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "HABusinessService") {
                    let item = source.filter(t => t.businessServiceId == obj.id);
                    if (item.length == 0) {
                        var team = new HardwareAssetBusinessServiceDto();
                        team.id = 0;
                        team.hardwareAssetId = 0;
                        team.businessServiceId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "HABusinessProcess") {
                        let item = source.filter(t => t.businessProcessId == obj.id);
                        if (item.length == 0) {
                            var temp = new HardwareAssetBusinessprocessDto();
                            temp.id = 0;
                            temp.hardwareAssetId = 0;
                            temp.businessProcessId = obj.id;
                            source.push(temp);
                        }
                    }
                    else {
                        if (filterFor == "HAITservice") {
                            let item = source.filter(t => t.itServiceId == obj.id);
                            if (item.length == 0) {
                                var itservice = new HardwareAssetITserviceDto();
                                itservice.id = 0;
                                itservice.hardwareAssetId = 0;
                                itservice.itServiceId = obj.id;
                                source.push(itservice);
                            }
                        }
                        else {

                        }
                    }
                }

            });
            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }
     
    filterForAssetInformationMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false) {
        let promise = new Promise((resolve, reject) => {

            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "AIBusinessService") {
                                if (data.businessServiceId == obj.id) {
                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "AIBusinessProcess") {
                                    if (data.businessProcessId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {
                                    if (filterFor == "AIITservice") {
                                        if (data.itServiceId == obj.id) {
                                            exist = true;
                                        }
                                    }
                                    else {

                                    }
                                }
                            }
                        });
                        if (!exist) {
                            
                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "AIBusinessService") {
                    let item = source.filter(t => t.businessServiceId == obj.id);
                    if (item.length == 0) {
                        var team = new AssetInformationBusinessServiceDto();
                        team.id = 0;
                        team.assetInformatinId = 0;
                        team.businessServiceId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "AIBusinessProcess") {
                        let item = source.filter(t => t.businessProcessId == obj.id);
                        if (item.length == 0) {
                            var temp = new AssetInformationBusinessprocessDto();
                            temp.id = 0;
                            temp.assetInformatinId = 0;
                            temp.businessProcessId = obj.id;
                            source.push(temp);
                        }
                    }
                    else {
                        if (filterFor == "AIITservice") {
                            let item = source.filter(t => t.itServiceId == obj.id);
                            if (item.length == 0) {
                                var itservice = new AssetInformationITserviceDto();
                                itservice.id = 0;
                                itservice.assetInformatinId = 0;
                                itservice.itServiceId = obj.id;
                                source.push(itservice);
                            }
                        }
                        else {

                        }
                    }
                }

            });
            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForVirtualAssetMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false)
    {
        let promise = new Promise((resolve, reject) => {

            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "VABusinessService") {
                                if (data.businessServiceId == obj.id) {
                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "VABusinessProcess") {
                                    if (data.businessProcessId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {
                                    if (filterFor == "VAITservice") {
                                        if (data.itServiceId == obj.id) {
                                            exist = true;
                                        }
                                    }
                                    else {

                                    }
                                }
                            }
                        });
                        if (!exist) {

                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "VABusinessService") {
                    let item = source.filter(t => t.businessServiceId == obj.id);
                    if (item.length == 0) {
                        var team = new VirtualAssetBusinessServiceDto();
                        team.id = 0;
                        team.virtualAssetId = 0;
                        team.businessServiceId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "VABusinessProcess") {
                        let item = source.filter(t => t.businessProcessId == obj.id);
                        if (item.length == 0) {
                            var temp = new VirtualAssetBusinessprocessDto();
                            temp.id = 0;
                            temp.virtualAssetId = 0;
                            temp.businessProcessId = obj.id;
                            source.push(temp);
                        }
                    }
                    else {
                        if (filterFor == "VAITservice") {
                            let item = source.filter(t => t.itServiceId == obj.id);
                            if (item.length == 0) {
                                var itservice = new VirtualAssetITserviceDto();
                                itservice.id = 0;
                                itservice.virtualAssetId = 0;
                                itservice.itServiceId = obj.id;
                                source.push(itservice);
                            }
                        }
                        else {

                        }
                    }
                }

            });
            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForSysteamApplicationMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false)
    {
        let promise = new Promise((resolve, reject) => {

            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "SABusinessService") {
                                if (data.businessServiceId == obj.id) {
                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "SABusinessProcess") {
                                    if (data.businessProcessId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {
                                    if (filterFor == "SAITservice") {
                                        if (data.itServiceId == obj.id) {
                                            exist = true;
                                        }
                                    }
                                    else {

                                    }
                                }
                            }
                        });
                        if (!exist) {

                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }

            dest.forEach(obj => {
                if (filterFor == "SABusinessService") {
                    let item = source.filter(t => t.businessServiceId == obj.id);
                    if (item.length == 0) {
                        var team = new SystemApplicationServiceDto();
                        team.id = 0;
                        team.systemApplicationId = 0;
                        team.businessServiceId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "SABusinessProcess") {
                        let item = source.filter(t => t.businessProcessId == obj.id);
                        if (item.length == 0)
                        {
                            var temp = new SysteamApplicationBusinessProcessDto();
                            temp.id = 0;
                            temp.systemApplicationId = 0;
                            temp.businessProcessId = obj.id;
                            source.push(temp);
                        }
                    }
                    else {
                        if (filterFor == "SAITservice") {
                            let item = source.filter(t => t.itServiceId == obj.id);
                            if (item.length == 0)
                            {
                                var itservice = new SysteamApplicationITserviceDto();
                                itservice.id = 0;
                                itservice.systemApplicationId = 0;
                                itservice.itServiceId = obj.id;
                                source.push(itservice);
                            }
                        }
                        else {

                        }
                    }
                }

            });

            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });

        });
        return promise;
    }

    filterForAuditMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false)
    {       
        let promise = new Promise((resolve, reject) => {
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "ABusinessService") {
                                if (data.businessServiceId == obj.id) {
                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "ABusinessProcess") {
                                    if (data.businessProcessId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {
                                    if (filterFor == "AAuditor") {
                                        if (data.employeeId == obj.id) {
                                            exist = true;
                                        }
                                    }
                                    else {
                                        if (filterFor == "AFacilities") {
                                            if (data.facilitieDatacenterId == obj.id) {
                                                exist = true;
                                            }
                                        }
                                        else {
                                            if (filterFor == "AAuditTeam") {
                                                if (data.employeeId == obj.id) {
                                                    exist = true;
                                                }
                                            }
                                            else {
                                                if (filterFor == "AVendor") {
                                                    if (data.vendorId == obj.id) {
                                                        exist = true;
                                                    }
                                                }
                                                else {
                                                    if (filterFor == "AFinding") {
                                                        if (data.findingId == obj.id) {
                                                            exist = true;
                                                        }
                                                    }
                                                    else {
                                                        if (filterFor == "ASystemApplication") {
                                                            if (data.systemApplicationId == obj.id) {
                                                                exist = true;
                                                            }
                                                        }
                                                        
                                                    }

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        if (!exist) {

                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }
            dest.forEach(obj => {
                if (filterFor == "ABusinessService") {
                    let item = source.filter(t => t.businessServiceId == obj.id);
                    if (item.length == 0) {
                        var team = new AuditBusinessServiceDto();
                        team.id = 0;
                        team.auditId = 0;
                        team.businessServiceId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "AAuditor") {
                        let item = source.filter(t => t.employeeId == obj.id);
                        if (item.length == 0) {
                            var auditaudit = new AuditAuditorDto();
                            auditaudit.id = 0;
                            auditaudit.auditId = 0;
                            auditaudit.employeeId = obj.id;
                            source.push(auditaudit);
                        }
                    }
                    else {
                        if (filterFor == "ABusinessProcess") {
                            let item = source.filter(t => t.itServiceId == obj.id);
                            if (item.length == 0) {
                                var businessprocess = new AuditBusinessProcessDto();
                                businessprocess.id = 0;
                                businessprocess.auditId = 0;
                                businessprocess.businessProcessId = obj.id;
                                source.push(businessprocess);
                            }
                        }
                        else {
                            if (filterFor == "AFacilities") {
                                let item = source.filter(t => t.facilitieDatacenterId == obj.id);
                                if (item.length == 0) {
                                    var facilitiesdatacenter = new AuditFacilitieDatacenterDto();
                                    facilitiesdatacenter.id = 0;
                                    facilitiesdatacenter.auditId = 0;
                                    facilitiesdatacenter.facilitieDatacenterId = obj.id;
                                    source.push(facilitiesdatacenter);
                                }
                            }
                            else {
                                if (filterFor == "AAuditTeam") {
                                    let item = source.filter(t => t.employeeId == obj.id);
                                    if (item.length == 0) {
                                        var auditTeam = new AuditTeamDto();
                                        auditTeam.id = 0;
                                        auditTeam.auditId = 0;
                                        auditTeam.employeeId = obj.id;
                                        source.push(auditTeam);
                                    }
                                }
                                else {
                                    if (filterFor == "AVendor") {
                                        let item = source.filter(t => t.vendorId == obj.id);
                                        if (item.length == 0) {
                                            var auditvendor = new AuditVendorDto();
                                            auditvendor.id = 0;
                                            auditvendor.auditId = 0;
                                            auditvendor.vendorId = obj.id;
                                            source.push(auditvendor);
                                        }
                                    }

                                    else {
                                        if (filterFor == "AFinding") {
                                            let item = source.filter(t => t.findingId == obj.id);
                                            if (item.length == 0) {
                                                var auditfinding = new AuditFindingDto();
                                                auditfinding.id = 0;
                                                auditfinding.auditId = 0;
                                                auditfinding.findingId = obj.id;
                                                source.push(auditfinding);
                                            }
                                        }
                                        else {
                                            if (filterFor == "ASystemApplication") {
                                                debugger
                                                let item = source.filter(t => t.systemApplicationId == obj.id);
                                                if (item.length == 0) {
                                                    var SystemApplication = new AuditSystemApplicationDto();
                                                    SystemApplication.id = 0;
                                                    SystemApplication.auditId = 0;
                                                    SystemApplication.systemApplicationId = obj.id;
                                                    source.push(SystemApplication);
                                                }
                                            }
                                            
                                        }
                                        
                                    }
                                }

                                
                            }
                        }
                    }
                }

            });
            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });
        });
        return promise;
    } 

    filterForExceptionMultipleSelect(source: any, dest: any, drop: any, filterFor: string, isEdit = false)
    {
        let promise = new Promise((resolve, reject) => {
            if (isEdit == true) {
                let prevData = source;
                if (dest.length > 0) {
                    prevData.forEach(data => {
                        let exist = false;
                        dest.forEach(obj => {
                            if (filterFor == "EXAuditing") {
                                if (data.citationId == obj.id) {
                                    exist = true;
                                }
                            }
                            else {
                                if (filterFor == "EXBusinessUnit") {
                                    if (data.businessUnitId == obj.id) {
                                        exist = true;
                                    }
                                }
                                else {
                                    if (filterFor == "EXCition") {
                                        if (data.citationId == obj.id) {
                                            exist = true;
                                        }
                                    }
                                    else {
                                        if (filterFor == "EXCitationLibrary") {
                                            if (data.citationId == obj.id) {
                                                exist = true;
                                            }
                                        }
                                        else {
                                            if (filterFor == "EXAuthoratativeDocument") {
                                                if (data.authoratativeDocumentId == obj.id) {
                                                    exist = true;
                                                }
                                            }
                                            else {
                                                if (filterFor == "EXOrganization") {
                                                    if (data.lockThreatOrganizationId == obj.id) {
                                                        exist = true;
                                                    }
                                                }
                                                else {
                                                    if (filterFor == "EXRemediation") {
                                                        if (data.remediationId == obj.id) {
                                                            exist = true;
                                                        }
                                                    }
                                                    else {
                                                        if (filterFor == "EXRiskManagement") {
                                                            if (data.riskManagementId == obj.id) {
                                                                exist = true;
                                                            }
                                                        }

                                                    }

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        if (!exist) {

                            let index = source.findIndex(x => x.id == data.id);
                            drop.push(source[index].id);
                            source.splice(index, 1);
                        }
                    });
                }
                else {
                    prevData.forEach(data => {
                        drop.push(data.id);
                    });
                    source = [];
                }

            }
            dest.forEach(obj => {
                if (filterFor == "EXAuditing") {
                    let item = source.filter(t => t.citationId == obj.id);
                    if (item.length == 0) {
                        var team = new ExceptionAuditingControlDto();
                        team.id = 0;
                        team.exceptionId = 0;
                        team.citationId = obj.id;
                        source.push(team);
                    }
                }
                else {
                    if (filterFor == "EXBusinessUnit") {
                        let item = source.filter(t => t.businessUnitId == obj.id);
                        if (item.length == 0) {
                            var businessUnit = new ExceptionBusinessUnitDto();
                            businessUnit.id = 0;
                            businessUnit.exceptionId = 0;
                            businessUnit.businessUnitId = obj.id;
                            source.push(businessUnit);
                        }
                    }
                    else {
                        if (filterFor == "EXCition") {
                            let item = source.filter(t => t.citationId == obj.id);
                            if (item.length == 0) {
                                var citation = new ExceptionCitationDto();
                                citation.id = 0;
                                citation.exceptionId = 0;
                                citation.citationId = obj.id;
                                source.push(citation);
                            }
                        }
                        else {
                            if (filterFor == "EXCitationLibrary") {
                                let item = source.filter(t => t.citationId == obj.id);
                                if (item.length == 0) {
                                    var citationLibrary = new ExceptionCitationLibraryDto();
                                    citationLibrary.id = 0;
                                    citationLibrary.exceptionId = 0;
                                    citationLibrary.citationId = obj.id;
                                    source.push(citationLibrary);
                                }
                            }
                            else {
                                if (filterFor == "EXAuthoratativeDocument") {
                                    let item = source.filter(t => t.authoratativeDocumentId == obj.id);
                                    if (item.length == 0) {
                                        var autho = new ExceptionAuthoratativeDocumentDto();
                                        autho.id = 0;
                                        autho.exceptionId = 0;
                                        autho.authoratativeDocumentId = obj.id;
                                        source.push(autho);
                                    }
                                }
                                else {
                                    if (filterFor =="EXOrganization") {
                                        let item = source.filter(t => t.lockThreatOrganizationId == obj.id);
                                        if (item.length == 0) {
                                            debugger
                                            var org = new ExceptionOrganizationDto();
                                            org.id = 0;
                                            org.exceptionId = 0;
                                            org.lockThreatOrganizationId = obj.id;
                                            source.push(org);
                                        }
                                    }

                                    else {
                                        if (filterFor == "EXRemediation") {
                                            let item = source.filter(t => t.remediationId == obj.id);
                                            if (item.length == 0) {
                                                var remediation = new ExceptionRemediationDto();
                                                remediation.id = 0;
                                                remediation.exceptionId = 0;
                                                remediation.remediationId = obj.id;
                                                source.push(remediation);
                                            }
                                        }
                                        else {
                                            if (filterFor == "EXRiskManagement") {
                                                debugger
                                                let item = source.filter(t => t.riskManagementId == obj.id);
                                                if (item.length == 0) {
                                                    var riskManagement = new ExceptionRiskManagementDto();
                                                    riskManagement.id = 0;
                                                    riskManagement.exceptionId = 0;
                                                    riskManagement.riskManagementId = obj.id;
                                                    source.push(riskManagement);
                                                }
                                            }

                                        }

                                    }
                                }


                            }
                        }
                    }
                }

            });
            resolve({ selectedItems: source, dropDownItems: dest, removedItems: drop });
        });
        return promise;
    } 
}
