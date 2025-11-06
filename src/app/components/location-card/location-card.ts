import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '../../models/locations.model'

@Component({
  selector: 'app-location-card',
  imports: [CommonModule],
  templateUrl: './location-card.html',
  styleUrl: './location-card.scss'
})
export class LocationCard {
  @Input() location!: Location;
}
