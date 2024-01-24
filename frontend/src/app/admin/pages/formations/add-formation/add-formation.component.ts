import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MustMatch } from './add-formation.mustmatch';
import { FormationService } from 'src/app/service/-formation.service';

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
  tooltipvalidationform!: UntypedFormGroup; // bootstrap tooltip validation form
  typeValidationForm!: UntypedFormGroup; // type validation form
  rangeValidationForm!: UntypedFormGroup; // range validation form

  imageUrl: string | null = null;
  cities = ['Tetouan', 'Tanger', 'Casa', 'Rabat'];
  selectedFile!: File;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private formationService: FormationService
  ) {}
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  submit: boolean = false;
  formsubmit!: boolean;
  typesubmit!: boolean;
  rangesubmit!: boolean;

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Formations' },
      { label: 'Add new Formation', active: true },
    ];

    /**
     * Bootstrap validation form data
     */
    this.formationForm = this.formBuilder.group(
      {
        title: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        category: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z0-9]+')],
        ],
        city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        nb_hours: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        objective: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z0-9]*')],
        ],
        description: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z0-9]*')],
        ],
        cost: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        status: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      } /* , {
      validator: MustMatch('password', 'confirmpwd'),} */
    );

    /* this.submit = false;
    this.formsubmit = false;
    this.typesubmit = false;
    this.rangesubmit = false; */
  }

  /* onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  } */

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
    if (this.formationForm.valid && this.selectedFile) {
      // Create a FormData object to send form data
      const formData = new FormData();
      formData.append('image', this.selectedFile, "fesfsf.jpg");
      formData.append('data', JSON.stringify(this.formationForm.value));
      // Call your service method to add the new formation
      this.formationService.addFormation(formData).subscribe(
        (result) => {
          // Handle success
          console.log('Formation added successfully:', result);
        },
        (error) => {
          // Handle error
          console.error('Error adding formation:', error);
        }
      );
    }
  }

  /**
   * returns tooltip validation form
   */
  get formData() {
    return this.tooltipvalidationform.controls;
  }

  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
  }

  /**
   * Returns the type validation form
   */
  get type() {
    return this.typeValidationForm.controls;
  }

  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
  }

  /**
   * Returns the range validation form
   */
  get range() {
    return this.rangeValidationForm.controls;
  }

  /**
   * range validation submit data
   */
  rangeSubmit() {
    this.rangesubmit = true;
  }
  // dropzone upload function

  public onUploadSuccess(event: any): void {
    const uploadInfo = event[0].upload;
    const filename = uploadInfo.filename;
    const fileBase64 = event[0].dataURL;

    const blob = this.dataURItoBlob(fileBase64);
    const file = new File([blob], filename, { type: blob.type });
    this.selectedFile = file;

    console.log('onUploadSuccess:', event);
  }
  // Helper function to convert base64 to Blob
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: 'image/jpeg' });
  }
}
