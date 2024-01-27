import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss'
})
export class AddCompanyComponent implements OnInit {

  formationForm!: UntypedFormGroup; // bootstrap validation form
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  submit: boolean = false;
  constructor(
    public formBuilder: UntypedFormBuilder,
    private companyService: CompanyService,
    private router: Router
  ) { }
  ngOnInit(): void {


    this.breadCrumbItems = [
      { label: 'Company' },
      { label: 'Add new Company', active: true },
    ];

    /**
     * Bootstrap validation form data
     */
    this.formationForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        address: [
          '',
          [Validators.required],
        ],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],

        url: ['', [Validators.required, Validators.pattern('^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$')]],

        email: [
          '',
          [Validators.required],
        ],
      }

    );

    this.submit = false;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
    console.log(this.formationForm.value);
    console.log(this.formationForm.valid);
    if (this.formationForm.valid) {

      // Call your service method to add the new formation
      this.companyService.addCompany(this.formationForm.value).subscribe(
        (result) => {
          // Handle success
          Swal.fire({
            title: 'Formation added successfully',
            icon: 'success',
            confirmButtonColor: '#5438dc',
          });
          this.router.navigate(['dashboard/company/list']);
        },
        (error) => {
          // Handle error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
    }
  }
  /**
    * Returns form
    */
  get form() {
    return this.formationForm.controls;
  }


}
