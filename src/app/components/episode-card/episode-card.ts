import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Episode } from '../../models/episodes.model';

@Component({
  selector: 'app-episode-card',
  imports: [CommonModule],
  templateUrl: './episode-card.html',
  styleUrl: './episode-card.scss'
})
export class EpisodeCard {
  @Input() episode!: Episode;
}
