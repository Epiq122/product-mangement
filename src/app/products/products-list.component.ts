import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './products.service';
import { Subscription } from 'rxjs';

@Component({
  // selector: 'pm-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  filteredProducts: Product[] = [];
  products: Product[] = [];
  errorMessage = '';
  sub!: Subscription;

  // coming from our products service we created ( SERVICE INJECTION )
  constructor(private productService: ProductService) {}

  //getter and setter for the input block
  private _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  // Methods

  // filters through the input
  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }
  toggleImage() {
    this.showImage = !this.showImage;
  }

  //LifeCycle Hooks
  ngOnInit() {
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string) {
    this.pageTitle = 'Product List: ' + message;
  }
}
