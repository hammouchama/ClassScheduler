import { RemarksService } from './../../../service/-remarks.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { s } from '@fullcalendar/core/internal-common';
import { Formation } from 'src/app/model/formation.model';
import { Trainer } from 'src/app/model/trainer.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-remark-area',
  templateUrl: './leave-remark-area.component.html',
  styleUrls: ['./leave-remark-area.component.scss'],
})
export class LeaveRemarkAreaComponent implements OnInit {
  remarkForm!: UntypedFormGroup; // bootstrap validation form

  remarksToken: string = '';

  formation!: Formation;
  trainer!: Trainer;

  submit: boolean = false;

  loading: boolean = true;

  noteQuality: number = 0;
  noteRythme: number = 0;
  noteSupportCours: number = 0;
  noteSupportTP: number = 0;
  noteMaitrise: number = 0;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private remarksService: RemarksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.remarkForm = this.formBuilder.group({
      note_quality: ['', [Validators.required]],
      note_rythme: ['', [Validators.required]],
      note_support_cours: ['', [Validators.required]],
      note_support_tp: ['', [Validators.required]],
      note_maitrise: ['', [Validators.required]],
    });
    this.loading = true;

    this.getToken();
    if (this.remarksToken && this.remarksToken.length > 10 && this.remarksToken.split('.').length !== 2) {
      this.getRemarksTokenValidation();
    }else{
      console.log("Invalid token");
      this.router.navigate(['/401']);
    }
    this.loading = false;
    this.submit = false;
  }

  //get slug from the url
  public getToken() {
    this.route.paramMap.subscribe((params) => {
      this.remarksToken = params.get('token') || '';
      console.log(this.remarksToken);
    });
  }

  private getRemarksTokenValidation() {
    this.remarksService.validateRemarksToken(this.remarksToken).subscribe(
      (result) => {
        // Handle success
        console.log('Remarks token validation data:', result);
        if (result.valid) {
          this.formation = result.formation;
          this.trainer = result.trainer;
        } else {
          this.router.navigate(['/401']);
          console.log(result.error);
        }
      },
      (error: any) => {
        // Handle error
        console.log('Error getting remarks token validation data:', error);
        this.router.navigate(['/500']);

      }
    );
  }

  /**
   * Returns form
   */
  get form() {
    // return both controls of the remarkForm and remarkForm2
    return this.remarkForm.controls;
  }

  /**
   * Bootsrap validation form submit method
   */
  submitForm() {
    this.submit = true;
    /* console.log(this.remarkForm);
    console.log(this.remarkForm.valid); */
    /* if (this.remarkForm.valid) {
      this.individualService
        .registerToFormation(this.formation.id, this.remarkForm.value)
        .subscribe(
          (result) => {
            // Handle success
            Swal.fire({
              title: 'Registred successfully',
              text: 'You have been successfully registered, we will contact you soon',
              icon: 'success',
              confirmButtonColor: '#5438dc',
            });
            this.router.navigate(['/formation/' + this.remarksToken]);
            console.log('Individual added successfully:', result);
          },
          (error: any) => {
            // Handle error
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
            });
            console.log('Error adding individual:', error);
          }
        );
    } */
  }
}
