import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import appConfig from './config/app-config';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard,
} from '@okta/okta-angular';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const oktaConfig = Object.assign(
  {
    onAuthRequired: (oktaAuth, injector) => {
      const router = injector.get(Router);

      router.navigate(['/login']);
    },
  },
  appConfig.oidc
);

// create routes
const routes: Routes = [
  {
    path: 'members',
    loadChildren: () =>
      import('./components/members-page/members-page.component').then(
        (m) => m.MembersPageComponent
      ),
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'order-history',
    loadChildren: () =>
      import('./components/order-history/order-history.component').then(
        (m) => m.OrderHistoryComponent
      ),
    canActivate: [OktaAuthGuard],
  },
  { path: 'login/callback', component: OktaCallbackComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./components/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
  },
  {
    path: 'cart-details',
    loadChildren: () =>
      import('./components/cart-details/cart-details.component').then(
        (m) => m.CartDetailsComponent
      ),
  },
  {
    path: 'products/:id',
    loadChildren: () =>
      import('./components/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },
  {
    path: 'search/:keyword',
    loadChildren: () =>
      import('./components/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'category/:id',
    loadChildren: () =>
      import('./components/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./components/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./components/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },

  // {
  //   path: 'members',
  //   component: MembersPageComponent,
  //   canActivate: [OktaAuthGuard],
  // },

  // {
  //   path: 'order-history',
  //   component: OrderHistoryComponent,
  //   canActivate: [OktaAuthGuard],
  // },

  // { path: 'login/callback', component: OktaCallbackComponent },
  // { path: 'login', component: LoginComponent },

  // { path: 'checkout', component: CheckoutComponent },
  // { path: 'cart-details', component: CartDetailsComponent },
  // { path: 'products/:id', component: ProductDetailsComponent },
  // { path: 'search/:keyword', component: ProductListComponent },
  // { path: 'category/:id', component: ProductListComponent },
  // { path: 'category', component: ProductListComponent },
  // { path: 'products', component: ProductListComponent },
  // { path: '', redirectTo: '/products', pathMatch: 'full' },
  // { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
  ],
  providers: [
    ProductService,
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
