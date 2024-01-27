import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company.service';
import { CompanyListSortableDirective, SortEvent } from './company-list-sortable.directive';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CompanyListService } from './company-list.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  providers: [CompanyListService, DecimalPipe],
})
export class CompanyListComponent implements OnInit {


  // bread crum data
  breadCrumbItems!: Array<{}>;
  hideme: boolean[] = [];

  // Table data
  companyData!: Company[];

  tables$: Observable<Company[]>;
  total$: Observable<number>;

  @ViewChildren(CompanyListSortableDirective)
  headers!: QueryList<CompanyListSortableDirective>;

  constructor(
    private companyService: CompanyService,
    public service: CompanyListService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }
  ngOnInit(): void {
    this.service.loading = true;

    this.breadCrumbItems = [
      { label: 'Company' },
      { label: 'List of Company', active: true },
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
    this.companyService.getAllCompany().subscribe(
      (resp: Company[]) => {
        this.service.updateTableData(resp);
        this.companyData = resp; // Assign data

        // Initialize hideme with true for each element in formationData
        this.hideme = Array.from(
          { length: this.companyData?.length },
          () => true
        );
      },
      (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);
      }
    );
  }


  //delet company
  public deleteCompany(id: number) {
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
        this.companyService.deleteCompany(id).subscribe(
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
