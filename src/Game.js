
function Game() {"use strict";
  this._frame = 1;
  this._roll = 1;
  this._rollScore1 = 0;
  this._rollScore2 = 0;
  this._totalScore = 0;
  this._currentKnockdown = 0;
  this._maxRounds = 10;
  this._sKsP = "";
};

Game.prototype.bowl = function() {
  this.rollScoreMethod();
};

Game.prototype.rollScoreMethod = function(){
  this._currentKnockdown = this.pinsKnockdown();
  if(this._roll === 1){
    this._rollScore1 = this._currentKnockdown
  } else {
    this._rollScore2 = this._currentKnockdown
  }
  this.remainingPins();
}

Game.prototype.pinsKnockdown = function(){
  return Math.floor(Math.random() * (this._standingPins + 1));
}

Game.prototype.remainingPins = function(){
  this._standingPins -= this._currentKnockdown
}




Game.prototype.frameAndRoll = function(){
  this.endGameCheck();
  if(this._frame < this._maxRounds) {
    this.frameIncrement();
    this.rollAlternate();
  }
}

Game.prototype.endGameCheck = function(){
  if(this._frame === 10 && this._standingPins === 0){
    this._maxRounds = 11
  }
}




Game.prototype.frameIncrement = function(){
  if(this._roll === 2 || this._standingPins === 0){
    this._frame ++
    this.totalScoreUpdate();
  }
}

Game.prototype.totalScoreUpdate = function(){
  this._totalScore += (this._rollScore1 + this._rollScore2);
  this.checkBonus();
  this.strikeOrSpare();
}

Game.prototype.checkBonus = function(){
  if (this._sKsP === "Strike!") {
    this._totalScore += (this._rollScore1 + this._rollScore2);
  } else if (this._sKsP === "Spare!") {
    this._totalScore += this._rollScore1;
  }
  this._sKsP = "";
}

Game.prototype.strikeOrSpare = function(){
  if (this._rollScore1 === 10) {
    this._sKsP = "Strike!"
  } else if (this._rollScore1 + this._rollScore2 === 10) {
    this._sKsP = "Spare!"
  }
}
