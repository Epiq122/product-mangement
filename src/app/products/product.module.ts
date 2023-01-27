import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ProductsListComponent } from './products-list.component';
import { ProductDetailGuard } from './product-detail.guard';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductDetailComponent, ProductsListComponent],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductsListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
      },
    ]),
    SharedModule,
  ],
})
export class ProductModule {}
