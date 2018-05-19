import {Component} from '@angular/core';
import {Action} from "./action";
import {Character} from "./character";
import {CharacterService} from "./character.service";
import {$} from "protractor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  characters: Character[];
  actions: Action[];
  roundNumber: number = 0;

  constructor(private characterService: CharacterService) {
  }

  ngOnInit() {
    this.getCharacters();
  }

  scrollToTop(): void {
    window.scrollTo(0,0);
  }

  getCharacters(): void {
    this.characters = this.characterService.getCharacters();
  }

  calculateRound() {
    // on regarde si il restait des actions a faire (init < 0)
    this.resolveRemainingActions();

    this.roundNumber++;

    // on calcule les init du round pour chaque perso

    this.actions = this.getActions();

    this.resolveActions();
  };

  private resolveActions() {
    for (let i = 0; i < this.characters.length; i++) {
      let character = this.characters[i];

      let remainingActions: Action[] = [];
      for (let j = 0; j < character.actions.length; j++) {
        let action = character.actions[j];

        if (action.init < 0) {
          remainingActions.push(action);
        }
      }

      character.actions = remainingActions;
    }
  }

  private resolveRemainingActions() {
    for (let i = 0; i < this.characters.length; i++) {
      let character = this.characters[i];
      for (let j = 0; j < character.actions.length; j++) {
        let action = character.actions[j];

        let init = 0;
        if (action.init < 0) {
          // it can only be a spell cast
          if (action.type === Action.WAIT) {
            init = action.init;
          }
        }

        if (init < 0) { // in this case it take an init malus
          character.initMalus = init;
        } else { // else remove any init malus it could remain
          character.initMalus = 0;
        }
      }
    }
  }

  private getActions() {
    let actions: Action[] = [];

    for (let i = 0; i < this.characters.length; i++) {
      let character = this.characters[i];
      for (let j = 0; j < character.actions.length; j++) {
        let action = character.actions[j];

        actions.push(action);
      }
    }

    actions.sort(function (a, b) {
      return b.init - a.init;
    });

    return actions;
  }
}
