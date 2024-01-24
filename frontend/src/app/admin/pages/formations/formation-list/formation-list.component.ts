import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { FormationListService } from './formation-list.service';
import {
  FormationListSortableDirective,
  SortEvent,
} from './formation-list-sortable.directive';
import { Formation } from 'src/app/model/formation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormationService } from 'src/app/service/-formation.service';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss'],
  providers: [FormationListService, DecimalPipe],
})

/**
 * Advanced table component
 */
export class FormationListComponent implements OnInit {
  // bread crum data
  breadCrumbItems!: Array<{}>;
  hideme: boolean[] = [];

  // Table data
  formationData!: Formation[];

  tables$: Observable<Formation[]>;
  total$: Observable<number>;

  @ViewChildren(FormationListSortableDirective)
  headers!: QueryList<FormationListSortableDirective>;

  constructor(
    private formationService: FormationService,
    public service: FormationListService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }
  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Formations' },
      { label: 'List of Formations', active: true },
    ];

    /**
     * fetch data
     */
    this._fetchData();
  }

  changeValue(i: number) {
    this.hideme[i] = !this.hideme[i];
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    this.formationService.getAllFormation().subscribe(
      (resp: Formation[]) => {
        this.service.updateTableData(resp);
        this.formationData = resp; // Assign data

        // Initialize hideme with true for each element in formationData
        this.hideme = Array.from({ length: this.formationData?.length }, () => true);

      },
      (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);
      }
    );

  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    console.log("onSort");
    console.log(column, '//', direction);
    console.log(this.headers.get(0)?.direction);
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}