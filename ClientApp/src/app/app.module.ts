import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeService } from './employees/services/employee-service';
import { EmployeeEditGuard } from './employees/employee-edit/employee-edit.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      {
        path: 'employees',
        component: EmployeeListComponent
      },
      {
        path: 'employees/:id/:cityname',
        component: EmployeeDetailComponent
      },
      {
        path: 'employees/:id/:cityname/edit',
        canDeactivate: [EmployeeEditGuard],
        component: EmployeeEditComponent
      },
    ])
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
