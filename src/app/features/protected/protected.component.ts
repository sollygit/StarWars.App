import { Component, inject, OnInit } from '@angular/core';
import { MovieService, MovieModel } from '@app/core';
import { environment as env } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  movieService = inject(MovieService);
  snackBar = inject(MatSnackBar);
  loading: boolean = true;
  items: MovieModel[] = [];
  starwarsApiUrl: string = env.api.starwarsApiUrl;

  ngOnInit(): void {
    this.movieService.getProtectedResource().subscribe((response) => {
      const { data, error } = response;
      if (data) {
        this.items = data as MovieModel[];
        this.items.map(m => m.id = m.id.toUpperCase());
        this.loading = false;
      }
      if (error) {
        this.snackBar.open(JSON.stringify(error, null), 'Error');
        this.loading = false;
      }
    });
  }

  delete(id: string) {
    this.movieService.delete(id).subscribe(() => {
      this.items = this.items.filter(m => m.id !== id);
    });
  }

  generate() {
    const newMovie: MovieModel = {
      id: `TEST_${Math.random().toString(10).substring(3, 7)}`,
      title: 'Star Wars Episode III - The Last Tester (2025)',
      year: '2025',
      poster: 'https://picsum.photos/id/666/640/480',
      price: 999.99,
      movieRatings: []
    };
    this.movieService.create(newMovie).subscribe((response) => {
      const { data, error } = response;
      if (data) {
        this.items = [...this.items, data as MovieModel];
      }
      if (error) {
        this.snackBar.open(JSON.stringify(error, null), 'Error', { duration: 3000 } );
      }
    });
  }

}
