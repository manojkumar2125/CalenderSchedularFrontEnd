import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private endpoint = 'http://localhost:8080/bookings'; // Replace with your API endpoint
  private username = 'useruseruser'; // Replace with your actual username
  private password = 'useruseruser'; // Replace with your actual password

  constructor(private http: HttpClient) {}

  // Method to fetch time slots for a specific date
  fetchTimeSlots(date: Date): Observable<{ [key: string]: any[] }> {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const apiUrl = `${this.endpoint}/date/${formattedDate}`;

    // Construct the Basic Authorization header
    const authHeader = 'Basic ' + btoa(`${this.username}:${this.password}`);
    const headers = new HttpHeaders({
      Authorization: authHeader
    });

    // Make the HTTP GET request
    return this.http.get<{ [key: string]: any[] }>(apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error fetching time slots:', error);
    if (error.status === 0) {
      console.error('Network error: Unable to reach the server. Please ensure the backend is running.');
    } else if (error.status === 401) {
      console.error('Authentication error: Invalid credentials provided.');
    } else {
      console.error(`HTTP Error: ${error.status} ${error.statusText}`);
    }
    throw error; // Ensure the error is rethrown
  }

  
}