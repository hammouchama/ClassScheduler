import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Remarks } from 'src/app/model/remarks.model';
import { Scheduling } from 'src/app/model/scheduling.model';
import { Trainer } from 'src/app/model/trainer.model';
import { FormationService } from 'src/app/service/-formation.service';
import { RemarksService } from 'src/app/service/-remarks.service';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { TrainerService } from 'src/app/service/trainer.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainer-details-area',
  templateUrl: './trainer-details-area.component.html',
  styleUrls: ['./trainer-details-area.component.scss'],
})
export class TrainerDetailsAreaComponent implements OnInit {
toArray(arg0: any): any {
  // return an array o arg0 times
  return new Array(arg0);
}
  loading: boolean = true;
  schedulingList!: any;
  // schedulingList!: any;
  trainer!: Trainer;
  remarksList!: Remarks[];

  trainerId!: string;

  choosedOption: string = 'Description';

  constructor(
    private autheService: UserAuthService,
    private router: Router,
    private remarksService: RemarksService,
    private formationService: FormationService,
    private schedulingService: SchedulingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    //check if the user is logged in to get the id
    if (this.autheService.isLoggedIn()) {
      //get the user id
      this.trainerId = this.autheService.getUserId();
      console.log(this.trainerId);
      this._fetchData();
    } else {
      console.log('User not logged in');
      this.router.navigate(['/401']);
    }
    this.loading = false;
  }

  _fetchData() {
    this.route.paramMap.subscribe(() => {
      this.getScheduling();
      this.getRemarks();
    });
  }
  getScheduling() {
    this.schedulingService.getSchedulingByTrainer().subscribe((data) => {

      this.schedulingList = data;
      this.schedulingList[0].trainer.photo = this.schedulingList[0].trainer.photo.bytes || null;
      this.trainer = this.schedulingList[0].trainer;

    });
  }
  getRemarks() {
    this.remarksService
      .getAllRemarksByTrainer(this.trainerId)
      .subscribe((data) => {
        data.map((remark) => {
          remark.formation.photo = remark.formation.photo.bytes || null;
        });
        console.log(data);
        this.remarksList = data;
      });
  }

  chooseOption(opt: string) {
    this.choosedOption = opt;
  }

  //convert the datetime as a string to only date in string in the format dd February yyyy
  convertDate(date: string) {
    let d = new Date(date);
    let month = d.toLocaleString('default', { month: 'long' });
    return `${d.getDate()} ${month} ${d.getFullYear()}`;
  }
  //convert the datetime as a string to only time in string without seconds in the format hh:mm
  convertTime(time: string) {
    let d = new Date(time);
    return `${d.getHours()}:${d.getMinutes()}`;
  }
  // sendIndividualsForFeedback using the formation service
  sendIndividualsForFeedback(session: any) {
    this.formationService
      .endFormationAndGenerateTokens(this.schedulingList[0].formation.id, this.trainerId)
      .subscribe((data) => {
        //handle the response about sending the feedback to individuals
        if(data){
          console.log(data);
          // add attribute to the session to know if the feedback is sent to individuals
          session.feedback_sent = true;
          Swal.fire({
            title: 'Formation ended',
            text: 'Feedback sent to individuals',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        }else{
          session.feedback_sent = false;
          Swal.fire({
            title: 'Error',
            text: 'Error sending feedback to individuals',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }

      });
  }
  // function boolean if the formation is ended and the feedback is sent to individuals (use session as parameter, and check from the end_registration date if it's passed)
  isFormationEnded(session: any) {
    let date = new Date(session.end_date_time);
    let now = new Date();
    return now > date;
  }

}
