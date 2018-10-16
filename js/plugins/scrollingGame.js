function AnimationProperties() {
    this.initialize.apply(this, arguments);
}

AnimationProperties.prototype.initialize = function(isAnimated, speed, framesNum) {
   this._speed = 0;
   this._framesNum = 0;
   this._isAnimated = isAnimated || false;
   if (this._isAnimated == true){
      this._speed = speed || 1;
      this._frames = framesNum || 1;
   }
}

function ScrollingGame_Player() {
    this.initialize.apply(this, arguments);
}

ScrollingGame_Player.prototype.initialize = function(file, animationProperties) {
  this._pictureId = 1;
  this._x = 288;
  this._y = 960;
  this._filename = file || "";
  this._jumpVelocity_X = 3;
  this._jumpVelocity_Y = 4;
  this._fallVelocity_X = 3;
  this._fallVelocity_Y = 4;
  this._indexBeforeFalling = 0;
  this._countBeforeFalling = 15;
  this._isJumping = false;
  this._isFalling = false;
  this._animationProperties = animationProperties || new AnimationProperties(false);
}

function ScrollingGame_System() {
    this.initialize.apply(this, arguments);
}

ScrollingGame_System.prototype.initialize = function(fgFilename, bgFilename, player) {
  this._pictureIdCount = 0;
  this._groundY = 960;
  this._bgFilename = bgFilename || "";
  this._fgFilename = fgFilename || "";
  this._player = player || new ScrollingGame_Player("scrollingPlayer");

  this._pictureIdCount++;
  this._player._pictureId = this._pictureIdCount;


}


ScrollingGame_System.prototype.startGame = function(){
  $gameScreen.showPicture(this._player._pictureId, this._player._filename, "center", this._player._x, this._player._y, 100, 100, 255);
  if (this._player._animationProperties._isAnimated){
    var frm = Math.min(Math.max(this._player._animationProperties._frames,1),999);
    var speed = this._player._animationProperties._animSpeed;
    $gameScreen.picture(this._player._pictureId)._animeData = [true,frm,9999,0,speed];
  }
  $gameSwitches.setValue(18,true);
}


ScrollingGame_System.prototype.update = function(){
  this.checkInput();
  if (this._player._isJumping == true){
    this._player._x = this._player._x + this._jumpVelocity_X;
    this._player._y = this._player._y + this._jumpVelocity_Y;
    this._player._indexBeforeFalling++;
    $gameScreen.picture(this._player._pictureId)._angle = -5;

    if (this._player._indexBeforeFalling >= this._player._countBeforeFalling){
      $gameScreen.picture(this._player._pictureId)._angle = 5;
      this._player._indexBeforeFalling = 0;
      this._player._isFalling = true;
      this._player._isJumping = false;
    }
  }

  if (this._player._isFalling == true){
    this._player._x = this._player._x + this._fallVelocity_X;
    this._player._y = this._player._y + this._fallVelocity_Y;
    if (this._player._y >= this._groundY){
       $gameScreen.picture(this._player._pictureId)._angle = 0;
       this._player._isFalling = false;
    }
  }

  $gameScreen.picture(this._player._pictureId)._x = this._player._x;
  $gameScreen.picture(this._player._pictureId)._y = this._player._y;

  //check collision
  //update score
}

ScrollingGame_System.prototype.checkInput = function() {
  if (TouchInput._triggered){
    this._player._isJumping = true;
  }
}

var loadScrollingGame = function(){
  var fgFilename = "sg_fg1";
  var bgFilename = "sg_bg1";
  var playerFileName = "scrollingPlayer";
  var player = new ScrollingGame_Player(playerFileName, new AnimationProperties(false, 1, 1));
  $scrollingGame = new ScrollingGame_System(fgFilename, bgFilename, player);
  $scrollingGame.startGame();
}