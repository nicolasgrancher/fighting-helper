import {Action} from "./action";

export class Character {
  name: string;
  isPC: boolean;
  init: number;
  attacks: number;
  isCaster: boolean;

  initMalus: number = 0;
  actions: Action[] = [];

  constructor(name: string, isPC: boolean, init: number, attacks: number, isCaster: boolean) {
    this.name = name;
    this.isPC = isPC;
    this.init = init;
    this.attacks = attacks;
    this.isCaster = isCaster;
  }

  attack(multiAttacks: boolean, speed: boolean) {
    let actions = [];

    if (speed) {
      actions.push(new Action(this, this.getInit() + Action.BONUS_SPEED, Action.DEFAULT_ACTION));
    }

    actions.push(new Action(this, this.init, Action.DEFAULT_ACTION));

    if (multiAttacks) {
      let nb = this.attacks - 1;

      while (nb > 0) {
        let calculInit = this.init * nb / this.attacks;
        actions.push(new Action(this, calculInit, Action.SUP_ATT));
        nb--;
      }
    }

    this.actions = actions;

    return actions;
  };

  cast(spellLvl: number, complexCast: boolean, speed: boolean, speedCast: boolean) {
    // speedcast non utilisé (combiné dans l'action à l'init)

    // TODO sort simple ou complexe 10 /20 segments (par défaut simple)

    let actions = [];

    let currentInit = this.getInit();

    if (speed) {
      currentInit += Action.BONUS_SPEED;
    }

    actions.push(new Action(this, currentInit, Action.BEG_CAST));

    let timeToCast = complexCast ? Action.TIME_TO_CAST_A_SPELL_COMPLEX : Action.TIME_TO_CAST_A_SPELL;

    currentInit -= Math.min(timeToCast, 0); // d'init négative pour ne pas pénaliser le mago => mini 0
    actions.push(new Action(this, currentInit, Action.END_CAST));

    currentInit -= Math.min((spellLvl + 1), 0); // d'init négative pour ne pas pénaliser le mago => mini 0
    actions.push(new Action(this, currentInit, Action.WAIT));

    this.actions = actions;

    return actions;
  };

  getInit() {
    return this.init - this.initMalus;
  }
}
