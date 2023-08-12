import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  popular: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  constructor(private MoviesService: MoviesService) {
    this.MoviesService.getAPI('popular').subscribe((res) => {
      console.log(res);
      this.popular = res.results.splice(0, 12);
    });
  }
}
