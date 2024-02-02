import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MustMatch } from './add-formation.mustmatch';
import { FormationService } from 'src/app/service/-formation.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.scss'],
})

/**
 * Forms Validation component
 */
export class AddFormationComponent implements OnInit {
  formationForm!: UntypedFormGroup; // bootstrap validation form

  cities = ['Tetouan', 'Tanger', 'Casa', 'Rabat'];
  categories = [
    'Development',
    'Design',
    'Data Science',
    'Business',
    'IT & Software',
  ];

  imageUrl: string | null = null;
  selectedImage: File | null = null;
  today = new Date().toISOString().split('T')[0];
  selectedForIndividualSwitch: String = 'false';
  /* selectedStatuslSwitch: String = 'ACTIVE'; */

  currentUrl: string = 'localhost';

  constructor(
    public formBuilder: UntypedFormBuilder,
    private formationService: FormationService,
    private router: Router
  ) {}
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
      { label: 'Add new Formation', active: true },
    ];

    const { hostname, port } = window.location;
    this.currentUrl = `${hostname}${port ? `:${port}` : ''}`;

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
        slug: ['', [Validators.required]],
      } /* , {
      validator: MustMatch('password', 'confirmpwd'),} */
    );

    this.submit = false;
    /* this.formsubmit = false;
    this.typesubmit = false;
    this.rangesubmit = false; */
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
      });

      console.log('_Data', _Data);
      // Create a FormData object to send form data
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      //append the rest of the data and selectedForIndividualSwitch and selectedStatuslSwitch
      formData.append('data', new Blob([_Data], { type: 'application/json' }));

      // Call your service method to add the new formation
      this.formationService.addFormation(formData).subscribe(
        (result) => {
          // Handle success
          Swal.fire({
            title: 'Formation added successfully',
            icon: 'success',
            confirmButtonColor: '#5438dc',
          });
          this.router.navigate(['/dashboard/formations/list']);

          console.log('Formation added successfully:', result);
        },
        (error) => {
          // Handle error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
          console.error('Error adding formation:', error);
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

  public onTitleChange() {
    if (this.form['slug'].value.length == 0)
      this.form['slug'].setValue(
        this.form['title'].value.toLowerCase().replace(/ /g, '-')
      );
  }

  public onSlugChange() {
    this.form['slug'].setValue(
      this.form['slug'].value.toLowerCase().replace(/ /g, '-')
    );
  }

  // public onChangeForIndividualSwitch(event: any) {
  //   this.selectedForIndividualSwitch = event ? 'true' : 'false';

  /* public onChangeStatuslSwitch(event: any) {
    this.selectedStatuslSwitch = event?"ACTIVE":"INACTIVE";
  } */
}
