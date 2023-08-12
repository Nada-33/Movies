import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent {
  id: string = '';
  movieDetials: any = [];
  similar: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private MoviesService: MoviesService, private ActivatedRoute: ActivatedRoute) {
    this.id = ActivatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.MoviesService.getMovies(this.id).subscribe((res) => {
      this.movieDetials = res;
    });
  
  }


}

