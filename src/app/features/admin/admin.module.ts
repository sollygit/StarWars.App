import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { AdminComponent } from './admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
      },
    ]),
  ]
})
export class AdminModule {}
