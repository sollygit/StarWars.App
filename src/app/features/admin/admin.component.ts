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
        setTimeout(() => this.setDataSource(this.items));
        this.loading = false;
      }
      if (error) {
        this.result = error.message;
        this.loading = false;
      }
    });
  }

  delete(id: string) {
    this.movieService.delete(id).subscribe(() => {
      this.items = this.items.filter(m => m.id !== id);
      setTimeout(() => this.setDataSource(this.items, this.dataSource.filter));
    });
  }

  generate() {
    this.movieService.generate().subscribe((response) => {
      const { data, error } = response;
      if (data) {
        // Insert item at the start of the array
        this.items.unshift(data as MovieModel);
        setTimeout(() => this.setDataSource(this.items, this.dataSource.filter));
        this.loading = false;
      }
      if (error) {
        this.result = error.message;
        this.loading = false;
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  setDataSource(items: MovieModel[], filterValue: string = '') {
    this.dataSource = new MatTableDataSource(items);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (filterValue) {
      this.applyFilter(filterValue);
    }
  }

}
