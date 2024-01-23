import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { CourseListService } from './course-list.service';
import {
  CourseListSortableDirective,
  SortEvent,
} from './course-list-sortable.directive';
import { CourseService } from 'src/app/service/-course.service';
import { Course } from 'src/app/model/course.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [CourseListService, DecimalPipe],
})

/**
 * Advanced table component
 */
export class CourseListComponent implements OnInit {
  // bread crum data
  breadCrumbItems!: Array<{}>;
  hideme: boolean[] = [];

  // Table data
  courseData!: Course[];

  tables$: Observable<Course[]>;
  total$: Observable<number>;

  @ViewChildren(CourseListSortableDirective)
  headers!: QueryList<CourseListSortableDirective>;

  constructor(
    private courseService: CourseService,
    public service: CourseListService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }
  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Courses' },
      { label: 'List of Courses', active: true },
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
    this.courseService.getAllCourse().subscribe(
      (resp: Course[]) => {
        this.service.updateTableData(resp);
        this.courseData = resp; // Assign data

        // Initialize hideme with true for each element in courseData
        this.hideme = Array.from({ length: this.courseData?.length }, () => true);

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
