import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [DatePipe],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  username!: string;
  timeSlot!: string;
  selectedDate!: Date;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve query parameters
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.timeSlot = params['timeSlot'];
      this.selectedDate = new Date(params['selectedDate']);
    });
  }
}