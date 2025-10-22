import { location } from './location.model';

export interface Character {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: location;
  name: string;
  origin: location;
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse {
  info: Info;
  results: Character[];
}