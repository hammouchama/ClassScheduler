import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss'],
})
export class ErrorHandlerComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  errorCode: any;
  ngOnInit() {
    this.errorCode = this.route.snapshot.data['error'];
  }
}
