import { Component, OnInit } from '@angular/core';
import { MovieService } from '@app/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  items: any = [];
  displayedColumns: string[] = ['id', 'title', 'poster', 'year', 'price'];

  constructor(public movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getPublicResource()
      .subscribe((response: any[]) => {
        this.items = response;
      });
  }
}
