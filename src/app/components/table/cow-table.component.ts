import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddDataDialogComponent } from '../add-data-dialog.component';
import { CowTrackingData } from '../../models/cow-tracking-data.model';

@Component({
    selector: 'cow-table',
    templateUrl: './cow-table.component.html',
    styleUrls: ['./cow-table.component.scss']
})
export class CowTableComponent implements OnInit {
    displayedColumns: string[] = ['select', 'eventId', 'cowId', 'healthIndex', 'endDate', 'minValueDateTime', 'type', 
  'animalId', 'deletable', 'lactationNumber', 'daysInLactation', 'ageInDays', 'startDateTime', 
  'reportingDateTime', 'alertType'];
  dataSource: MatTableDataSource<CowTrackingData>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selectedRow: any;
  name = 'test';
  animal = 'animal test';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.getCowData();
    this.dataSource.paginator = this.paginator;
  }

  getCowData() {
    this.http.get('/cowData')
    .subscribe(res => {
      this.dataSource = new MatTableDataSource<CowTrackingData>(res['result']);
    })
  }

  deleteRow() {
    this.http.post('/deleteCowData', this.selectedRow)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource<CowTrackingData>(res['result']);
      this.selectedRow = null;
      this.dataSource.data.map(item => {
        item.selected = false;
      })
    });
  }

  addRow() {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.http.post('/addCowData', result)
      .subscribe(res => {
        this.dataSource = new MatTableDataSource<CowTrackingData>(res['result']);
      })
    });
  }

  onRowSelection(row) {
    this.selectedRow = row;
    this.dataSource.data.map(item => {
      item.selected = row.eventId === item.eventId;
    })
  }

}