import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { PublicComponent } from './public.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: PublicComponent,
      },
    ]),
  ]
})
export class PublicModule { }
