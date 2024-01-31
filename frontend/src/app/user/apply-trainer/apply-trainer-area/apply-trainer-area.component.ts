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
  ) {}

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
        email: ['', [Validators.required], [Validators.email]],
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
    console.log(this.form['value']);
    console.log(this.form['valid']);
    if (this.form['valid'] && this.selectedImage) {
      console.log('this.form["value"]', this.form["value"]);
      const _Data = JSON.stringify({
        ...this.form["value"],
      });

      console.log('_Data', _Data);
      // Create a FormData object to send form data
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      //append the rest of the data and selectedForIndividualSwitch and selectedStatuslSwitch
      formData.append('data', new Blob([_Data], { type: 'application/json' }));

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

          console.log('Trainer added successfully:', result);
        },
        (error) => {
          // Handle error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
          console.error('Error adding trainer:', error);
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
}
