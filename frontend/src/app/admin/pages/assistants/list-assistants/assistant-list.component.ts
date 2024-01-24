import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './assistant-list.model';

import { tableData } from './data';

import { AssistantListService } from './assistant-list.service';
import { AdvancedSortableDirective, SortEvent } from './assistant-list-sortable.directive';

@Component({
  selector: 'app-assistant-list',
  templateUrl: './assistant-list.component.html',
  styleUrls: ['./assistant-list.component.scss'],
  providers: [AssistantListService, DecimalPipe],
})

/**
 * Advanced table component
 */
export class AssistantListComponent implements OnInit {
  // bread crum data
  breadCrumbItems!: Array<{}>;
  hideme: boolean[] = [];

  // Table data
  tableData!: Table[];

  tables$: Observable<Table[]>;
  total$: Observable<number>;

  @ViewChildren(AdvancedSortableDirective)
  headers!: QueryList<AdvancedSortableDirective>;

  constructor(public service: AssistantListService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }
  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'Advanced Table', active: true },
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
    this.tableData = tableData;
    for (let i = 0; i <= this.tableData.length; i++) {
      this.hideme.push(true);
    }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
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
