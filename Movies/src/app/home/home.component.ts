import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  nowPlaying: any[] = [];
  popular: any[] = [];
  top_rated:any[]=[];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  constructor(private MoviesService: MoviesService) { }
  ngOnInit(): void {
    this.MoviesService.getAPI('now_playing').subscribe((res) => {
      console.log(res);
      this.nowPlaying = res.results.splice(0, 10);
    });
    this.MoviesService.getAPI('popular').subscribe((res) => {
      console.log(res);
      this.popular = res.results.splice(0, 10);
    });
    this.MoviesService.getAPI('top_rated').subscribe((res) => {
      console.log(res);
      this.top_rated = res.results.splice(0, 10);
    })
  }

}
