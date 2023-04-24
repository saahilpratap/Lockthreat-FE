import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { Paginator } from 'primeng/components/paginator/paginator';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';


declare var Highcharts: any;

export interface PeriodicElement {
    pic: string;
    taskId: string;
    taskTitle: string;
    name: string;
    assignUser: string;
    requestedBy: string;
   

   

}

const ELEMENT_DATA: PeriodicElement[] = [
    { pic: '../assets/common/icon/home-dashboard/homeDash2.png', taskId: 'TAS-8', taskTitle: 'Task Name', name: 'Johny Depp', assignUser: 'qurram@live.com', requestedBy: 'Johny Depp - C.E.O - Newlight Investment', },
    { pic: '../assets/common/icon/home-dashboard/homeDash2.png', taskId: 'TAS-8 ', taskTitle: 'Task Name', name: 'Johny Depp', assignUser: 'qurram@live.com', requestedBy: 'Johny Depp - C.E.O - Newlight Investment', },
];
export class Group {
    level = 0;
    expanded = false;
    totalCounts = 0;
}

export class Car {
    id: string = '';
    vin: string = '';
    brand: string = '';
    year: string = '';
    color: string = '';
}



@Component({
    selector: 'home-dashboard',
    templateUrl: './home-dashboard.component.html',
    styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent extends AppComponentBase implements OnInit {
    title = 'Home';
    subTitle = 'Home Dashboard';
    pageTitle = '';
    taskData: Array<any> = [];
    gridTask = [
        { pic: '../assets/common/icon/home-dashboard/homeDash2.png', taskId: 'TAS-8', taskTitle: 'Task Name', name: 'Johny Depp', assignUser: 'qurram@live.com', requestedBy: 'Johny Depp - C.E.O - Newlight Investment', },
        { pic: '../assets/common/icon/home-dashboard/homeDash2.png', taskId: 'TAS-8 ', taskTitle: 'Task Name', name: 'Johny Depp', assignUser: 'qurram@live.com', requestedBy: 'Johny Depp - C.E.O - Newlight Investment', },
    ];
    displayedColumns: string[] = ['select', 'pic', 'taskId', 'taskTitle', 'name', 'assignUser', 'requestedBy'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('dataTable', { static: true }) dataTable: Table;

    public dataSource1 = new MatTableDataSource<any | Group>([]);

    columns: any[];
    displayedColumns1: string[];
    groupByColumns: string[] = [];
    allData: any[];
    _allGroup: any[];

    expandedCar: any[] = [];
    expandedSubCar: Car[] = [];

    //@ViewChild(MatSort) sort: MatSort;



 
    items = [
        { name: "Apple", type: "fruit" },
        { name: "Carrot", type: "vegetable" },
        { name: "Orange", type: "fruit" }
    ];
    droppedItems: any;
    onItemDrop(e: any) {
        this.droppedItems.push(e.dragData);
    }

    chartData: any[];
    scheme: any = {
        name: 'green',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#34bfa3'
        ]
    };
    list: any;
    grid: any;

    
    constructor(_injector: Injector,
        private _router: Router,
    ) {
        super(_injector);

        this.columns = [{
            field: 'id'
        }, {
            field: 'vin'
        }, {
            field: 'brand'
        }, {
            field: 'year'
        }, {
            field: 'color'
        }];
        this.displayedColumns1 = this.columns.map(column => column.field);
        this.groupByColumns = ['brand'];
    }

   

    taskCard = [
        { icon: 'la la-weixin', title: 'Dashboard', amt: '025' },
        { icon: 'la la-weixin', title: 'Active GRC Projects', amt: '022' },
        { icon: 'la la-weixin', title: 'Exception Requests', amt: '523' },
        { icon: 'la la-weixin', title: 'My Tasks', amt: '452' }
    ];
    taskGridDaya = [  
        { header:'Open', },
        { header: 'In Progress',},
        { header: 'Completed', },
        { header: 'On Hold', },
    ];

    ngOnInit() {
        this.grid = true;
        this.dataSource.sort = this.sort;
    }
    
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.taskId + 1}`;
    }
    
    showGrid() {
        this.grid = true;
        this.list = false;
    }
    showList() {
        this.grid = false;
        this.list = true;
    }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
}
