import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { SortDirection } from './formation-list-sortable.directive';
import { Formation } from 'src/app/model/formation.model';

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
}
interface SearchResult {
  tables: Formation[];
  total: number;
}

function compare(v1:any, v2: any) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

/**
 * Sort the table data
 * @param tables Formation field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(tables: Formation[], column: keyof Formation, direction: string): Formation[] {
  if (direction === '') {
    return tables;
  } else {
    return [...tables].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

/**
 * Formation Data Match with Search input
 * @param tables Formation field value fetch
 * @param term Search the value
 */
function matches(tables: Formation, term: string, pipe: PipeTransform) {
    return tables.title.toLowerCase().includes(term.toLowerCase())
        || tables.category.toLowerCase().includes(term.toLowerCase())
        || tables.city.toLowerCase().includes(term.toLowerCase())
        || tables.nb_hours.toString().includes(term.toLowerCase())
        || tables.cost.toString().includes(term.toLowerCase())
        || tables.for_individual.toLowerCase().includes(term.toLowerCase())
        || tables.status.toLowerCase().includes(term.toLowerCase())
}

@Injectable({
  providedIn: 'root',
})
export class FormationListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tables$ = new BehaviorSubject<Formation[]>([]);
  // Table data
  private formationData = new BehaviorSubject<Formation[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 1,
    endIndex: 10,
    totalRecords: 0,
  };

  constructor(private pipe: DecimalPipe) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._tables$.next(result.tables);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  /**
   * Returns the value
   */
  get tables$() {
    return this._tables$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }
  get startIndex() {
    return this._state.startIndex;
  }
  get endIndex() {
    return this._state.endIndex;
  }
  get totalRecords() {
    return this._state.totalRecords;
  }

  /**
   * set the value
   */
  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set startIndex(startIndex: number) {
    this._set({ startIndex });
  }
  set endIndex(endIndex: number) {
    this._set({ endIndex });
  }
  set totalRecords(totalRecords: number) {
    this._set({ totalRecords });
  }
  set searchTerm(searchTerm: string) {
    console.log('triggered');
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }
  set loading(loading: boolean) {
    this._loading$.next(loading);
  }

  private _set(patch: Partial<State>) {
    console.log('_set called with:', patch);
    console.log('triggered, value of searchTerm: |', this.searchTerm, '|');

    const newState = { ...this._state, ...patch };

    if (
      newState.searchTerm === this._state.searchTerm &&
      newState.sortColumn === this._state.sortColumn &&
      newState.sortDirection === this._state.sortDirection
    ) {
      console.log('No change in searchTerm, not triggering search.');
      return;
    }

    Object.assign(this._state, patch);
    this._search$.next();
  }

  updateTableData(data: Formation[]) {
    this._tables$.next(data);
    this.formationData.next(data);
  }

  /**
   * Search Method
   */
  private _search(): Observable<SearchResult> {
    console.log('called');
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    console.log('debugging!!');
    console.log(this._tables$.value);
    // 1. sort
    let tables = sort(
      this.formationData.value,
      sortColumn as keyof Formation,
      sortDirection
    );
    console.log(tables);

    // 2. filter
    tables = tables.filter((table) => matches(table, searchTerm, this.pipe));
    const total = tables.length;

    console.log(tables);
    // 3. paginate
    this.totalRecords = tables.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    tables = tables.slice(this._state.startIndex - 1, this._state.endIndex - 1);

    console.log(tables);
    return of({ tables, total });
  }
}
