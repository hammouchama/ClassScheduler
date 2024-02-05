import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent {
  @Input() rating!: number;
  @Input() ratingLabels!: string[];
  @Output() ratingChange = new EventEmitter<number>();

  highlight!: number;

  setRating(value: number) {
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

  highlightStar(value: number) {
    this.highlight = value;
  }

  resetStar() {
    this.highlight = 0;
  }
}
