import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'json',
    loadChildren: () =>
      import('./features/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./features/protected/protected.module').then(
        (m) => m.ProtectedModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'movies/:id',
    loadChildren: () =>
      import('./features/movie/movie.module').then(
        (m) => m.MovieModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'movies/edit/:id',
    loadChildren: () =>
      import('./features/movie-edit/movie-edit.module').then(
        (m) => m.MovieEditModule
      )
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    loadChildren: () =>
      import('./features/callback/callback.module').then((m) => m.CallbackModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }