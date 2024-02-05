import { RemarksService } from './../../../service/-remarks.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from 'src/app/model/formation.model';
import { Trainer } from 'src/app/model/trainer.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-remark-area',
  templateUrl: './leave-remark-area.component.html',
  styleUrls: ['./leave-remark-area.component.scss'],
})
export class LeaveRemarkAreaComponent implements OnInit {

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

  noteLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  constructor(
    private remarksService: RemarksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.getToken();
    if (
      this.remarksToken &&
      this.remarksToken.length > 10 &&
      this.remarksToken.split('.').length !== 2
    ) {
      this.getRemarksTokenValidation();
    } else {
      console.log('Invalid token');
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
   * Bootsrap validation form submit method
   */
  submitForm() {
    this.submit = true;
    if (
      this.noteQuality &&
      this.noteRythme &&
      this.noteSupportCours &&
      this.noteSupportTP &&
      this.noteMaitrise
    ) {

      const data = {
        note_quality: this.noteQuality,
        note_rythme: this.noteRythme,
        note_support_cours: this.noteSupportCours,
        note_support_tp: this.noteSupportTP,
        note_maitrise: this.noteMaitrise,
        formation_id: this.formation.id,
        trainer_id: this.trainer.id,
      };


      console.log(data);
      this.remarksService.submitRemarks(data).subscribe(
        (result) => {
          // Handle success
          Swal.fire({
            title: 'Submited successfully',
            text: 'You have been successfully sent the remarks. Thank you for your feedback!',
            icon: 'success',
            confirmButtonColor: '#5438dc',
            // button text
            confirmButtonText: 'Go Home',
          });
          console.log('Individual added successfully:', result);
        },
        (error: any) => {
          // Handle error
          Swal.fire({
            title: 'Error',
            text: 'An error occurred while sending the remarks. Please try again later!',
            icon: 'error',
            confirmButtonColor: '#5438dc',
            // button text
            confirmButtonText: 'Try Again',
          });
          console.log('Error adding individual:', error);
        }
      );
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Please fill all the fields',
        icon: 'error',
        confirmButtonColor: '#5438dc',
        // button text
        confirmButtonText: 'Try Again',
      });
    }



  }
}
