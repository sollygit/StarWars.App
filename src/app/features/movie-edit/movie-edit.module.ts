import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieEditComponent } from './movie-edit.component';
import { SharedModule } from '@app/shared';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
  
@NgModule({
  declarations: [MovieEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: MovieEditComponent,
      }
    ])
  ]
})
export class MovieEditModule { }
