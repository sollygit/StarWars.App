import { Component, OnInit } from '@angular/core';
import { MessageService, MovieModel } from '@app/core';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
})
export class ProtectedComponent implements OnInit {
    items: MovieModel[] = [];
    displayedColumns: string[] = ['id', 'title', 'poster', 'price'];
    starwarsApiUrl: string = env.api.starwarsApiUrl;
    message: string = '';

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getProtectedResource().subscribe((response) => {
      const { data, error } = response;
      if (data) {
        this.items = data as MovieModel[];
        this.items.map(m => m.id = m.id.toUpperCase());
      }

      if (error) {
        this.message = JSON.stringify(error, null, 2);
      }
    });
  }

}
