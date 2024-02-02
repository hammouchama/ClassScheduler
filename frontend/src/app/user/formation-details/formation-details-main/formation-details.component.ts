import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss'],
})
export class FormationDetailsComponent implements OnInit {
  formationSlug: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  //get id from the url
  public getSlug() {
    this.route.paramMap.subscribe((params) => {
      this.formationSlug = parseInt(params.get('slug') || '');
    });
  }
}
