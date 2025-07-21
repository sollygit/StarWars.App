import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { ProtectedComponent } from './protected.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ProtectedComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatProgressBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProtectedComponent,
      },
    ]),
  ]
})
export class ProtectedModule {}
