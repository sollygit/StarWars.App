import { Component, inject, OnInit } from '@angular/core';
import { MovieService, MovieModel } from '@app/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movieService = inject(MovieService);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);
  loading: boolean = true;
  item: MovieModel = {} as MovieModel;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadMovie(id!);
  }

  loadMovie(id: string): void {
    if (!id) {
      this.snackBar.open('No movie ID found in route.', 'Close', { duration: 3000 });
      this.loading = false;
      return;
    }
    this.movieService.getById(id).subscribe((response) => {
      const { data, error } = response;
      if (data) {
        this.item = data as MovieModel;
        this.loading = false;
      }

      if (error) {
        this.snackBar.open(JSON.stringify(error, null), 'Error');
        this.loading = false;
      }
    });
  }

}
