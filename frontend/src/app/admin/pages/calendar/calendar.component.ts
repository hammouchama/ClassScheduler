import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

// Calendar option
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

// BootStrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

import { category, calendarEvents, createEventId } from './data';
import { DatePipe } from '@angular/common';
import { Formation } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/service/-formation.service';
import { Trainer } from 'src/app/model/trainer.model';
import { TrainerService } from 'src/app/service/trainer.service';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company.service';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],

})

/**
 * Calendar Component
 */
export class CalendarComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  selectedOption: string = '';

  // event form
  formData!: UntypedFormGroup;
  formEditData!: UntypedFormGroup;

  formationList!: Formation[];
  trainerList: Trainer[] = [];
  companyList: Company[] = []
  // calendar
  calendarEvents!: any[];
  editEvent: any;
  newEventDate: any;
  category!: any[];
  submitted = false;

  time = { hour: 13, minute: 30 };
  @ViewChild('editmodalShow') editmodalShow!: TemplateRef<any>;
  @ViewChild('modalShow') modalShow!: TemplateRef<any>;
  option: string = "";

  constructor(private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private formationService: FormationService,
    private trainerService: TrainerService,
    private companyService: CompanyService,
    private schedulingService: SchedulingService,
    private router: Router
  ) { }

  changeOption(arg0: string) {
    this.selectedOption = arg0
  }
  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'ClassScheduler' },
      { label: 'Calendar', active: true },
    ];

    /**
     * Event Model validation
     */
    this.formData = this.formBuilder.group({
      title: ['', [Validators.required]],
      formation: ['', [Validators.required]],
      selectedOption: ['', [Validators.required]],
      trainer: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      company: ['',],
    });

    this._fetchData();
  }

  private _fetchData() {
    this.formationService.getAllByCityFormation().subscribe(
      (resp: Formation[]) => {
        this.formationList = resp
      }
    )
    //trainer
    this.trainerService.getAllAceptedTrainers().subscribe(
      (respo: Trainer[]) => {
        this.trainerList = respo
      }
    )
    //company
    this.companyService.getAllCompany().subscribe(
      (resp: Company[]) => {
        this.companyList = resp;
      }
    )
    this.schedulingService.getAllScheduing().subscribe(

      (res: any) => {
        this.calendarEvents = res
        this.calendarOptions.events = this.calendarEvents.map(event => ({
          title: event.title,
          start: new Date(event.start_date_time),
          end: new Date(event.end_date_time),
          extendedProps: { myCustomData: event }

        }))
        console.log(res)
      }
    )
    // Calender Event Data
    // this.calendarEvents = calendarEvents;

  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  /***
  * Calender Set
  */
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'dayGridMonth,dayGridWeek,dayGridDay',
      center: 'title',
      right: 'prevYear,prev,next,nextYear'
    },
    initialView: "dayGridMonth",
    themeSystem: "bootstrap",
    initialEvents: calendarEvents,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.openModal.bind(this),
    eventClick: this.openEditModal.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];

  /**
   * Open Event Modal
   */
  openModal(event?: any) {
    // this.submitted = false;
    this.newEventDate = event,
      // this.formBuilder.group({
      //   editDate: this.newEventDate.date
      // })
      this.modalService.open(this.modalShow, { centered: true });
  }

  /**
   * Open Event Modal For Edit
   * @param editcontent modal content
   * @param event calendar event
   */
  openEditModal(clickInfo: EventClickArg) {

    this.editEvent = clickInfo.event;
    this.option = "individual"
    if (this.editEvent.extendedProps.myCustomData.for_company == true) {
      this.option = "company"
    }
    this.formEditData = this.formBuilder.group({
      title: this.editEvent.title,
      formation: this.editEvent.extendedProps.myCustomData.formation.id,
      trainer: this.editEvent.extendedProps.myCustomData.trainer.id,
      start_time: this.editEvent.extendedProps.myCustomData.start_date_time.split("T")[1],
      end_time: this.editEvent.extendedProps.myCustomData.end_date_time.split("T")[1],
      company: this.editEvent.extendedProps.myCustomData.company != null ? this.editEvent.extendedProps.myCustomData.company : "",
      selectedOption: this.option,

    });
    this.modalService.open(this.editmodalShow, { centered: true });
  }

  /**
 * Events bind in calander
 * @param events events
 */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  /**
   * Show successfull Save Dialog
   */
  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 2000
    });
  }

  /***
 * Model Edit Position Set
 */
  Editposition() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been Updated',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  /**
   * Upldated event title save in calendar
   */
  editEventSave() {
    if (this.formEditData.valid) {
      console.log(this.formEditData.value)
      console.log(this.editEvent.start)
      const _data = {
        ...this.formEditData.value,
        start_dateTime: this.editEvent.start.setHours(this.formEditData.value["start_time"].split(":")[0], this.formEditData.value["start_time"].split(":")[1], 0),
        end_dateTime: this.editEvent.end.setHours(this.formEditData.value["end_time"].split(":")[0], this.formEditData.value["end_time"].split(":")[1], 0)
      }
      this.schedulingService.updateScheduling(this.editEvent.extendedProps.myCustomData.id, _data).subscribe(
        (resp) => {

          this.Editposition();
          this.formEditData = this.formBuilder.group({
            title: '',
            formation: '',
            selectedOption: '',
            trainer: '',
            start_time: '',
            end_time: '',
            company: '',
          });
          this.modalService.dismissAll();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
        }
      )
    }

  }

  /**
   * Delete the event from calendar
   */
  deleteEventData() {
    console.log(this.editEvent.extendedProps.myCustomData.id)
    this.schedulingService.deleteScheduling(this.editEvent.extendedProps.myCustomData.id).subscribe(
      (response) => {
        this.editEvent.remove();
        this.modalService.dismissAll();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        });
      }
    )

  }

  /**
   * Model Data save and show the event in calendar
   */
  saveEvent() {
    if (this.formData.valid) {
      console.log(this.formData.value)
      const _data = {
        ...this.formData.value,
        start_dateTime: this.newEventDate.start.setHours(this.formData.value["start_time"].split(":")[0], this.formData.value["start_time"].split(":")[1], 0),
        end_dateTime: this.newEventDate.end.setHours(this.formData.value["end_time"].split(":")[0], this.formData.value["end_time"].split(":")[1], 0)
      }


      this.schedulingService.addScheduing(_data).subscribe(
        (resp: any) => {

          this.position();
          this.formData = this.formBuilder.group({
            title: '',
            formation: '',
            selectedOption: '',
            trainer: '',
            start_time: '',
            end_time: '',
            company: '',
          });
          this.modalService.dismissAll();
          this.router.navigate(["/dashboard/calendar"])

        },
        (error: any) => {
          console.log("err", error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
        }
      )

    }
    this.submitted = true;
  }

  /**
   * Open Delete Confirmation Modal
   */
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.deleteEventData();
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      }
    });
  }



  closeEventModal() {
    this.formData = this.formBuilder.group({
      title: '',
      formation: '',
      selectedOption: '',
      trainer: '',
      start_time: '',
      end_time: '',
      company: '',
    });
    this.modalService.dismissAll();
  }
}
