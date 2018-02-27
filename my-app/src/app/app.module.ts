import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { OrderStatusComponent } from './order/order-status/order-status.component';
import { DeliveryStatusComponent } from './delivery-status/delivery-status.component';
import { LogInComponent } from './user-module/log-in/log-in.component';
import { SignUpComponent } from './user-module/sign-up/sign-up.component';

import { user } from '../models/user.model';
import { UserService } from './user.service';
import {DropdownDirective} from "./nav/dropdown.directive";
import {JwtInterceptor} from "./jwtInterceptor.service";
import { OrderEntryComponent } from './order/order-status/order-entry/order-entry.component';
import { OrderStatusDirective } from './order/order-status/order-entry/order-status.directive';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'order', component: OrderComponent},
  { path: 'delivery', component: DeliveryComponent},
  { path: 'user', redirectTo: '/user/profile', pathMatch: 'full'},
  { path: 'user/login', component: LogInComponent},
  { path: 'user/signup', component: SignUpComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    OrderComponent,
    DeliveryComponent,
    OrderStatusComponent,
    DeliveryStatusComponent,
    LogInComponent,
    SignUpComponent,
    DropdownDirective,
    OrderEntryComponent,
    OrderStatusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
              user,
              UserService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: JwtInterceptor,
                multi: true
              }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
