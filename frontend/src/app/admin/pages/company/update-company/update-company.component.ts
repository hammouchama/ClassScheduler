import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-company',
  standalone: true,
  imports: [],
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.scss'
})
export class UpdateCompanyComponent implements OnInit {

  companyForm!: UntypedFormGroup; // bootstrap validation form
  company!: Company;
  companyId: any;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  submit: boolean = false;

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Company' },
      { label: 'Update new Company', active: true },
    ];

    this.getId();
    if (this.companyId && this.companyId >= 0) {
      this.getCompany(this.companyId);
    } else {
      this.router.navigate(['dashboard/Companys/list']);
    }

    /**
     * Bootstrap validation form data
     */
    this.companyForm = this.formBuilder.group(
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
      } /* , {
      validator: MustMatch('password', 'confirmpwd'),} */
    );

    this.submit = false;
  }
  //get formation details
  public async getCompany(id: number) {
    console.log('id', id);
    this.companyService.getCompany(id).subscribe(
      (resp: Company) => {
        console.log('resp', resp);
        this.company = resp;
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
      this.companyId = parseInt(params.get('id') || '');
    });
  }

  /**
   * Returns form
   */
  get form() {
    return this.companyForm.controls;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
    console.log(this.companyForm.value);
    console.log(this.companyForm.valid);
    if (this.companyForm.valid) {

      console.log('_Data', this.companyForm);

      // Call your service method to update the new Company
      this.companyService.updateCompany(this.companyId, this.companyForm.value).subscribe(
        (result) => {
          // Handle success
          Swal.fire({
            title: 'Company Updated successfully',
            icon: 'success',
            confirmButtonColor: '#5438dc',
          });
          this.router.navigate(['/dashboard/companys/list']);

          console.log('Company Updated successfully:', result);
        },
        (error) => {
          // Handle error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
          console.error('Error while Updating Company:', error);
        }
      );
    }
  }


}
