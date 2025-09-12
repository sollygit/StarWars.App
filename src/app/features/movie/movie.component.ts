import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MovieService, MovieModel } from '@app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  location = inject(Location);
  movieService = inject(MovieService);
  route = inject(ActivatedRoute);
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

  goBack(): void {
    this.location.back();
  }

}
