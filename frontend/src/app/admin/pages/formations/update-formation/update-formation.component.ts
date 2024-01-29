import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MustMatch } from './update-formation.mustmatch';
import { FormationService } from 'src/app/service/-formation.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from 'src/app/model/formation.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.scss'],
})

/**
 * Forms Validation component
 */
export class UpdateFormationComponent implements OnInit {
  formationForm!: UntypedFormGroup; // bootstrap validation form
  formation!: Formation;
  formationId: any;

  cities = ['Tetouan', 'Tanger', 'Casa', 'Rabat'];
  today = new Date().toISOString().split('T')[0]
  imageUrl: string | null = null;
  selectedImage: File | null = null;

  selectedForIndividualSwitch: String = 'false';
  /* selectedStatuslSwitch: String = 'ACTIVE'; */

  constructor(
    public formBuilder: UntypedFormBuilder,
    private formationService: FormationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  submit: boolean = false;
  /* formsubmit!: boolean;
  typesubmit!: boolean;
  rangesubmit!: boolean; */

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Formations' },
      { label: 'Update new Formation', active: true },
    ];


    this.getId();
    if (this.formationId && this.formationId >= 0) {
      this.getFormation(this.formationId);
    } else {
      this.router.navigate(['/dashboard/formations/list']);
    }

    /**
     * Bootstrap validation form data
     */
    this.formationForm = this.formBuilder.group(
      {
        title: ['', [Validators.required]],
        category: ['', [Validators.required]],
        city: ['', [Validators.required]],
        nb_hours: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        objective: ['', [Validators.required]],
        description: ['', [Validators.required]],
        cost: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        capacity: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        start_registration: ['', [Validators.required]],
        end_registration: ['', [Validators.required]],
      } /* , {
      validator: MustMatch('password', 'confirmpwd'),} */
    );

    this.submit = false;
    /* this.formsubmit = false;
    this.typesubmit = false;
    this.rangesubmit = false; */
  }
  //get formation details
  public async getFormation(id: number) {
    console.log('id', id);
    this.formationService.getFormation(id).subscribe(
      (resp: Formation) => {
        console.log('resp', resp);
        this.formation = resp;
        this.imageUrl = this.formation.photo?.url || null;
      },
      (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);
        this.router.navigate(['/dashboard/formations/list']);
      }
    );
  }

  //get id from the url
  public getId() {
    this.route.paramMap.subscribe((params) => {
      this.formationId = parseInt(params.get('id') || '');
    });
  }

  /**
   * Returns form
   */
  get form() {
    return this.formationForm.controls;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
    console.log(this.formationForm.value);
    console.log(this.formationForm.valid);
    if (this.formationForm.valid && this.selectedImage) {
      console.log('this.formationForm.value', this.formationForm.value);
      const _Data = JSON.stringify({
        ...this.formationForm.value,
        // for_individual: this.selectedForIndividualSwitch,
        /* status: this.selectedStatuslSwitch, */
      });

      console.log('_Data', _Data);
      // Create a FormData object to send form data
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      //append the rest of the data and selectedForIndividualSwitch and selectedStatuslSwitch
      formData.append('data', new Blob([_Data], { type: 'application/json' }));

      /* formData.append(
        'data',
        new Blob([JSON.stringify], {
          type: 'application/json',
        })
      ); */
      // Call your service method to update the new formation
      this.formationService.updateFormation(this.formationId, formData).subscribe(
        (result) => {
          // Handle success
          Swal.fire({
            title: 'Formation Updated successfully',
            icon: 'success',
            confirmButtonColor: '#5438dc',
          });
          this.router.navigate(['/dashboard/formations/list']);

          console.log('Formation Updated successfully:', result);
        },
        (error) => {
          // Handle error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
          console.error('Error while Updating formation:', error);
        }
      );
    }
  }

  // dropzone upload function

  /* public onUploadSuccess(event: any): void {
    this.selectedFile = event[0];
    console.log('fileis :', this.selectedFile);
    console.log('onUploadSuccess:', event);
  } */

  public removeImage(): void {
    this.selectedImage = null;
    this.imageUrl = null;
  }
  public onUploadSuccess(event: any) {
    // Handle successful upload if needed
    console.log('File uploaded successfully', event);
    this.selectedImage = event;
    this.imageUrl = URL.createObjectURL(event);
  }

  public onChangeForIndividualSwitch(event: any) {
    this.selectedForIndividualSwitch = event ? 'true' : 'false';
  }

  /* public onChangeStatuslSwitch(event: any) {
    this.selectedStatuslSwitch = event?"ACTIVE":"INACTIVE";
  } */
}
