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
import Swal from 'sweetalert2';

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
  formationData: Formation[] = [];

  tables$: Observable<Formation[]>;
  total$: Observable<number>;

  @ViewChildren(FormationListSortableDirective)
  headers: QueryList<FormationListSortableDirective> = new QueryList<FormationListSortableDirective>();

  constructor(
    private formationService: FormationService,
    public service: FormationListService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }
  ngOnInit() {
    console.log('headers', this.headers);
    this.service.loading = true;

    this.breadCrumbItems = [
      { label: 'Formations' },
      { label: 'List of Formations', active: true },
    ];

    /**
     * fetch data
     */
    this._fetchData();
    this.service.loading = false;
    console.log('headers', this.headers);
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
        resp.map(e => {
          e.photo = 'data:image/jpeg;base64,' + e.photo
        })
        this.service.updateTableData(resp);
        this.formationData = resp; // Assign data

        // Initialize hideme with true for each element in formationData
        this.hideme = Array.from(
          { length: this.formationData?.length },
          () => true
        );
      },
      (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);
      }
    );
  }


  //delet formation
  public deleteFormation(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.formationService.deletFormation(id).subscribe(
          (respons: any) => {
            if (respons.message) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
              this._fetchData();
            }
          },
          (error: HttpErrorResponse) => {
            console.log('error: ', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        );
      }
    });
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
