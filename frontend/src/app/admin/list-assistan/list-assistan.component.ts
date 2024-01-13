import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assistant } from 'src/app/model/assistant.model';
import { AssistantService } from 'src/app/service/-assistant.service';

//############################
@Component({
  selector: 'app-list-assistan',
  templateUrl: './list-assistan.component.html',
  styleUrls: ['./list-assistan.component.css']
})

export class ListAssistanComponent implements OnInit {


  dataSource: Assistant[] = []
  constructor(private assistanService: AssistantService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllAssistant()
  }

  public getAllAssistant() {
    this.assistanService.getAllAssistant().subscribe(
      (resp: Assistant[]) => {
        this.dataSource = resp
        // console.log(this.dataSource)
      }, (error: HttpErrorResponse) => {
        console.log("error")
        console.log(error)
      }
    )
  }
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'status', 'action']

  public viewMore(assistantId: number) {

    this.router.navigate(['admin/assistant/info', assistantId]);

  }
}
