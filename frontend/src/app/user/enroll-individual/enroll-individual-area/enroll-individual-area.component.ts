import { Formation, categoryColors } from 'src/app/model/formation.model';
import { cities } from './../../../model/formation.model';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/service/-formation.service';
import { IndividualService } from 'src/app/service/-individual.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enroll-individual-area',
  templateUrl: './enroll-individual-area.component.html',
  styleUrls: ['./enroll-individual-area.component.scss'],
})
export class EnrollIndividualAreaComponent implements OnInit {
  individualForm!: UntypedFormGroup; // bootstrap validation form

  formationSlug: string = '';

  formation!: Formation;

  cities = cities;

  submit: boolean = false;

  loading: boolean = true;

  categoryColors = categoryColors;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private individualService: IndividualService,
    private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    /**
     * Bootstrap validation form data
     */
    /*
    name
    phone
    email
    city
    birth_date
    group
    */
    this.individualForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      birth_date: [
        '',
        [Validators.required],

      ],
    });

    this.loading = true;
    this.getSlug();
    if (this.formationSlug && this.formationSlug.length > 0) {
      this.getFormationBySlug(this.formationSlug);
    }
    this.loading = false;
    this.submit = false;
  }

  //get slug from the url
  public getSlug() {
    this.route.paramMap.subscribe((params) => {
      this.formationSlug = params.get('slug') || '';
    });
  }

  private getFormationBySlug(slug: string) {
    // Call your service method to get the formation data by slug
    this.formationService.getPublicFormationBySlug(slug).subscribe(
      (result) => {
        // Handle success
        console.log('Formation data:', result);
        result.photo = 'data:image/jpeg;base64,' + result.photo
        this.formation = result;
      },
      (error: any) => {
        // Handle error
        console.log('Error getting formation data:', error);
      }
    );
  }

  /**
   * Returns form
   */
  get form() {
    // return both controls of the individualForm and individualForm2
    return this.individualForm.controls;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
    console.log(this.individualForm);
    console.log(this.individualForm.valid);
    if (this.individualForm.valid) {
      // // Merge form values
      // const _Data = this.form['value'];
      // console.log('_Data', _Data);
      // // Convert _Data to a JSON string
      // const jsonData = JSON.stringify(_Data);
      // // Create a FormData object to send form data
      // let formData = new FormData();
      // //append the rest of the data and selectedForIndividualSwitch and selectedStatuslSwitch
      // formData.append(
      //   'data',
      //   new Blob([jsonData], { type: 'application/json' })
      // );

      // Call your service method to add the new individual
      this.individualService
        .registerToFormation(this.formation.id, this.individualForm.value)
        .subscribe(
          (result) => {
            // Handle success
            Swal.fire({
              title: 'Registred successfully',
              text: 'You have been successfully registered, we will contact you soon',
              icon: 'success',
              confirmButtonColor: '#5438dc',
            });
            this.router.navigate(['/formation/' + this.formationSlug]);
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
    }
  }
}
