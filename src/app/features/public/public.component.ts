import { Component, OnInit } from '@angular/core';
import { MessageService } from '@app/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
})
export class PublicComponent implements OnInit {
  products: any = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'quantity'];
  message: string = '';

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.messageService.getPublicResource()
      .subscribe((response: any[]) => {
        this.products = response;
      });
  }
}
