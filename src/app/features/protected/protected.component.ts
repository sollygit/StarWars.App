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
  displayedColumns: string[] = ['id', 'title', 'poster', 'price'];
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
    const result = confirm(`Are you sure you want to delete movie '${id}'?`);
    if (result) {
      this.movieService.delete(id).subscribe(() => {
        this.items = this.items.filter(m => m.id !== id);
      });
    }
  }

  create() {
    const newMovie: MovieModel = {
      id: 'JUST_TESTING',
      title: 'Star Wars: Just Testing',
      year: '1977',
      poster: 'https://picsum.photos/id/56/640/480',
      price: 0.00,
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
