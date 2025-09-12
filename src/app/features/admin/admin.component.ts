import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MovieModel, MovieService } from '@app/core';
import { environment as env } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  router = inject(Router);
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  movieService = inject(MovieService);
  displayedColumns: string[] = ['id', 'title', 'year', 'price', 'action'];
  dataSource!: MatTableDataSource<MovieModel>;
  items: MovieModel[] = [];
  loading: boolean = true;
  result: string = '';
  starwarsApiUrl: string = env.api.starwarsApiUrl;


  ngOnInit(): void {
    this.movieService.getAdminResource().subscribe((response) => {
      const { data, error } = response;
      if (data) {
        this.items = data as MovieModel[];
        this.items.map(m => m.id = m.id.toUpperCase());
        this.dataSource = new MatTableDataSource(this.items);
        setTimeout(() => this.setSortAndPaginator());
        this.loading = false;
      }
      if (error) {
        this.result = error.message;
        this.loading = false;
      }
    });
  }

  setSortAndPaginator() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  delete(id: string) {
    this.movieService.delete(id).subscribe(() => {
      this.items = this.items.filter(m => m.id !== id);
      this.dataSource = new MatTableDataSource(this.items);
      this.setSortAndPaginator();
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
        this.dataSource = new MatTableDataSource(this.items);
        this.setSortAndPaginator();
        this.loading = false;
      }
      if (error) {
        this.result = error.message;
        this.loading = false;
      }
    });
  }

  onRowClick(row: MovieModel) {
    this.router.navigate(['/movies', row.id]);
  }

}
