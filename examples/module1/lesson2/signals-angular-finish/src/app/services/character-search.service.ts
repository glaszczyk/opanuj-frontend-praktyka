import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../types/Character';

@Injectable({
  providedIn: 'root'
})
export class CharacterSearchService {
  private charactersSource$ = signal<Character[]>([]);
  characters = signal<Character[]>([]);
  private nameValue = signal('');
  private genderValue = signal('');
  private sortOptionValue = signal('');
  private apiBaseUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) {
    effect(() => {
      this.fetchCharacters();
    }, {allowSignalWrites: true});

    effect(() => {
      const sortOption = this.sortOptionValue();
      const characters = this.charactersSource$();
      const result = this.sortCharacters(characters, sortOption);
      this.characters.set(result);
    }, {allowSignalWrites: true});
  }

  fetchCharacters() {
    const name = this.name;
    const gender = this.gender;
    if (name !== '' || gender !== '') {
      this.http
        .get<{ results: Character[] }>(
          `${this.apiBaseUrl}?name=${name}&gender=${gender}`
        )
        .subscribe((response) => {
          this.charactersSource$.set(response.results || []);
        });
    } else {
      this.charactersSource$.set([]);
    }
  }

  setName(name: string) {
    this.nameValue.set(name);
  }

  setGender(gender: string) {
    this.genderValue.set(gender);
  }

  setSortOption(sortOption: string) {
    this.sortOptionValue.set(sortOption);
  }

  get name(): string {
    return this.nameValue();
  }

  get gender(): string {
    return this.genderValue();
  }

  get sortOption(): string {
    return this.sortOptionValue();
  }

  sortCharacters(characters: Character[], sortOption: string): Character[] {
    return [...characters].sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'created') {
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      }
      return 0;
    });
  }
}
