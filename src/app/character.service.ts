import { Injectable } from '@angular/core';
import {Character} from "./character";
import {CHARACTERS} from "./mock-characters";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  getCharacters(): Character[] {
    return CHARACTERS
  };
}
