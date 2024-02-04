import { ChangeDetectorRef, Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';


import { categoryColors, cities, Formation } from 'src/app/model/formation.model';
type SortDirection = 'asc' | 'desc' | '';
interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
  selectedCategories: string[];
  selectedCities: string[];
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
        /* || tables.lastName.toLowerCase().includes(term.toLowerCase())
        || tables.email.toLowerCase().includes(term.toLowerCase())
        || tables.phone.toLowerCase().includes(term.toLowerCase())
        || tables.address.toLowerCase().includes(term.toLowerCase()); */
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
    totalRecords: -1,
    selectedCategories: [],
    selectedCities: [],
  };

  constructor(private pipe: DecimalPipe, private cdr: ChangeDetectorRef) {
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
  get selectedCategories() {
    return this._state.selectedCategories;
  }
  get selectedCities() {
    return this._state.selectedCities;
  }
  get categoryCounts() {
    return this.countCategories(this._tables$.value);
  }
  get cityCounts() {
    return this.countCities(this._tables$.value);
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
  set selectedCategories(selectedCategories: string[]) {
    console.log('triggered selectedCategories');
    this._set({ selectedCategories });
  }
  set selectedCities(selectedCities: string[]) {
    console.log('triggered selectedCities');
    this._set({ selectedCities });
  }

  private _set(patch: Partial<State>) {
    console.log('_set called with:', patch);
    console.log('triggered, value of searchTerm: |', this.searchTerm, '|');

    const newState = { ...this._state, ...patch };

    if (
      !(
        newState.searchTerm === this._state.searchTerm &&
        newState.sortColumn === this._state.sortColumn &&
        newState.sortDirection === this._state.sortDirection &&
        this.arraysEqual(newState.selectedCategories,this._state.selectedCategories) &&
        this.arraysEqual(newState.selectedCities,this._state.selectedCities)
      )
    ) {
      this._search$.next();
    }

    Object.assign(this._state, patch);
    console.log('No change, not triggering filter.');
  }

  updateTableData(data: Formation[]) {
    this._tables$.next(data);
    this.formationData.next(data);
  }

  // Helper function to compare arrays for equality
  private arraysEqual(a: any[], b: any[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  // reset filters
  resetFilters() {
    this._set({
      page: 1,
      pageSize: 10,
      searchTerm: '',
      sortColumn: '',
      sortDirection: '',
      startIndex: 1,
      endIndex: 10,
      totalRecords: -1,
      selectedCategories: [],
      selectedCities: [],
    });
    this._search();
  }

  countCategories(tables: Formation[]): { [category: string]: number } {
    const listCat = Object.keys(categoryColors);
    return tables.reduce((count, formation) => {
      const category = listCat.includes(formation.category)
        ? formation.category
        : 'Others';
      count[category] = (count[category] || 0) + 1;
      return count;
    }, {} as { [category: string]: number });
  }
  countCities(tables: Formation[]): { [city: string]: number } {
    const listCities = cities;
    return tables.reduce((count, formation) => {
      const city = listCities.includes(formation.city)
        ? formation.city
        : 'Others';
      count[city] = (count[city] || 0) + 1;
      return count;
    }, {} as { [city: string]: number });
  }



  /**
   * Filter Methods
   *  */
  private _filterCategory(tables: Formation[],selectedCategories:string[]): Formation[] {
    if (selectedCategories && selectedCategories.length > 0) {
      if (selectedCategories.includes('Others')) {
        // Include all categories that are not in the selected categories, or belong to the explicitly selected categories
        const listCat = Object.keys(categoryColors);
        tables = tables.filter(
          (formation) =>
            !listCat.includes(formation.category) ||
            selectedCategories.includes(formation.category)
        );
      } else {
        // Only include formations that match the selected categories
        tables = tables.filter((formation) =>
          selectedCategories.includes(formation.category)
        );
      }
    }
    return tables;
  }
  private _filterCity(tables: Formation[],selectedCities:string[]): Formation[] {
    if (selectedCities && selectedCities.length > 0) {
      if (selectedCities.includes('Others')) {
        // Include all categories that are not in the selected categories, or belong to the explicitly selected categories
        const listCities = cities;
        tables = tables.filter(
          (formation) =>
            !listCities.includes(formation.category) ||
            selectedCities.includes(formation.category)
        );
      } else {
        // Only include formations that match the selected categories
        tables = tables.filter((formation) =>
          selectedCities.includes(formation.category)
        );
      }
    }
    return tables;
  }

  /**
   * Search Method
   */
  private _search(): Observable<SearchResult> {
    console.log('called');
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchTerm,
      selectedCategories,
      selectedCities,
    } = this._state;

    /* console.log('debugging!!');
    console.log(this._tables$.value); */
    // 1. sort
    let tables = sort(
      this.formationData.value,
      sortColumn as keyof Formation,
      sortDirection
    );
    console.log(tables);

    // Filter by selected categories
    tables=this._filterCategory(tables,selectedCategories);
    // Filter by selected cities
    tables=this._filterCity(tables,selectedCities);

    console.log(tables);
    // 2. filter
    tables = tables.filter((formation) =>
      matches(formation, searchTerm, this.pipe)
    );
    const total = tables.length;

    console.log(tables);
    // 3. paginate
    this.totalRecords = total;
    console.log(this.totalRecords);
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    console.log(
      this._state.startIndex,
      this._state.endIndex,
      this._state.totalRecords
    );
    tables = tables.slice(this._state.startIndex - 1, this._state.endIndex);

    console.log(tables);
    return of({ tables, total });
  }
}
