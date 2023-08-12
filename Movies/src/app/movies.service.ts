import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private HttpClient:HttpClient) { }
  getAPI(mediaData:string):Observable<any>{
    return this.HttpClient.get(`https://api.themoviedb.org/3/movie/${mediaData}?api_key=1ed3ab061e33aa2a2e017a5948b04e65`)
  }
  getMovies(id:string):Observable<any>{
    return this.HttpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=1ed3ab061e33aa2a2e017a5948b04e65`)
  }
  getsimilar(id:string):Observable<any>{
    return this.HttpClient.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=1ed3ab061e33aa2a2e017a5948b04e65`)
  }

}
