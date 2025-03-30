import { RouterModule, Routes } from '@angular/router';
import { TimeSlotComponent } from './time-slot/time-slot.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', redirectTo: 'time-slot', pathMatch: 'full' },
    { path: 'time-slot', component: TimeSlotComponent },
    { path: 'user-details', component: UserDetailsComponent }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }