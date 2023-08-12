import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService: AuthService,
    private Router: Router, private MoviesService: MoviesService) { 
      this.MoviesService.getAPI('popular').subscribe((res) => {
        console.log(res);
        this.popular = res.results.splice(0, 1);
      });
    }
    popular: any[] = [];
    imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  regForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(16)])
  })
  submitRegister(formInfo: FormGroup) {
    this._AuthService.register(formInfo.value).subscribe((res) => {
      console.log(res.message);
      if (res.message == 'sucess') { this.Router.navigate(['/login']) }
    });
  }


}
