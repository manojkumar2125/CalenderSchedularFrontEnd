import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
@Component({
  selector: 'app-time-slot',
  imports: [CommonModule,FormsModule],
  templateUrl: './time-slot.component.html',
  styleUrl: './time-slot.component.css'
})
export class TimeSlotComponent implements OnChanges {
  @Input() selectedDate: Date | null = null;
  allTimeSlots: { [username: string]: string[] } = {};
  selectedTimeSlot: string | null = null;

  selectedTimeSlots: Map<string, string> = new Map(); // Map to track selected time slots for each user

  constructor(private appService: AppService , private router:Router) { }

  ngOnChanges(): void {
    if (this.selectedDate) {
      this.fetchTimeSlots();
    }
  }
  fetchTimeSlots(): void {
    if(!this.selectedDate){
      return;
    }
   this.appService.fetchTimeSlots(this.selectedDate).subscribe({
      next: (response) => {
        // Process the response to extract time slots for all users
        this.allTimeSlots = {};
        for (const username in response) {
          if (response.hasOwnProperty(username)) {
            this.allTimeSlots[username] = response[username].map((slot: { time: any; }) => slot.time); // Extract 'time' field
          }
        }
      },
      error: (error) => {
        this.allTimeSlots = {}; // Clear time slots on error
      }
    });
  }
 
  isPastTimeSlot(slot: string): boolean {
    if (!this.selectedDate) {
      return false;
    }

    const [startHour, startMinute] = slot.split(' - ')[0].split(':').map(Number);
    const slotDate = new Date(this.selectedDate);
    slotDate.setHours(startHour, startMinute, 0, 0);

    const now = new Date();
    return slotDate < now;
  }
  selectTimeSlot(user: string, slot: string): void {
    if(!slot){
      console.error('Selected time slot is null or undefined.');
      return;
    }
    this.selectedTimeSlots.set(user, slot);
    console.log(`Selected time slot for ${user}: ${slot}`);

    // Navigate to the new page with the selected data
      this.router.navigate(['/user-details'], {
        queryParams: {
          username: user,
          timeSlot: slot,
          selectedDate: this.selectedDate? this.selectedDate.toISOString() : null
        }
      });
    }
  }
