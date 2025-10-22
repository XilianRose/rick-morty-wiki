export interface CharacterLocation {
  name: string;
  url: string;
} 

export interface Character {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: CharacterLocation;
  name: string;
  origin: CharacterLocation;
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface CharacterInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterResponse {
  info: CharacterInfo;
  results: Character[];
}