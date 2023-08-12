import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private Router: Router, private MoviesService: MoviesService) {
    this.MoviesService.getAPI('popular').subscribe((res) => {
      console.log(res);
      this.popular = res.results.splice(0, 1);
    });
  }
  error: string = '';
  popular: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(16)])
  })
  submitLogin(formInfo: FormGroup) {
    this._AuthService.login(formInfo.value).subscribe((res) => {
      if (res.message == 'sucess') {
        console.log(res.message);

        this.Router.navigate(['/home'])
        localStorage.setItem('userToken', JSON.stringify(res.token));
        this._AuthService.setUserData();

      };
    });
  }


}
