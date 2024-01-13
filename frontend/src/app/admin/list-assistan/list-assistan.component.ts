import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Assistant } from 'src/app/model/assistant.model';
import { AssistantService } from 'src/app/service/-assistant.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-assistan',
  templateUrl: './list-assistan.component.html',
  styleUrls: ['./list-assistan.component.css'],
})

export class ListAssistanComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Assistant>([]);

  constructor(
    private assistanService: AssistantService,
    private router: Router
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllAssistant();
  }

  public getAllAssistant() {
    this.assistanService.getAllAssistant().subscribe(
      (resp: Assistant[]) => {
        this.dataSource.data = resp; // Assign data to dataSource.data
      },
      (error: HttpErrorResponse) => {
        console.log("error");
        console.log(error);
      }
    );
  }

  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'status', 'action'];

  public viewMore(assistantId: number) {
    this.router.navigate(['admin/assistant/info', assistantId]);
  }

  //#filter 

  filterResults(text: string) {
    // let newdata = this.dataSource.data
    // if (!text) {
    //   this.dataSource.data = newdata;
    //   return;
    // }

    // this.dataSource.data = newdata.filter(
    //   name => name?.firstName.toLowerCase().includes(text.toLowerCase())
    // );
  }
}
