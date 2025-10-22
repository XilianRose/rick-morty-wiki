import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location, LocationResponse } from '../models/locations.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private apiUrl = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {}

  getLocations(page: number = 1): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${this.apiUrl}?page=${page}`);
  }

  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`);
  }

  filterLocations(filters: {
    name?: string;
    type?: string;
    dimension?: string;
  }): Observable<LocationResponse> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return this.http.get<LocationResponse>(`${this.apiUrl}?${params.toString()}`);
  }
}