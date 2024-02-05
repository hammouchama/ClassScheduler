import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/model/trainer.model';
import { TrainerService } from 'src/app/service/trainer.service';
import { UiModule } from "../../../shared/ui/ui.module";
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainer-info',
  standalone: true,
  templateUrl: './trainer-info.component.html',
  styleUrl: './trainer-info.component.scss',
  imports: [UiModule, CommonModule]
})
export class TrainerInfoComponent implements OnInit {

  trainer!: Trainer;
  trainerId: any;
  imageUrl: string | null = null;
  constructor(private trainerService: TrainerService,
    private router: Router,
    private route: ActivatedRoute) { }

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Trainer' },
      { label: 'Trainer Information ', active: true },
    ];


    this.getId();
    if (this.trainerId && this.trainerId >= 0) {
      this.getTrainer(this.trainerId);
    } else {
      this.router.navigate(['/dashboard/trainer/list']);
    }
  }

  //get formation details
  public async getTrainer(id: number) {
    console.log('id', id);
    this.trainerService.getTrainer(id).subscribe(
      (resp: Trainer) => {
        resp.photo = 'data:image/jpeg;base64,' + resp.photo
        console.log('resp', resp);
        this.trainer = resp;
        this.imageUrl = this.trainer.photo || null;
      },
      (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);
        this.router.navigate(['/dashboard/trainer/list']);
      }
    );
  }

  //get id from the url
  public getId() {
    this.route.paramMap.subscribe((params) => {
      this.trainerId = parseInt(params.get('id') || '');
    });
  }

  public acceptTrainer(id: number) {
    this.trainerService.acceptTrainer(id).subscribe(
      (respo: any) => {
        Swal.fire({
          title: "Accepted!",
          text: "Accepted successfully!",
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