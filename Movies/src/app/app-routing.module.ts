import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',canActivate:[AuthGuard],component:HomeComponent},
  {path:'home',canActivate:[AuthGuard],component:HomeComponent},
  {path:'gallary',canActivate:[AuthGuard],component:GalleryComponent},
  {path:'moviesdetails/:id',canActivate:[AuthGuard],component:MoviesDetailsComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'movies',canActivate:[AuthGuard],component:MoviesComponent},
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
