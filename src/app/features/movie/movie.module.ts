import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { MovieComponent } from './movie.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MovieComponent],
  imports: [
      CommonModule,
      SharedModule,
      MatCardModule,
      MatProgressBarModule,
      MatButtonModule,
      RouterModule.forChild([
        {
          path: '',
          component: MovieComponent,
        },
      ]),
    ]
})
export class MovieModule { }
