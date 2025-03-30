// calendar.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimeSlotComponent } from "../time-slot/time-slot.component";
import{ FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css',
  imports: [CommonModule, TimeSlotComponent, FormsModule]
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  days: (Date | null)[] = [];
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  selectedDate : Date | null = null;
  
  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.days = [];
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    let date = 1;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          this.days.push(null);
        } else if (date > daysInMonth) {
          this.days.push(null);
        } else {
          this.days.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), date));
          date++;
        }
      }
      if(date > daysInMonth) break;
    }
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  previousYear():void{
    this.currentDate = new Date(this.currentDate.getFullYear() -1 ,1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }
  nextYear(): void{
    this.currentDate = new Date(this.currentDate.getFullYear() + 1 ,1);
    this.generateCalendar();
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  isSelectedMonth(date: Date | null): boolean {
    if (!date) return false;
    return date.getMonth() === this.currentDate.getMonth();
  }
  isPast(day: Date | null): boolean {
    if (!day) return false;
    const today = new Date();
    return day < today && !this.isToday(day);
  }
  isSelectedDate(date: Date |null): boolean {
    return !!date && this.selectedDate !== null && date.getDate() === this.selectedDate.getDate();
  }
  selectDate(date: Date|null): void {
    if(date){
      this.selectedDate = date;
    }
  }
}