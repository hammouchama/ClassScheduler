import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { AssistantListService } from './assistant-list.service';
import {
  AssistantListSortableDirective,
  SortEvent,
} from './assistant-list-sortable.directive';
import { AssistantService } from 'src/app/service/-assistant.service';
import { Assistant } from 'src/app/model/assistant.model';
import { HttpErrorResponse } from '@angular/common/http';

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
  assistantData!: Assistant[];

  tables$: Observable<Assistant[]>;
  total$: Observable<number>;

  @ViewChildren(AssistantListSortableDirective)
  headers!: QueryList<AssistantListSortableDirective>;

  constructor(
    private assistantService: AssistantService,
    public service: AssistantListService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }
  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Assistants' },
      { label: 'List of Assistants', active: true },
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
    this.assistantService.getAllAssistant().subscribe(
      (resp: Assistant[]) => {
        this.service.updateTableData(resp);
        this.assistantData = resp; // Assign data

        // Initialize hideme with true for each element in assistantData
        this.hideme = Array.from({ length: this.assistantData?.length }, () => true);

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
