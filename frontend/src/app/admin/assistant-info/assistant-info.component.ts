import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assistant } from 'src/app/model/assistant.model';
import { AssistantService } from 'src/app/service/-assistant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assistant-info',
  templateUrl: './assistant-info.component.html',
  styleUrls: ['./assistant-info.component.css']
})
export class AssistantInfoComponent implements OnInit {

  assistan!: Assistant;
  assistantId: number = 0
  yourFormControl: any;
  constructor(private route: ActivatedRoute,
    private assistanService: AssistantService,
    private router: Router) { }
  ngOnInit(): void {
    this.getId()
    if (this.assistantId != 0) {
      this.getAssistant(this.assistantId)
    } else {
      this.router.navigate(['admin/assistant'])
    }
  }

  //get assistant details
  public getAssistant(id: number) {
    this.assistanService.getAssistant(id).subscribe(
      (resp: Assistant) => {
        this.assistan = resp
        // console.log(this.assistan)
      }, (error: HttpErrorResponse) => {
        console.log("error")
        console.log(error)
        this.router.navigate(['admin/assistant']);

      }
    )
  }

  //get id from the url 
  public getId() {
    this.route.paramMap.subscribe((params) => {
      this.assistantId = parseInt(params.get('id') || '', 10);
    });
  }

  //update assistant 
  public Update(updateAssistant: NgForm, id: number) {
    console.log(updateAssistant.value)
  }

  //delet assisstant
  public deletAssistant(id: number) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.assistanService.deletAssistant(id).subscribe(
          (respons: any) => {
            console.log("res", respons)
          },
          (error: HttpErrorResponse) => {
            console.log("error: ", error)
          }
        )
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
}
