import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { listSkills } from 'src/app/model/trainer.model';
import { TrainerService } from 'src/app/service/trainer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-trainer-area',
  templateUrl: './apply-trainer-area.component.html',
  styleUrls: ['./apply-trainer-area.component.scss'],
})
export class ApplyTrainerAreaComponent implements OnInit {


  trainerForm1!: UntypedFormGroup; // bootstrap validation form
  trainerForm2!: UntypedFormGroup; // bootstrap validation form

  submit: boolean = false;
  imageUrl: string | null = null;
  selectedImage: File | null = null;
  listSkills = listSkills;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private trainerService: TrainerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /**
     * Bootstrap validation form data
     */
    /* firstName;
    lastName;
    phone;
    address;
    email;
    skills;
    description;
    photo; */
    this.trainerForm1 = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        email: ['', [Validators.required, Validators.email]],
      }
    );
    this.trainerForm2 = this.formBuilder.group(
      {
        skills: ['', [Validators.required]],
        description: ['', [Validators.required]],
      }
    );

    this.submit = false;
  }
  submitForm1(trainerForm1: UntypedFormGroup) {
    console.log("part1", trainerForm1.value)
  }
  submitForm2(trainerForm2: UntypedFormGroup) {
    console.log("part2", trainerForm2.value)

  }
  /**
   * Returns form
   */
  get form() {
    // return both controls of the trainerForm1 and trainerForm2
    return this.trainerForm1.controls;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {

    this.submit = true;
    console.log(this.trainerForm1);
    console.log(this.trainerForm2);
    if (this.trainerForm2.valid && this.selectedImage) {

      const skillsAsString = this.trainerForm2.get('skills')?.value.join(', ');
      const desc = this.trainerForm2.get("description")?.value
      console.log(skillsAsString)
      // Extract values from the form groups
      const trainerForm1Value = this.extractFormValues(this.trainerForm1);

      // Merge form values
      const _Data = {
        ...trainerForm1Value,
        skills: skillsAsString,
        description: desc
      };
      console.log('_Data', _Data);
      // Convert _Data to a JSON string
      const jsonData = JSON.stringify(_Data);
      // Create a FormData object to send form data
      let formData = new FormData();
      formData.append('image', this.selectedImage);
      //append the rest of the data and selectedForIndividualSwitch and selectedStatuslSwitch
      formData.append('data', new Blob([jsonData], { type: 'application/json' }));

      // Call your service method to add the new trainer
      this.trainerService.registerTrainer(formData).subscribe(
        (result) => {
          // Handle success
          Swal.fire({
            title: 'Registred successfully',
            text: 'Your request will be treated soon, you will receive an email when it is accepted, thank you for your patience',
            icon: 'success',
            confirmButtonColor: '#5438dc',
          });
          this.router.navigate(['/'])
          console.log('Trainer added successfully:', result);
        },
        (error: any) => {
          // Handle error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
          console.log('Error adding trainer:', error);
        }
      );
    }
  }

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


  // Function to extract form values
  private extractFormValues(formGroup: UntypedFormGroup): any {
    const formValues: { [key: string]: any } = {};

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);

      if (control instanceof UntypedFormGroup) {
        // Recursively extract values for nested form groups
        formValues[key] = this.extractFormValues(control);
      } else {
        // Extract the value from the form control
        formValues[key] = control?.value;
      }
    });

    return formValues;
  }
}
