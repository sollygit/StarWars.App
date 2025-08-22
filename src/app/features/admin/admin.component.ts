import { Component, OnInit, inject } from '@angular/core';
import { MessageService, MovieModel } from '@app/core';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  messageService = inject(MessageService);
  loading: boolean = true;
  items: MovieModel[] = [];
  displayedColumns: string[] = ['id', 'title', 'poster', 'price'];
  starwarsApiUrl: string = env.api.starwarsApiUrl;
  message: string = '';

  ngOnInit(): void {
    this.messageService.getAdminResource().subscribe((response) => {
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
