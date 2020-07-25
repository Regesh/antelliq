import { Component } from "@angular/core";
import {MatDialogRef} from '@angular/material/dialog';
import { CowTrackingData } from "../models/cow-tracking-data.model";

@Component({
    selector: 'add-data-dialog',
    template: `
    <h1 mat-dialog-title>Add new tracking data</h1>
    <div mat-dialog-content>    
    <mat-form-field *ngFor='let dataField of dataFields'>
        <mat-label>{{dataField}}</mat-label>
        <input matInput [(ngModel)]="data[dataField]">
    </mat-form-field>
    </div>
    <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">cancel</button>
    <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Add</button>
    </div>
    `
})
export class AddDataDialogComponent {
    dataFields  = ['eventId', 'cowId', 'healthIndex', 'endDate', 'minValueDateTime', 'type', 
  'animalId', 'deletable', 'lactationNumber', 'daysInLactation', 'ageInDays', 'startDateTime', 
  'reportingDateTime', 'alertType'];
  data = new CowTrackingData();
    constructor(
        public dialogRef: MatDialogRef<AddDataDialogComponent>){}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
}