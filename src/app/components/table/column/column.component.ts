import { Component, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'column',
    template: `
    <ng-template #editMode let-element let-column='col'>
    <input #newVal type="text" [value]='columnData[columnName]' autofocus='true' />
    <button (click)='saveColumn(newVal.value)'>save</button>
  </ng-template>

    <!-- {{columnName}} Column -->
    <ng-container *ngIf='columnName =="select"; else dataCol'>
        <mat-radio-button class="example-radio-button" [checked]='columnData.selected'></mat-radio-button>
    </ng-container>
    <ng-template #dataCol>
        <label *ngIf='!showEdit'(click)="editColumn()">{{columnData[columnName]}}</label>
            <ng-container *ngIf='showEdit'>
                <ng-container *ngTemplateOutlet="editMode; context: { $implicit: columnData, col: columnName }"></ng-container>
            </ng-container>
    </ng-template>
    `
})
export class ColumnComponent {
    @Input() columnName: string;
    @Input() columnData: any;
    public showEdit: boolean;

    constructor(private http: HttpClient) {}

    editColumn() {
        if (this.columnName.toLowerCase().indexOf('id') === -1) {
            this.showEdit = true;
        }
      }
    
      saveColumn(newValue) {
        this.columnData[this.columnName] = newValue;
        this.http.put('/cowData', this.columnData).subscribe(() => {
          this.showEdit = false;
        })
      }
}