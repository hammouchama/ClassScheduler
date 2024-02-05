import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Formation, categoryColors, cities } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/service/-formation.service';
import { FormationListService } from './formation-list.service';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-formation-list-area',
  templateUrl: './formation-list-area.component.html',
  styleUrls: ['./formation-list-area.component.scss'],
  providers: [FormationListService, DecimalPipe],
})
export class FormationListAreaComponent implements OnInit {
  activeTab: string = 'grid'; // Initial active tab

  categories: string[] = [...Object.keys(categoryColors), 'Others'];

  cities: string[] = [...cities, 'Others'];

  collapsedCategories: boolean = false;
  collapsedCities: boolean = false;

  // List of item to collapse

  loading: boolean = true;

  categoryColors: { [key: string]: string } = categoryColors;

  tables$: Observable<Formation[]>;
  total$: Observable<number>;
  constructor(
    private formationService: FormationService,
    public service: FormationListService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        this.service.selectedCategories = [params['category']];
      }
    });
    this.route.paramMap.subscribe((params) => {
      // Extract the category from the URL
      if (params.get('cat'))
        this.service.selectedCategories = [params.get('cat') as string];

      // Use the extracted category as needed
      if (this.service.selectedCategories.length > 0) {
        console.log(`Selected Category: ${this.service.selectedCategories}`);
        this.clearCategory(params.get('cat') as string);
      }
    });

    this.service.loading = false;
    this._fetchData();
    this.service.loading = true;

    // Condition if the device is mobile
    if (window.innerWidth < 992) {
      this.collapsedCategories = true;
      this.collapsedCities = true;
    }
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    this.formationService.getAllPublicFormation().subscribe(
      (resp: Formation[]) => {
        resp.map(e => { e.photo = 'data:image/jpeg;base64,' + e.photo })
        this.service.updateTableData(resp);

      },
      (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);
      }
    );
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }
  toggleCategory(category: string, event: any) {
    console.log('category', category);
    console.log('event', event.target.checked);
    if (event.target.checked) {
      this.service.selectedCategories = [
        ...this.service.selectedCategories,
        category,
      ];
    } else {
      this.service.selectedCategories = this.service.selectedCategories.filter(
        (item) => item != category
      );
    }
  }
  toggleCity(city: string, event: any) {
    console.log('city', city);
    console.log('event', event.target.checked);
    if (event.target.checked) {
      this.service.selectedCities = [
        ...this.service.selectedCities,
        city,
      ];
    } else {
      this.service.selectedCities = this.service.selectedCities.filter(
        (item) => item != city
      );
    }
  }

  clearCategory(cat: string) {
    // Create a NavigationExtras object with replaceUrl set to true
    this.service.selectedCategories;
    const navigationExtras: NavigationExtras = {
      replaceUrl: false,
      queryParams: { category: cat },
    };

    this.router.navigate(['/formations'], navigationExtras);
  }
}
