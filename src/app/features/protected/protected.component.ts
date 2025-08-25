import { Component, OnInit } from '@angular/core';
import { MovieService, MovieModel } from '@app/core';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  loading: boolean = true;
  items: MovieModel[] = [];
  displayedColumns: string[] = ['id', 'title', 'poster', 'price'];
  starwarsApiUrl: string = env.api.starwarsApiUrl;
  message: string = '';

  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getProtectedResource().subscribe((response) => {
      const { data, error } = response;
      if (data) {
        this.items = data as MovieModel[];
        this.items.map(m => m.id = m.id.toUpperCase());
        this.loading = false;
      }

      if (error) {
        this.message = JSON.stringify(error, null, 2);
        this.loading = false;
      }
    });
  }

}
