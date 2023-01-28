import { NgModule } from '@angular/core';
import { ProductsListComponent } from './products-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
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
