import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { ProtectedComponent } from './protected.component';

@NgModule({
  declarations: [ProtectedComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProtectedComponent,
      },
    ]),
  ]
})
export class ProtectedModule { }
