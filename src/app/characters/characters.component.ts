import {Component, OnInit, Input} from '@angular/core';
import {Character} from "../character";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  @Input() characters: Character[];
  @Input() negativeInit: boolean;

  selectedCharacter: Character;

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(character: Character): void {
    this.selectedCharacter = character;
  }

  addCharacter(): void {
    let character = new Character('', false, 0, 0, false);

    this.characters.push(character);

    this.onSelect(character);
  }

  removeCharacter(character: Character): void {
    this.selectedCharacter = null;

    let index = this.characters.indexOf(character);
    if (index > -1) {
      this.characters.splice(index, 1);
    }
  }
}
