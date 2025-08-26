import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '@app/core';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  movieService = inject(MovieService);
  loading: boolean = true;
  result: any = null
  displayedColumns: string[] = ['id', 'title', 'poster', 'price'];
  starwarsApiUrl: string = env.api.starwarsApiUrl;

  ngOnInit(): void {
    this.movieService.getAdminResource().subscribe((response) => {
      const { data, error } = response;
      if (data) {
        this.result = JSON.stringify(data, null, 2);
        this.loading = false;
      }
      if (error) {
        this.result = error.message;
        this.loading = false;
      }
    });
  }

}
