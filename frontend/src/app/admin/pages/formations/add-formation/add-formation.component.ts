import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MustMatch } from './add-formation.mustmatch';

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

  constructor(public formBuilder: UntypedFormBuilder) {}
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  submit: boolean = false;
  formsubmit!: boolean;
  typesubmit!: boolean;
  rangesubmit!: boolean;

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Formation' },
      { label: 'Add Formation', active: true },
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
        state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      } /* , {
      validator: MustMatch('password', 'confirmpwd'),} */
    );

    /* this.submit = false;
    this.formsubmit = false;
    this.typesubmit = false;
    this.rangesubmit = false; */
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
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

    if (this.formationForm.valid) {
      // Implement your logic to send the formation data to the server
      const formData = this.formationForm.value;
      formData.image = this.imageUrl; // You can send the image URL to the server

      // Call your service method to add the new formation
      // For example: this.formationService.addFormation(formData).subscribe(result => { /* handle success */ });
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
}
