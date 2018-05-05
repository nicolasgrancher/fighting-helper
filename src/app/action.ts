import {Character} from "./character";

export class Action {
  owner: Character;
  init: number;
  type: number;

  static BONUS_SPEED = 10;
  static TIME_TO_CAST_A_SPELL = 10;

  static DEFAULT_ACTION = 0;
  static SUP_ATT = 1;
  static BEG_CAST = 2;
  static END_CAST = 3;
  static WAIT = 4;

  constructor(owner: Character, init: number, type: number) {
    this.owner = owner;
    this.init = init;
    this.type = type;
  };


  getActionTypeText() {
    switch (this.type) {
      case Action.DEFAULT_ACTION :
        return "Action normale";
      case Action.BEG_CAST :
        return "Début de l'incantation";
      case Action.END_CAST :
        return "Lancement du sort";
      case Action.WAIT :
        return "En attente";
      case Action.SUP_ATT :
        return "Attaque à outrance";
      default :
        return "ERREUR, action non reconnue !";
    }
  }
}
