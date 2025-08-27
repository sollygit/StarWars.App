import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { PublicComponent } from './public.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: PublicComponent,
      },
    ]),
  ]
})
export class PublicModule { }
