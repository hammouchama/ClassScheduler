import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from 'src/app/model/trainer.model';
import { TrainerService } from 'src/app/service/trainer.service';
import { TrainerListSortableDirective, SortEvent } from './trainer-list-sortable.directive';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TrainerListService } from './trainer-list.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrl: './trainer-list.component.scss',
  providers: [TrainerListService, DecimalPipe],
})
export class TrainerListComponent implements OnInit {


  // bread crum data
  breadCrumbItems!: Array<{}>;
  hideme: boolean[] = [];

  // Table data
  trainerData!: Trainer[];

  tables$: Observable<Trainer[]>;
  total$: Observable<number>;

  @ViewChildren(TrainerListSortableDirective)
  headers!: QueryList<TrainerListSortableDirective>;

  constructor(
    private trainerService: TrainerService,
    public service: TrainerListService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }
  ngOnInit(): void {
    this.service.loading = true;

    this.breadCrumbItems = [
      { label: 'Trainer' },
      { label: 'List of Trainer', active: true },
    ];
    /**
     * fetch data
     */
    this._fetchData();
    this.service.loading = false;
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    this.trainerService.getAllTrainer().subscribe(
      (resp: Trainer[]) => {
        this.service.updateTableData(resp);
        this.trainerData = resp; // Assign data

        // Initialize hideme with true for each element in formationData
        this.hideme = Array.from(
          { length: this.trainerData?.length },
          () => true
        );
      },
      (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);
      }
    );
  }


  //delet trainer
  public deleteTrainer(id: number) {
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
        this.trainerService.deleteTrainer(id).subscribe(
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
