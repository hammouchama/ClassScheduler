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
  isAdd: boolean = false //this for chech wiche form would be display
  isUpdate: boolean = false
  assistantId: any;
  yourFormControl: any;
  constructor(private route: ActivatedRoute,
    private assistanService: AssistantService,
    private router: Router) { }
  ngOnInit(): void {
    this.getId()
    if (this.assistantId) {
      if (this.assistantId >= 0) {
        this.isUpdate = true
        this.getAssistant(this.assistantId)
      }
    } else {
      this.isAdd = true
    }
  }

  //get assistant details
  public async getAssistant(id: number) {
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
      this.assistantId = parseInt(params.get('id') || '')
    });
  }

  //update assistant 
  public Update(updateAssistantFrom: NgForm, id: number) {
    console.log(updateAssistantFrom.value)
    this.assistanService.updateAssistant(id, updateAssistantFrom.value).subscribe(
      (respons: any) => {
        Swal.fire({
          title: "Updated!",
          text: respons.message,
          icon: "success"
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }

    )
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
            if (respons.message) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              this.router.navigate(['admin/assistant'])
            }
          },
          (error: HttpErrorResponse) => {
            console.log("error: ", error)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        )
      }
    });
  }

  // add new assistant 
  public AddAssistant(addAssistant: NgForm) {
    this.assistanService.addAssistant(addAssistant.value).subscribe(
      (respon: any) => {
        Swal.fire({
          title: "Added!",
          text: respon.message,
          icon: "success"
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    )
  }

}
