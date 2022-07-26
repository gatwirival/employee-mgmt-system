import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
 
const routes: Routes = [
 { path: '', redirectTo: 'employees', pathMatch: 'full' },
 { path: 'employees', component: EmployeesListComponent },
];
 
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }