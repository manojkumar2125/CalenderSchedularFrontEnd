import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TimeSlotComponent } from './time-slot/time-slot.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppComponent,
    TimeSlotComponent,
    UserDetailsComponent
  ],
  providers: [],
  // Removed bootstrap array as AppComponent is a standalone component
})
export class AppModule {}