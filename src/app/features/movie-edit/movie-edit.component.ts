import { Component, inject, OnInit } from '@angular/core';
import { MovieService, MovieModel } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit {
  movieService = inject(MovieService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  loading: boolean = true;
  item: MovieModel = null!;
  message: string = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadMovie(id!);
  }

  loadMovie(id: string): void {
    this.movieService.getById(id).subscribe((response) => {
      const { data, error } = response;
      if (data) {
        this.item = data as MovieModel;
        this.loading = false;
      }
      if (error) {
        this.message = `MovieID '${id}' not found!`;
        this.loading = false;
      }
    });
  }

  onUpdate(): void {
    if (!this.item) return;
    const updatedMovie: MovieModel = {
      ...this.item,
      // id, title, price, year, poster are already bound via ngModel
    };
    this.loading = true;
    this.movieService.update(updatedMovie).subscribe((response) => {
      this.loading = false;
      if (!response.error) {
        this.router.navigate(['/movies']);
      } else {
        this.message = 'Update failed!';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/movies']);
  }
}
