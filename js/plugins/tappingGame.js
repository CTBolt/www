//-----------------------------------------------------------------------------
// Level_Setup_Connector
//
//

function Level_Setup_Connector() {
    this.initialize.apply(this, arguments);
}

Level_Setup_Connector.prototype.initialize = function(mapId, commonId) {
   this._mapId = mapId;
   this._commonId = commonId;
}

//-----------------------------------------------------------------------------
// Main_System
//
//

function Main_System() {
    this.initialize.apply(this, arguments);
}

Main_System.prototype.initialize = function() {
    this._levelConnectors = [
                            new Level_Setup_Connector( 1, 122), // Intro
                            new Level_Setup_Connector(12, 150), // Shop
                            new Level_Setup_Connector(13, 124), // Results
                            new Level_Setup_Connector( 6, 127), // Map 1

                            new Level_Setup_Connector( 7, 101), // Level 01
                            new Level_Setup_Connector(11, 102), // Level 02
                            new Level_Setup_Connector(17, 103), // Level 03
                            new Level_Setup_Connector(20, 104), // Level 04
                            new Level_Setup_Connector(18, 105), // Level 05
                            new Level_Setup_Connector(24, 106), // Level 06
                            new Level_Setup_Connector(26, 107), // Level 07
                            new Level_Setup_Connector(19, 108), // Level 08
                            new Level_Setup_Connector(21, 109), // Level 09
                            new Level_Setup_Connector(23, 110), // Level 10
                            new Level_Setup_Connector( 2, 111), // Level 11
                            new Level_Setup_Connector( 3, 116), // Level 12
                            new Level_Setup_Connector( 4, 216), // Level 13
                            new Level_Setup_Connector( 8, 218), // Level 14
                            new Level_Setup_Connector( 9, 220), // Level 15
                            new Level_Setup_Connector(10, 222), // Level 16
                            new Level_Setup_Connector( 5, 224), // Level 17
                            new Level_Setup_Connector(22, 225), // Level 18
                            new Level_Setup_Connector(25, 226), // Level 19
                            new Level_Setup_Connector(27, 227), // Level 20
                            new Level_Setup_Connector(28, 228), // Level 21
                            new Level_Setup_Connector(29, 229), // Level 22
                            new Level_Setup_Connector(30, 230), // Level 23
                            new Level_Setup_Connector(31, 231), // Level 24
                            new Level_Setup_Connector(32, 232), // Level 25
                            new Level_Setup_Connector(34, 233), // Level 26
                            new Level_Setup_Connector(35, 234), // Level 27
                            new Level_Setup_Connector(36, 235), // Level 28
                            new Level_Setup_Connector(37, 236), // Level 29
                            new Level_Setup_Connector(38, 237), // Level 30
                            new Level_Setup_Connector(39, 238), // Level 31
                            new Level_Setup_Connector(40, 239), // Level 32
                            new Level_Setup_Connector(41, 240), // Level 33
                            new Level_Setup_Connector(42, 241), // Level 34
                            new Level_Setup_Connector(43, 242), // Level 35
                            new Level_Setup_Connector(44, 243), // Level 36
                            new Level_Setup_Connector(45, 244), // Level 37
                            new Level_Setup_Connector(46, 245), // Level 38
                            new Level_Setup_Connector(47, 246), // Level 39
                            new Level_Setup_Connector(48, 247)  // Level 40
    ];
};

//-----------------------------------------------------------------------------
// Tap_Item
//
//

function Tap_Item() {
    this.initialize.apply(this, arguments);
}

Tap_Item.prototype.initialize = function(img_filename, bubble_filename, clickedImg_filename, clickedBubble_filename, id1, id2, cat, adjustmentScore, adjustmentTime, adjustmentCoin, gainItem, quantityGained, gainActor, anim, frameNum, animSpeed, animAfter, frameNumAfter, animSpeedAfter, commonEventId, commonEventActiveSwitchId) {

   if (!cat){cat = 1};

   this._imgFile = img_filename;
   this._bubbleFile = bubble_filename;

   this._clickedImgFile = clickedImg_filename;
   this._clickedBubbleFile = clickedBubble_filename;

   this._timeBeforeMoving = Math.floor((Math.random() * 100)+200);
   this._timeBeforeMoving_Counter = 0;
   this._imgPictureId = id1;
   this._bubblePictureId = id2;
   this._visible = false;
   this._scaleX = 20;
   this._scaleY = 20;
   this._originalScaleX = this._scaleX;
   this._originalScaleY = this._scaleY;

   this._countX = 0;
   this._countY = 0;

   this._movementType = "+";
   
   this._movementDelayIndex = 0;
   this._movementDelay = 0;

   this._scaleMaxX = 80;
   this._scaleMaxY = 80;

   this._originalBubbleName = bubble_filename;
   this._category = cat;
   this._soundWhenClicked = {name:"bop01",volume:50,pan:0,pitch:-1};

   // Not used anymore
   this._patternIndex = 1;
   this._patternMax = 33;
   this._originalPatternIndex = this._patternIndex;

   this._shownCounter = 0;
   this._shownAt = 25;
   this._X = 0;
   this._Y = 0;
   
   var r = Math.floor((Math.random() * 4)-4);
   this._moveSpeedX =  2;

   r = Math.floor((Math.random() * 2)-2);
   this._moveSpeedY = -1;

   this._originalMoveSpeedX = this._moveSpeedX;
   this._originalMoveSpeedY = this._moveSpeedY;

   this._returnOriginalSpeedX = true;
   this._returnOriginalSpeedY = true;

   this._reverseXSpeedAfterCount = Math.floor((Math.random() * 170)+40);
   this._reverseYSpeedAfterCount = 0;
   
   this._reverseXSpeedAfterCount_Index = 0;
   this._reverseYSpeedAfterCount_Index = 0;

   this._reverseXSpeedAfterCount_AfterTap = true;
   this._reverseYSpeedAfterCount_AfterTap = true;
   
   this._exactXSpeedAfterCount_AfterTap = 0;
   this._exactYSpeedAfterCount_AfterTap = .5;

   this._waitToShow = 360;
   this._waitToShow_Index = 0;
   this._waiting = false;

   this._rotateSpeed = 0;
   this._originalRotateSpeed = this._rotateSpeed;

   this._rotateBubbleSpeed = 0;
   this._originalRotateBubbleSpeed = this._rotateBubbleSpeed;

   this._rotateSpeedAfterClicked = 10;
   this._rotateBubbleSpeedAfterClicked = 0;

   this._originalAngle = 0;
   
   this._originalImageTint  = [0, 0, 0, 0];
   this._originalBubbleTint = [0, 0, 0, 0];

   this._animationNumber = 4;
   this._releasedAnimationNumber = 5;
   this._scoreAnimationNumber = 134;
   
   this._opacityAfterClicked = 255;
   this._bubbleOpacityAfterClicked = 200;

   this._opacityAdjustmentAfterClicked = -6;
   
   this._imgOpacity = 255;
   this._bubbleOpacity = 200;

   this._bubbleBounceActive = true;

   this._wallBounceActiveX = true;
   this._wallBounceActiveY = true;

   this._spawnMode = "random";
   
   this._scaleXRate = 2;
   this._scaleYRate = 2;
   
   this._timeAdjustment = 0;
   this._scoreAdjustment = 0;
   this._coinAdjustment = adjustmentCoin;
   
   this._effect = "breathe";

   this._anim = anim;
   this._frames = frameNum;
   this._animSpeed = animSpeed;

   this._animAfter = animAfter;
   this._framesAfter = frameNumAfter;
   this._animSpeedAfter =  animSpeedAfter;

   this._gainActor = gainActor;

   this._gainItem = gainItem;
   this._quantityGained = quantityGained;

   this._commonEventId = commonEventId;
   this._commonEventActiveSwitchId = commonEventActiveSwitchId;

   //showToast(cat);

   adjustmentTime = adjustmentTime || 0;
   this._scoreAdjustment = adjustmentScore;
   this._timeAdjustment = adjustmentTime*60;
   this._coinAdjustment = adjustmentCoin;

   this._propertiesLocked = false;

};


//-----------------------------------------------------------------------------
// Tapping_Game
//
//

function Tapping_Game() {
    this.initialize.apply(this, arguments);
}

Tapping_Game.prototype.initialize = function(tapItems, mode, inputMode, endAfterTapGoal, tapGoal, timeLimit, maxItems, maxCoinItems, increaseTappingItemChance, tapScreenX, tapScreenY, tapScreenWidth, tapScreenHeight) {
    if (!mode){mode="pop in time";}
    if (!inputMode){inputMode="swipe";}
    if (!endAfterTapGoal){endAfterTapGoal=true;}
    if (!tapGoal){tapGoal=50;}
    if (!timeLimit){timeLimit=60;}
    if (!maxItems){maxItems=3;}
    if (!maxCoinItems){maxCoinItems=3;}
    if (!increaseTappingItemChance){increaseTappingItemChance=30;}
    if (!tapScreenX){tapScreenX=100;}
    if (!tapScreenY){tapScreenY=240;}
    if (!tapScreenWidth){tapScreenWidth=360;}
    if (!tapScreenHeight){tapScreenHeight=800;}


    this._tapItems = tapItems;
    this._mode = mode;
    this._inputMode = inputMode;
    this._endAfterTapGoal = endAfterTapGoal;
    this._tapGoal = tapGoal;
    this._timeLimit = timeLimit;
    this._tapScreenX = tapScreenX;
    this._tapScreenY = tapScreenY;
    this._tapScreenWidth = tapScreenWidth;
    this._tapScreenHeight = tapScreenHeight;
    this._maxItems = maxItems;
    this._originalMaxItems = this._maxItems;
    this._maxCoinItems = maxCoinItems;
    this._increaseTappingItemChance = increaseTappingItemChance;

    //Continued here

    this._tapItemCount = 0;
    this._timeBeforeMoving = Math.floor((Math.random() * 100)+200);
    this._originalTimeBeforeMoving = this._timeBeforeMoving;
    this._timeBeforeMoving_Counter = this._timeBeforeMoving;
    this._hasWon = false;
    this._hasLost = false;
    this._maxItemsOnScreen = 4;
    this._bubblesReleased = 0;

    this._background = null;
    this._negativeStrikeMax = null;

    this._tapZonePictureId = null;

   this._touchAreaX = 0;
   this._touchAreaY = 0;
};

Tapping_Game.prototype.checkForAddTapItemCount = function(){
      if (!this._hasWon && !this._hasLost){
        if ($gameSwitches.value(65)){
          this._bubblesReleased++;
          $gameVariables.setValue(124, this._bubblesReleased);

          var r = Math.floor((Math.random() * this._increaseTappingItemChance)+1);
          if (r === 1){
            if ($tappingGame){
              $tappingGame._maxItems = this._maxCoinItems;
            }
          }

        }
      }
};

Tapping_Game.prototype.showTapItem = function(tapItem){
if ($tappingGame){


  if (tapItem._spawnMode === "random"){
    var x = Math.floor((Math.random() * this._tapScreenWidth)+this._tapScreenX);
    var y = Math.floor((Math.random() * this._tapScreenHeight)+this._tapScreenY);
  }

  tapItem._visible = true;
  $tappingGame._tapItemCount++;
//  console.log($tappingGame._tapItemCount);

  var img = tapItem._imgFile;

  $gameScreen.showPicture(tapItem._imgPictureId, img.toLowerCase(), 'center', 0, 0, tapItem._originalScaleX, tapItem._originalScaleY, 0, 0);
  $gameScreen.showPicture(tapItem._bubblePictureId, tapItem._bubbleFile.toLowerCase(), 'center', 0, 0, tapItem._originalScaleX, tapItem._originalScaleY, 0, 0);

  if (tapItem._anim === true){
    var frm = Math.min(Math.max(tapItem._frames,1),999);
    var speed = tapItem._animSpeed;
    $gameScreen.picture(tapItem._imgPictureId)._animeData = [true,frm,9999,0,speed];
  }

//  $gameScreen.picture(tapItem._imgPictureId)._tone = tapItem._originalImageTint;
//  $gameScreen.picture(tapItem._bubblePictureId)._tone = tapItem._originalBubbleTint;
//  $gameScreen.tintPicture(tapItem._imgPictureId, tapItem._originalImageTint, 0);
//  $gameScreen.tintPicture(tapItem._bubblePictureId, tapItem._originalBubbleTint, 0);

  this.moveTapItem($tappingGame._tapItemCount-1);
}
};


Tapping_Game.prototype.updateGame = function(){
if ($tappingGame){
  for (var i = 0; i < $tappingGame._tapItems.length; i++){
    var tapItem = $tappingGame._tapItems[i];
    if (tapItem._visible === true){

      $tappingGame.adjustTapItem(i);
      tapItem._timeBeforeMoving_Counter++;
      if (tapItem._timeBeforeMoving_Counter >= tapItem._timeBeforeMoving){
          tapItem._timeBeforeMoving_Counter = 0;
          for (var j = 0; j < $tappingGame._tapItems.length; j++){
            $tappingGame._tapItems[j]._waitToShow_Index = 0;
          }
          $tappingGame.moveTapItem(i);
          break;
      }
    }
    if (tapItem._waiting){
      tapItem._waitToShow_Index++;
      if (tapItem._waitToShow_Index > tapItem._waitToShow){
        tapItem._waiting = false;
        for (var j = 0; j < $tappingGame._tapItems.length; j++){
            $tappingGame._tapItems[j]._waitToShow_Index = 0;
        }
        $tappingGame.moveTapItem(i);
        break;
      }
    }else{

    }
  }
}
}

Tapping_Game.prototype.moveTapItem = function(i){
if ($tappingGame){
  if (i <= $tappingGame._maxItems){
   var tapItem = $tappingGame._tapItems[i];
   var moveTapItem = true;
   
  tapItem._countX = 0;
  tapItem._countY = 0;

   if ($gameTimer._working){
    // if ($gameTimer.seconds() <= 2){moveTapItem=false;}
   }

     if (moveTapItem){
       tapItem._waiting = false;
       tapItem._timeBeforeMoving_Counter = 0;
       $tappingGame._timeBeforeMoving_Counter = 0;
       
       if ($gameScreen.picture(tapItem._imgPictureId)){
         $gameScreen.picture(tapItem._imgPictureId).rotate(tapItem._originalRotateSpeed);
         $gameScreen.picture(tapItem._bubblePictureId).rotate(tapItem._originalRotateBubbleSpeed);

         if (tapItem._returnOriginalSpeedX){tapItem._moveSpeedX = tapItem._originalMoveSpeedX;}
         if (tapItem._returnOriginalSpeedY){tapItem._moveSpeedY = tapItem._originalMoveSpeedY;}

         var noEmptySpot = true;

         while (noEmptySpot){
            var noEmptySpot = false;

            var x = Math.floor((Math.random() * this._tapScreenWidth)+this._tapScreenX);
            var y = Math.floor((Math.random() * this._tapScreenHeight)+this._tapScreenY);

            for (var i = 0; i < $tappingGame._tapItems.length; i++) {
              var tp = $tappingGame._tapItems[i];
              if (!tp._waiting){
                if ((x > tp._X - 420) && (x < tp.X + 420)){
                  if ((y > tp._Y - 420) && (y < tp.Y + 420)){
                    noEmptySpot = true;
                  }
                }
              }
            }
         }

          var img = tapItem._imgFile;

         tapItem._X = x;
         tapItem._Y = y;
//         console.log($gameSystem);

       	 var sprite = new Sprite_Base();
       	 var animId = tapItem._releasedAnimationNumber;

      	 sprite.anim = $dataAnimations[animId];
  	 sprite.x = tapItem._X;
  	 sprite.y = tapItem._Y;
  	 sprite.mirror = 0;
  	 sprite.delay = 0;
         sprite.waitFor = 0;
         sprite.dump = true;
         if(SceneManager._scene){
  	   SceneManager._scene.addChild(sprite);
  	   sprite.startAnimation(sprite.anim, sprite.mirror, sprite.delay);
  	 }

         tapItem._scaleX = tapItem._originalScaleX;
         tapItem._scaleY = tapItem._originalScaleY;

        if (tapItem._anim === true){
          var frm = Math.min(Math.max(tapItem._frames,1),999);
          var speed = tapItem._animSpeed;
          $gameScreen.picture(tapItem._imgPictureId)._animeData = [true,frm,9999,0,speed];
        }

         if ($gameScreen.picture(tapItem._imgPictureId)){
           $gameScreen.picture(tapItem._imgPictureId)._angle = tapItem._originalAngle;
           $gameScreen.picture(tapItem._imgPictureId)._name = img.toLowerCase();
           $gameScreen.picture(tapItem._imgPictureId)._x = x;
           $gameScreen.picture(tapItem._imgPictureId)._y = y;
           $gameScreen.picture(tapItem._imgPictureId)._scaleX = tapItem._scaleX;
           $gameScreen.picture(tapItem._imgPictureId)._scaleY = tapItem._scaleY;
           $gameScreen.picture(tapItem._imgPictureId)._opacity = tapItem._imgOpacity;
        }

        if ($gameScreen.picture(tapItem._bubblePictureId)){
          $gameScreen.picture(tapItem._bubblePictureId)._name = tapItem._originalBubbleName.toLowerCase();
          $gameScreen.picture(tapItem._bubblePictureId)._scaleX = tapItem._scaleX;
          $gameScreen.picture(tapItem._bubblePictureId)._scaleY = tapItem._scaleY;
          $gameScreen.picture(tapItem._bubblePictureId)._x = x;
          $gameScreen.picture(tapItem._bubblePictureId)._y = y;
          $gameScreen.picture(tapItem._bubblePictureId)._opacity = tapItem._bubbleOpacity;
        }
        this.checkForAddTapItemCount();
      }
    }
  }
}
};


// ************************************************
//                   adjustTapItem
// ************************************************
Tapping_Game.prototype.adjustTapItem = function(i){
  
  // if $tappingGame exists...
  if ($tappingGame){
  // set tapItem variable to make things easier to read
  var tapItem = $tappingGame._tapItems[i];

  // if tapItem is waiting...
  if (tapItem._waiting){
    // if tapItem has an opacity adjustment to be made after clicked...
    if (tapItem._opacityAdjustmentAfterClicked){
      // adjust the opacity using opacityAdjustmentAfterClicked
      $gameScreen.picture(tapItem._imgPictureId)._opacity = $gameScreen.picture(tapItem._imgPictureId)._opacity + tapItem._opacityAdjustmentAfterClicked;
    }
  }

  // ******* Adjust Size *******
  // TO-DO: Separate bubble size to it's own scale variables
  
  // Scale X
  if (tapItem._scaleX < tapItem._scaleMaxX){
    tapItem._scaleX = tapItem._scaleX + tapItem._scaleXRate;
    if ($gameScreen.picture(tapItem._bubblePictureId)){
      $gameScreen.picture(tapItem._bubblePictureId)._scaleX = tapItem._scaleX;
    }
    if ($gameScreen.picture(tapItem._imgPictureId)){
      $gameScreen.picture(tapItem._imgPictureId)._scaleX = tapItem._scaleX;
    }
  }


  // Scale Y
  if (tapItem._scaleY < tapItem._scaleMaxY){
    tapItem._scaleY = tapItem._scaleY + tapItem._scaleYRate;
    if ($gameScreen.picture(tapItem._bubblePictureId)){
      $gameScreen.picture(tapItem._bubblePictureId)._scaleY = tapItem._scaleY;
    }
    if ($gameScreen.picture(tapItem._imgPictureId)){
      $gameScreen.picture(tapItem._imgPictureId)._scaleY = tapItem._scaleY;
    }
  }
  // **************************


  // *** Reverse After Count ***

  // Add to Count
  tapItem._reverseXSpeedAfterCount_Index++;
  tapItem._reverseYSpeedAfterCount_Index++;
  
  // Reverse X
  // if Reverse X after count is greater than 0...
  if (tapItem._reverseXSpeedAfterCount > 0){
    // if X Index greater than or equal to Count...
    if (tapItem._reverseXSpeedAfterCount_Index >= tapItem._reverseXSpeedAfterCount){
      // Reverse X Speed (aka. reverse direction)
      tapItem._moveSpeedX = -tapItem._moveSpeedX;
      // Reset the X Index
      tapItem._reverseXSpeedAfterCount_Index = 0;
    }
  }

  // Reverse Y
  // if Reverse Y after count is greater than 0...
  if (tapItem._reverseYSpeedAfterCount > 0){
    // if Y Index greater than or equal to Count...
    if (tapItem._reverseYSpeedAfterCount_Index >= tapItem._reverseYSpeedAfterCount){
      // Reverse Y Speed (aka. reverse direction)
      tapItem._moveSpeedY = -tapItem._moveSpeedY;
      // Reset the Y Index
      tapItem._reverseYSpeedAfterCount_Index = 0;
    }
  }
  // **************************

  // ****** Bubble Bounce ********
  //if (tapItem._bubbleBounceActive){
    for (var tapId = 0; tapId < $tappingGame._tapItems.length; tapId++){
        var tapItem_Compare = $tappingGame._tapItems[tapId];
        if (tapItem_Compare._waiting != true){
            var offset_X = 0;
            var offset_Y = 0;

            if ($gameScreen.picture(tapItem._bubblePictureId) != null){
                var rightEdge  = tapItem._X + ($gameScreen.picture(tapItem._bubblePictureId)._width / 2);
                var leftEdge   = tapItem._X - ($gameScreen.picture(tapItem._bubblePictureId)._width / 2);
                var bottomEdge = tapItem._Y + ($gameScreen.picture(tapItem._bubblePictureId)._height / 2);
                var topEdge    = tapItem._Y - ($gameScreen.picture(tapItem._bubblePictureId)._height / 2);
            }

            if ($gameScreen.picture(tapItem_Compare._bubblePictureId) != null){
                var rightEdge_Compare  = tapItem_Compare._X + ($gameScreen.picture(tapItem_Compare._bubblePictureId)._width / 2);
                var leftEdge_Compare   = tapItem_Compare._X - ($gameScreen.picture(tapItem_Compare._bubblePictureId)._width / 2);
                var bottomEdge_Compare = tapItem_Compare._Y + ($gameScreen.picture(tapItem_Compare._bubblePictureId)._height / 2);
                var topEdge_Compare    = tapItem_Compare._Y - ($gameScreen.picture(tapItem_Compare._bubblePictureId)._height / 2);;
            }

            if (bottomEdge >= topEdge_Compare && topEdge <= bottomEdge_Compare){
                // if the direction of the tapItem is: Right
                if (tapItem._moveSpeedX > 0){
                    if (rightEdge === leftEdge_Compare){
                    //MainActivity.showToast("bounced")
                      tapItem._X = tapItem._X - 1;
                      tapItem._moveSpeedX = -tapItem._moveSpeedX;
                      tapItem._reverseXSpeedAfterCount_Index = 0;
                    }
                }else{ // if the direction of the tapItem is: Left
                    if (leftEdge === rightEdge_Compare){
                    //MainActivity.showToast("bounced")
                      tapItem._X = tapItem._X + 1;
                      tapItem._moveSpeedX = -tapItem._moveSpeedX;
                      tapItem._reverseXSpeedAfterCount_Index = 0;
                    }
                }
            }

        if (rightEdge >= leftEdge_Compare && leftEdge <= rightEdge_Compare){
                // if the direction of the tapItem is: Down
                if (tapItem._moveSpeedY > 0){
                    if (bottomEdge === topEdge_Compare){
                    //MainActivity.showToast("bounced")
                      tapItem._Y = tapItem._Y - 1;
                      tapItem._moveSpeedY = -tapItem._moveSpeedY;
                      tapItem._reverseYSpeedAfterCount_Index = 0;
                    }
                }else{ // if the direction of the tapItem is: Up
                    if (topEdge === bottomEdge_Compare){
                    tapItem._Y = tapItem._Y + 1;
                    //MainActivity.showToast("bounced")
                      tapItem._moveSpeedY = -tapItem._moveSpeedY;
                      tapItem._reverseYSpeedAfterCount_Index = 0;
                    }
                }
            }
          }
      }
//  }

  // ****** Wall Bounce ********
  if (tapItem._wallBounceActiveX){
    if ((tapItem._X) <= 20){
      tapItem._X = 21;
      tapItem._moveSpeedX = -tapItem._moveSpeedX;
      tapItem._reverseXSpeedAfterCount_Index = 0;
    }

    if ((tapItem._X) >= 550){
      tapItem._X = 549;
      tapItem._moveSpeedX = -tapItem._moveSpeedX;
      tapItem._reverseXSpeedAfterCount_Index = 0;
    }
  }
  
  if (tapItem._wallBounceActiveY){
    if ((tapItem._Y) <= 20){
      tapItem._Y = 21;
      tapItem._moveSpeedY = -tapItem._moveSpeedY;
      tapItem._reverseYSpeedAfterCount_Index = 0;
    }

    if ((tapItem._Y) >= 1070){
      tapItem._Y = 1069;
      tapItem._moveSpeedY = -tapItem._moveSpeedY;
      tapItem._reverseYSpeedAfterCount_Index = 0;
    }
  }

  // ****** Movement ********

  tapItem._movementDelayIndex++;
  if (tapItem._movementDelayIndex > tapItem._movementDelay){
    tapItem._movementDelayIndex = 0

    if (tapItem._movementType == "+"){
      tapItem._X = tapItem._X + tapItem._moveSpeedX;
      tapItem._Y = tapItem._Y + tapItem._moveSpeedY;
    }
  }

  if ($gameScreen.picture(tapItem._imgPictureId)){
    $gameScreen.picture(tapItem._imgPictureId)._x = tapItem._X;
    $gameScreen.picture(tapItem._imgPictureId)._y = tapItem._Y;

  }

  if ($gameScreen.picture(tapItem._bubblePictureId)){
    $gameScreen.picture(tapItem._bubblePictureId)._x = tapItem._X;
    $gameScreen.picture(tapItem._bubblePictureId)._y = tapItem._Y;
  }
}
};

var eraseTapping = function(){
    if ($tappingGame){
      for (var i = 0; i < $tappingGame._tapItems.length; i++) {
        $tappingGame._tapItems[i]._visible = false;
      }

      for (var i = 0; i < $tappingGame._tapItems.length; i++){
        $gameScreen.erasePicture($tappingGame._tapItems[i]._imgPictureId);
        $gameScreen.erasePicture($tappingGame._tapItems[i]._bubblePictureId);
      }
    }
};

Tapping_Game.prototype.resetTapping = function(){
    this._tapItemCount = 0;
    this._timeBeforeMoving = this._originalTimeBeforeMoving;
    this._timeBeforeMoving_Counter = 0;
    this._tapGoal = 10;
    this._hasWon = false;
    this._hasLost = false;
}

var calculateDailyReward = function(){
  // Daily Reward Switch ID
  var dailyRewardSwitchID = 100;

  // Declare new Date Object
  var dateObj = new Date();

  // if it is the same year
  if ($gameVariables.value(300) === dateObj.getFullYear()){
    // if it is the same month
    if ($gameVariables.value(299) === dateObj.getMonth()){
      // if it is the next day
      if ($gameVariables.value(298)+1 === dateObj.getDay()){
         $gameSwitches.setValue(dailyRewardSwitchID, true);
      }
    }
  // else if it is the next year year (used for new years day)
  }else if ($gameVariables.value(300)+1 === dateObj.getFullYear()){

  }

  $gameVariables.setValue(298, dateObj.getDay());
  $gameVariables.setValue(299, dateObj.getMonth());
  $gameVariables.setValue(300, dateObj.getFullYear());
}

var calculateAddedHearts = function(){
  var howManyMinutesForHeart = $gameVariables.value(22);

  // If Hearts < Max Hearts From Timer
  if ($gameVariables.value(21) < $gameVariables.value(23)){

    var heartsGained = 0;

    // Declare new Date Object
    var dateObj = new Date();

    // Store the Saved Time and The Current Time in Variables
    var savedMs = $gameVariables.value(151);
    var newMs = dateObj.getTime();

    // Calculate the remaining time left on the clock
    var savedClockMs = ((((howManyMinutesForHeart-1)-$gameVariables.value(2))*60)+(60-$gameVariables.value(1)))*1000

    // Calculate the amount of time that has passed (Ms);
    var timePassedMs = newMs - savedMs;

    // If the amount of time passed is greater than the remaining of time on the saved clock time...
    if (timePassedMs > savedClockMs){
      // Reset the Time Clock
      $gameVariables.setValue(1, 0); // (Seconds)
      $gameVariables.setValue(2, 0); // (Minutes)
//      console.log("Clock Set to 0");

      // Subtract the saved amount of time from the amount of time passed for later use.
      timePassedMs = timePassedMs - savedClockMs;

      // Add a heart
      heartsGained++;

      // Calculate how many minutes have passed after subtracted the remaining
      var minutesPassed = ((timePassedMs / 1000) / 60);
//      console.log("Minutes Passed: " + minutesPassed);

      // Add hearts from minutes passed
      var heartsGained = heartsGained + Math.floor(minutesPassed / howManyMinutesForHeart);
      $gameVariables.setValue(21, $gameVariables.value(21) + heartsGained);
//      console.log("Added hearts from time passed: " + heartsGained);
      
      // If hearts are greater than max hearts from Timer...
      if ($gameVariables.value(21) > $gameVariables.value(23)) {

        // Set hearts to max hearts from timer
        $gameVariables.setValue(21, $gameVariables.value(23));
      }
//      alert("Hearts Gained: " + heartsGained);

    }else{
//      alert("Time Passed: " + timePassedMs);
      // New Time Remaining in Milliseconds
      var newTimeForClockMs = savedClockMs - timePassedMs;

      // Calculate minutes remaining
      var clockMin = parseInt((savedClockMs / 900) / 60);

      // Calculate seconds remaining
      var clockSec = (savedClockMs / 900) % 60;

      // Set the Time Clock to the Correct Time
      $gameVariables.setValue(1, clockSec); // (Seconds)
      $gameVariables.setValue(2, clockMin); // (Minutes)
    }
  }

  //EXTRA: Add a rare item on the screen
  if (timePassedMs > 0){
    if (Math.floor((Math.random() * 40)+1) === 1){
      if (Math.floor((Math.random() * 2)+1) === 1){
        //Bottom
        if (Math.floor((Math.random() * 2)+1) === 1){
          var x = Math.floor((Math.random() * 90)+48);
          var y = Math.floor((Math.random() * 360)+692);
        }else{
          var x = Math.floor((Math.random() * 408)+100);
          var y = Math.floor((Math.random() * 260)+392);
        }
      }else{
        //Top
        var x = Math.floor((Math.random() * 200)+208);
        var y = Math.floor((Math.random() * 120)+108);
      }

/*
      $gameScreen.showPicture(97, "rare_01", 'center', x, y, 50, 50, 255, 0);
      $gameVariables.setValue(155, 0);
      $gameVariables.setValue(156, 300);
      $gameSwitches.setValue(172, true);
*/
    }
  }

}

var cute_monsters_setup = function(){
  var tapItems = [];

  return tapItems;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var setTapSelectionRange = function(setId){
  var args = [1, 2];
  var startIndex = 1;
  var endIndex = 101;

  if (setId === 1){
    startIndex = 1;
    endIndex = 20;
  }

  if (setId === 2){
    startIndex = 10;
    endIndex = 30;
  }

  args = [startIndex, endIndex];
  return args;
}

var setup_Tapping_Game = function(taps, mode, inputMode, endAfterTapGoal, tapGoal, timeLimit, maxItems, maxCoinItems, increaseTappingItemChance, tapScreenX, tapScreenY, tapScreenWidth, tapScreenHeight){
  var tapItems = [];
  var setName = taps[0];
  var setId = taps[1];
  var powerUp1_SwitchId = 91;
  var powerUp1_isActive = $gameSwitches.value(powerUp1_SwitchId);

  var powerUp2_SwitchId = 92;
  var powerUp2_isActive = $gameSwitches.value(powerUp2_SwitchId);

  var tap_startIndex = 1;
  var tap_endIndex = 101;

  var args = setTapSelectionRange(setId);
  tap_startIndex = args[0]; tap_endIndex = args[1];

//  $gameMap._interpreter.pluginCommand("filter_clear");
//  $gameMap._interpreter.pluginCommand("filter_effect", [":", 3]);

  if (taps){
    var tapCount = 5; // Default

    if (taps[2]){tapCount = taps[2];} // Added manually

    // **************** Cute Monsters ******************
    if (setName === "cute monsters"){
        // Override the above
        if (setId >= 1 && setId <= 10){
           tapCount = 4;
        }

        if (setId >= 11 && setId <= 15){
           tapCount = 5;
        }

        if (setId >= 16 && setId <= 20){
           tapCount = 5;
        }

        if (setId >= 21 && setId <= 25){
           tapCount = 4;
        }

        if (setId >= 26 && setId <= 30){
           tapCount = 4;
        }

       var numberOfPicked = tapCount;
       var randomNumbers = [];

       for (var i = tap_startIndex; i <= tap_endIndex; i++){
         randomNumbers.push(i);
       }

       for (var i = 1; i < numberOfPicked*2; i=i+2){

         // Get a random number using the length of the array
         var rndIndex = getRandomInt(1,randomNumbers.length)-1;
         var rndNum = randomNumbers[rndIndex];

         switch(rndNum) {
         case 1:
             tapItems.push(new Tap_Item("cute_monster_a(1)", "bubble001_114x196", "cute_monster_a(1)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 2:
             tapItems.push(new Tap_Item("cute_monster_a(2)", "bubble001_146x146", "cute_monster_a(2)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 3:
             tapItems.push(new Tap_Item("cute_monster_a(3)", "bubble001_178x178", "cute_monster_a(3)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 4:
             tapItems.push(new Tap_Item("cute_monster_a(4)", "bubble001_114x196", "cute_monster_a(4)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 5:
             tapItems.push(new Tap_Item("cute_monster_a(5)", "bubble001_178x178", "cute_monster_a(5)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 6:
             tapItems.push(new Tap_Item("cute_monster_a(6)", "bubble001_132x196", "cute_monster_a(6)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 7:
             tapItems.push(new Tap_Item("cute_monster_a(7)", "bubble001_178x178", "cute_monster_a(7)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 8:
             tapItems.push(new Tap_Item("cute_monster_a(8)", "bubble001_142x172", "cute_monster_a(8)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 9:
             tapItems.push(new Tap_Item("cute_monster_a(9)", "bubble001_178x178", "cute_monster_a(9)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 10:
             tapItems.push(new Tap_Item("cute_monster_a(10)", "bubble001_146x146", "cute_monster_a(10)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 11:
             tapItems.push(new Tap_Item("cute_monster_a(11)", "bubble001_114x196", "cute_monster_a(11)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 12:
             tapItems.push(new Tap_Item("cute_monster_a(12)", "bubble001_166x166", "cute_monster_a(12)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 13:
             tapItems.push(new Tap_Item("cute_monster_a(13)", "bubble001_178x178", "cute_monster_a(13)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 14:
             tapItems.push(new Tap_Item("cute_monster_a(14)", "bubble001_178x178", "cute_monster_a(14)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 15:
             tapItems.push(new Tap_Item("cute_monster_a(15)", "bubble001_166x166", "cute_monster_a(15)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 16:
             tapItems.push(new Tap_Item("cute_monster_a(16)", "bubble001_178x178", "cute_monster_a(16)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 17:
             tapItems.push(new Tap_Item("cute_monster_a(17)", "bubble001_132x196", "cute_monster_a(17)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 18:
             tapItems.push(new Tap_Item("cute_monster_a(18)", "bubble001_178x178", "cute_monster_a(18)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 19:
             tapItems.push(new Tap_Item("cute_monster_a(19)", "bubble001_178x178", "cute_monster_a(19)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 20:
             tapItems.push(new Tap_Item("cute_monster_a(20)", "bubble001_166x166", "cute_monster_a(20)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 21:
             tapItems.push(new Tap_Item("cute_monster_a(21)", "bubble001_114x196", "cute_monster_a(21)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 22:
             tapItems.push(new Tap_Item("cute_monster_a(22)", "bubble001_166x166", "cute_monster_a(22)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 23:
             tapItems.push(new Tap_Item("cute_monster_a(23)", "bubble001_178x178", "cute_monster_a(23)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 24:
             tapItems.push(new Tap_Item("cute_monster_a(24)", "bubble001_178x178", "cute_monster_a(24)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 25:
             tapItems.push(new Tap_Item("cute_monster_a(25)", "bubble001_178x178", "cute_monster_a(25)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 26:
             tapItems.push(new Tap_Item("cute_monster_a(26)", "bubble001_166x166", "cute_monster_a(26)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 27:
             tapItems.push(new Tap_Item("cute_monster_a(27)", "bubble001_114x196", "cute_monster_a(27)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 28:
             tapItems.push(new Tap_Item("cute_monster_a(28)", "bubble001_178x178", "cute_monster_a(28)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 29:
             tapItems.push(new Tap_Item("cute_monster_a(29)", "bubble001_146x146", "cute_monster_a(29)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 30:
             tapItems.push(new Tap_Item("cute_monster_a(30)", "bubble001_166x166", "cute_monster_a(30)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 31:
             tapItems.push(new Tap_Item("cute_monster_a(31)", "bubble001_178x178", "cute_monster_a(31)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 32:
             tapItems.push(new Tap_Item("cute_monster_a(32)", "bubble001_178x178", "cute_monster_a(32)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 33:
             tapItems.push(new Tap_Item("cute_monster_a(33)", "bubble001_178x178", "cute_monster_a(33)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 34:
             tapItems.push(new Tap_Item("cute_monster_a(34)", "bubble001_166x166", "cute_monster_a(34)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 35:
             tapItems.push(new Tap_Item("cute_monster_a(35)", "bubble001_166x166", "cute_monster_a(35)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 36:
             tapItems.push(new Tap_Item("cute_monster_a(36)", "bubble001_178x178", "cute_monster_a(36)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 37:
             tapItems.push(new Tap_Item("cute_monster_a(37)", "bubble001_178x178", "cute_monster_a(37)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 38:
             tapItems.push(new Tap_Item("cute_monster_a(38)", "bubble001_178x178", "cute_monster_a(38)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 39:
             tapItems.push(new Tap_Item("cute_monster_a(39)", "bubble001_178x178", "cute_monster_a(39)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 40:
             tapItems.push(new Tap_Item("cute_monster_a(40)", "bubble001_178x178", "cute_monster_a(40)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 41:
             tapItems.push(new Tap_Item("cute_monster_a(41)", "bubble001_178x178", "cute_monster_a(41)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 42:
             tapItems.push(new Tap_Item("cute_monster_a(42)", "bubble001_178x178", "cute_monster_a(42)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 43:
             tapItems.push(new Tap_Item("cute_monster_a(43)", "bubble001_166x166", "cute_monster_a(43)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 44:
             tapItems.push(new Tap_Item("cute_monster_a(44)", "bubble001_178x178", "cute_monster_a(44)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 45:
             tapItems.push(new Tap_Item("cute_monster_a(45)", "bubble001_166x166", "cute_monster_a(45)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 46:
             tapItems.push(new Tap_Item("cute_monster_a(46)", "bubble001_166x166", "cute_monster_a(46)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 47:
             tapItems.push(new Tap_Item("cute_monster_a(47)", "bubble001_189x189", "cute_monster_a(47)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 48:
             tapItems.push(new Tap_Item("cute_monster_a(48)", "bubble001_166x166", "cute_monster_a(48)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 49:
             tapItems.push(new Tap_Item("cute_monster_a(49)", "bubble001_178x178", "cute_monster_a(49)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 50:
             tapItems.push(new Tap_Item("cute_monster_a(50)", "bubble001_178x178", "cute_monster_a(50)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 51:
             tapItems.push(new Tap_Item("cute_monster_a(51)", "bubble001_178x178", "cute_monster_a(51)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 52:
             tapItems.push(new Tap_Item("cute_monster_a(52)", "bubble001_178x178", "cute_monster_a(52)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 53:
             tapItems.push(new Tap_Item("cute_monster_a(53)", "bubble001_178x178", "cute_monster_a(53)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 54:
             tapItems.push(new Tap_Item("cute_monster_a(54)", "bubble001_178x178", "cute_monster_a(54)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 55:
             tapItems.push(new Tap_Item("cute_monster_a(55)", "bubble001_189x189", "cute_monster_a(55)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 56:
             tapItems.push(new Tap_Item("cute_monster_a(56)", "bubble001_146x146", "cute_monster_a(56)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 57:
             tapItems.push(new Tap_Item("cute_monster_a(57)", "bubble001_178x178", "cute_monster_a(57)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 58:
             tapItems.push(new Tap_Item("cute_monster_a(58)", "bubble001_178x178", "cute_monster_a(58)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 59:
             tapItems.push(new Tap_Item("cute_monster_a(59)", "bubble001_189x189", "cute_monster_a(59)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 60:
             tapItems.push(new Tap_Item("cute_monster_a(60)", "bubble001_178x178", "cute_monster_a(60)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 61:
             tapItems.push(new Tap_Item("cute_monster_a(61)", "bubble001_178x178", "cute_monster_a(61)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 62:
             tapItems.push(new Tap_Item("cute_monster_a(62)", "bubble001_178x178", "cute_monster_a(62)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 63:
             tapItems.push(new Tap_Item("cute_monster_a(63)", "bubble001_178x178", "cute_monster_a(63)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 64:
             tapItems.push(new Tap_Item("cute_monster_a(64)", "bubble001_189x189", "cute_monster_a(64)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 65:
             tapItems.push(new Tap_Item("cute_monster_a(65)", "bubble001_146x146", "cute_monster_a(65)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 66:
             tapItems.push(new Tap_Item("cute_monster_a(66)", "bubble001_146x146", "cute_monster_a(66)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 67:
             tapItems.push(new Tap_Item("cute_monster_a(67)", "bubble001_166x166", "cute_monster_a(67)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 68:
             tapItems.push(new Tap_Item("cute_monster_a(68)", "bubble001_166x166", "cute_monster_a(68)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 69:
             tapItems.push(new Tap_Item("cute_monster_a(69)", "bubble001_166x166", "cute_monster_a(69)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 70:
             tapItems.push(new Tap_Item("cute_monster_a(70)", "bubble001_178x178", "cute_monster_a(70)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 71:
             tapItems.push(new Tap_Item("cute_monster_a(71)", "bubble001_178x178", "cute_monster_a(71)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 72:
             tapItems.push(new Tap_Item("cute_monster_a(72)", "bubble001_114x196", "cute_monster_a(72)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 73:
             tapItems.push(new Tap_Item("cute_monster_a(73)", "bubble001_132x196", "cute_monster_a(73)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 74:
             tapItems.push(new Tap_Item("cute_monster_a(74)", "bubble001_166x166", "cute_monster_a(74)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 75:
             tapItems.push(new Tap_Item("cute_monster_a(75)", "bubble001_144x186", "cute_monster_a(75)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 76:
             tapItems.push(new Tap_Item("cute_monster_a(76)", "bubble001_144x186", "cute_monster_a(76)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 77:
             tapItems.push(new Tap_Item("cute_monster_a(77)", "bubble001_146x146", "cute_monster_a(77)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 78:
             tapItems.push(new Tap_Item("cute_monster_a(78)", "bubble001_146x146", "cute_monster_a(78)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 79:
             tapItems.push(new Tap_Item("cute_monster_a(79)", "bubble001_146x146", "cute_monster_a(79)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 80:
             tapItems.push(new Tap_Item("cute_monster_a(80)", "bubble001_166x166", "cute_monster_a(80)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 81:
             tapItems.push(new Tap_Item("cute_monster_a(81)", "bubble001_178x178", "cute_monster_a(81)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 82:
             tapItems.push(new Tap_Item("cute_monster_a(82)", "bubble001_178x178", "cute_monster_a(82)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 83:
             tapItems.push(new Tap_Item("cute_monster_a(83)", "bubble001_166x166", "cute_monster_a(83)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 84:
             tapItems.push(new Tap_Item("cute_monster_a(84)", "bubble001_178x178", "cute_monster_a(84)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 85:
             tapItems.push(new Tap_Item("cute_monster_a(85)", "bubble001_178x178", "cute_monster_a(85)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 86:
             tapItems.push(new Tap_Item("cute_monster_a(86)", "bubble001_166x166", "cute_monster_a(86)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 87:
             tapItems.push(new Tap_Item("cute_monster_a(87)", "bubble001_166x166", "cute_monster_a(87)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 88:
             tapItems.push(new Tap_Item("cute_monster_a(88)", "bubble001_166x166", "cute_monster_a(88)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 89:
             tapItems.push(new Tap_Item("cute_monster_a(89)", "bubble001_166x166", "cute_monster_a(89)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 90:
             tapItems.push(new Tap_Item("cute_monster_a(90)", "bubble001_166x166", "cute_monster_a(90)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 91:
             tapItems.push(new Tap_Item("cute_monster_a(91)", "bubble001_166x166", "cute_monster_a(91)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 92:
             tapItems.push(new Tap_Item("cute_monster_a(92)", "bubble001_178x178", "cute_monster_a(92)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 93:
             tapItems.push(new Tap_Item("cute_monster_a(93)", "bubble001_166x166", "cute_monster_a(93)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 94:
             tapItems.push(new Tap_Item("cute_monster_a(94)", "bubble001_166x166", "cute_monster_a(94)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 95:
             tapItems.push(new Tap_Item("cute_monster_a(95)", "bubble001_166x166", "cute_monster_a(95)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 96:
             tapItems.push(new Tap_Item("cute_monster_a(96)", "bubble001_166x166", "cute_monster_a(96)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 97:
             tapItems.push(new Tap_Item("cute_monster_a(97)", "bubble001_166x166", "cute_monster_a(97)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 98:
             tapItems.push(new Tap_Item("cute_monster_a(98)", "bubble001_166x166", "cute_monster_a(98)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 99:
             tapItems.push(new Tap_Item("cute_monster_a(99)", "bubble001_166x166", "cute_monster_a(99)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 100:
             tapItems.push(new Tap_Item("cute_monster_a(100)", "bubble001_166x166", "cute_monster_a(100)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         case 101:
             tapItems.push(new Tap_Item("cute_monster_a(101)", "bubble001_166x166", "cute_monster_a(101)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, null));
             break;
         default:
             tapItems.push(new Tap_Item("blank", "bubble001_146x146", "cute_monster_a(1)", "blank", i, i+1, 1, 1, 0, 0, 0, 0, 2));
         }

         // Remove the number from the array
         randomNumbers.splice(rndIndex, 1);
     }

// ***** Add Specific Tap Items Per Level *****

     // Levels 6 through 9
     if (setId >= 6 && setId <= 9){
        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._scaleMaxX = 120;
        tapItems[tapItems.length-1]._scaleMaxY = 120;
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 180)+120);
        tapItems[tapItems.length-1]._animationNumber = 131;
//        tapItems[tapItems.length-1]._opacityAfterClicked = 0;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
//        tapItems[tapItems.length-1]._originalBubbleTint = [2, 1, 1, 1];

        tapItems[tapItems.length-1]._propertiesLocked = true;

     }

     // Level 10
     if (setId === 10){
        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 100)+100);
        tapItems[tapItems.length-1]._animationNumber = 131;
//        tapItems[tapItems.length-1]._opacityAfterClicked = 0;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;

        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 100)+100);
        tapItems[tapItems.length-1]._animationNumber = 131;
//        tapItems[tapItems.length-1]._opacityAfterClicked = 0;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;
     }

     // Levels 11 through 15
     if (setId >= 11 && setId <= 15){
       if (powerUp2_isActive){

       }else{
         i=i+2;
         tapItems.push(new Tap_Item("videogame_bomb_01", "bubble001_red_146x146","videogame_bomb_01","blank", i, i+1, 3));
         tapItems[tapItems.length-1]._scaleMaxX = 120;
         tapItems[tapItems.length-1]._scaleMaxY = 120;
         tapItems[tapItems.length-1]._scaleXRate = 1;
         tapItems[tapItems.length-1]._scaleYRate = 1;
         tapItems[tapItems.length-1]._animationNumber = 131;
         tapItems[tapItems.length-1]._scoreAnimationNumber = null;
         tapItems[tapItems.length-1]._propertiesLocked = true;
       }
     }

     // Levels 16 through 19
     if (setId >= 16 && setId <= 19){
        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._scaleMaxX = 120;
        tapItems[tapItems.length-1]._scaleMaxY = 120;
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 180)+120);
        tapItems[tapItems.length-1]._animationNumber = 131;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;

        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._scaleMaxX = 120;
        tapItems[tapItems.length-1]._scaleMaxY = 120;
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 180)+120);
        tapItems[tapItems.length-1]._animationNumber = 131;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;

        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._scaleMaxX = 120;
        tapItems[tapItems.length-1]._scaleMaxY = 120;
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 180)+120);
        tapItems[tapItems.length-1]._animationNumber = 131;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;
     }

// ********************************************


     // Level 20
     if (setId === 20){
        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._scaleMaxX = 140;
        tapItems[tapItems.length-1]._scaleMaxY = 140;
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 180)+120);
        tapItems[tapItems.length-1]._animationNumber = 131;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;

        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._scaleMaxX = 140;
        tapItems[tapItems.length-1]._scaleMaxY = 140;
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 180)+120);
        tapItems[tapItems.length-1]._animationNumber = 131;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;

        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._scaleMaxX = 140;
        tapItems[tapItems.length-1]._scaleMaxY = 140;
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 180)+120);
        tapItems[tapItems.length-1]._animationNumber = 131;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;

        i=i+2;
        tapItems.push(new Tap_Item("coin_01", "bubble001_106x106","coin_01","blank", i, i+1, 4, 0, 0, 1));
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 100)+2200);
        tapItems[tapItems.length-1]._originalTimeBeforeMoving = this._timeBeforeMoving;
        tapItems[tapItems.length-1]._timeBeforeMoving_Counter = this._timeBeforeMoving;
        tapItems[tapItems.length-1]._rotateSpeed = 3;
        tapItems[tapItems.length-1]._originalRotateSpeed = 3;
        tapItems[tapItems.length-1]._propertiesLocked = true;
     }

// ********************************************

     // Levels 21 through 25
     if (setId >= 21 && setId <= 25){
        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._scaleMaxX = 140;
        tapItems[tapItems.length-1]._scaleMaxY = 140;
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 180)+120);
        tapItems[tapItems.length-1]._animationNumber = 131;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;

        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._scaleMaxX = 140;
        tapItems[tapItems.length-1]._scaleMaxY = 140;
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 180)+120);
        tapItems[tapItems.length-1]._animationNumber = 131;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;

        if (powerUp2_isActive){

        }else{
          i=i+2;
          tapItems.push(new Tap_Item("videogame_bomb_01", "bubble001_red_146x146","videogame_bomb_01","blank", i, i+1, 3));
          tapItems[tapItems.length-1]._scaleMaxX = 100;
          tapItems[tapItems.length-1]._scaleMaxY = 100;
          tapItems[tapItems.length-1]._scaleXRate = 1;
          tapItems[tapItems.length-1]._scaleYRate = 1;
          tapItems[tapItems.length-1]._animationNumber = 131;
          tapItems[tapItems.length-1]._scoreAnimationNumber = null;
          tapItems[tapItems.length-1]._propertiesLocked = true;
        }

        i=i+2;
        tapItems.push(new Tap_Item("pixel_skull_01", "bubble001_red_100x100","pixel_red_skull_01","blank", i, i+1, 2, -1, 0, 0));
        tapItems[tapItems.length-1]._scaleMaxX = 140;
        tapItems[tapItems.length-1]._scaleMaxY = 140;
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 180)+120);
        tapItems[tapItems.length-1]._animationNumber = 131;
        tapItems[tapItems.length-1]._bubbleOpacityAfterClicked = 0;
        tapItems[tapItems.length-1]._scoreAnimationNumber = 135;
        tapItems[tapItems.length-1]._opacityAdjustmentAfterClicked = -10;
        tapItems[tapItems.length-1]._propertiesLocked = true;

        i=i+2;
        tapItems.push(new Tap_Item("coin_01", "bubble001_106x106","coin_01","blank", i, i+1, 4, 0, 0, 1));
        tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 100)+2200);
        tapItems[tapItems.length-1]._originalTimeBeforeMoving = this._timeBeforeMoving;
        tapItems[tapItems.length-1]._timeBeforeMoving_Counter = this._timeBeforeMoving;
        tapItems[tapItems.length-1]._rotateSpeed = 3;
        tapItems[tapItems.length-1]._originalRotateSpeed = 3;
        tapItems[tapItems.length-1]._propertiesLocked = true;
     }

// ***** Add Specific Tap Items Power Ups *****
      if (powerUp1_isActive){
           i=i+2;
           tapItems.push(new Tap_Item("powerup_01", "bubble001_256x256","powerup_01","blank", i, i+1, "none", 0, 0, 0, null, null, null, true, 6, 6, true, 6, 6));
           tapItems[tapItems.length-1]._commonEventId = 180;
           tapItems[tapItems.length-1]._commonEventActiveSwitchId = 120;
           tapItems[tapItems.length-1]._bubbleOpacity = 10;
           tapItems[tapItems.length-1]._propertiesLocked = true;

           $gameSwitches.setValue(powerUp1_SwitchId, false);
      }
// ********************************************

// **************** Add Coins *****************
      i=i+2;
      tapItems.push(new Tap_Item("coin_01", "bubble001_106x106","coin_01","blank", i, i+1, 5, 1, 0, 1));
      tapItems[tapItems.length-1]._timeBeforeMoving = Math.floor((Math.random() * 1000)+2200);
      tapItems[tapItems.length-1]._originalTimeBeforeMoving = this._timeBeforeMoving;
      tapItems[tapItems.length-1]._timeBeforeMoving_Counter = this._timeBeforeMoving;
      tapItems[tapItems.length-1]._rotateSpeed = 3;
      tapItems[tapItems.length-1]._originalRotateSpeed = 3;
      tapItems[tapItems.length-1]._reverseXSpeedAfterCount = 0;
      tapItems[tapItems.length-1]._propertiesLocked = true;
// ********************************************

// *************  Coin Bonus  *****************
   }else if (setName === "coin bonus"){
       var numberOfPicked = tapCount;
       var randomNumbers = [];

       for (var i = tap_startIndex; i <= tap_endIndex; i++){
         randomNumbers.push(i);
       }

       for (var i = 1; i < numberOfPicked*2; i=i+2){

         // Get a random number using the length of the array
         var rndIndex = getRandomInt(1,randomNumbers.length)-1;
         var rndNum = randomNumbers[rndIndex];

         switch(rndNum) {
         case 1:

             break;
         default:

         }

         // Remove the number from the array
         randomNumbers.splice(rndIndex, 1);
     }

// ***** Add Specific Tap Items Per Level *****

     // Bonus Level 1
     if (setId === 1){
        for (var j = 1; j <= 22; j++){
              i=i+2;
              var coinTapItem = new Tap_Item("coin_01", "bubble001_106x106","coin_01","blank", i, i+1, 5, 1, 0, 1);
              coinTapItem._timeBeforeMoving = Math.floor((Math.random() * 1000)+1200);
              coinTapItem._originalTimeBeforeMoving = this._timeBeforeMoving;
              coinTapItem._timeBeforeMoving_Counter = this._timeBeforeMoving;
              var r = Math.floor((Math.random() * 2)+1);
              if (r > 1){
                coinTapItem._moveSpeedX = Math.floor((Math.random() * 1)+1);
              }else{
                coinTapItem._moveSpeedX = Math.floor((Math.random() * -1)-1);
              }
              r = Math.floor((Math.random() * -2)-2);
              coinTapItem._moveSpeedY = r;
              coinTapItem._originalMoveSpeedX = coinTapItem._moveSpeedX;
              coinTapItem._originalMoveSpeedY = coinTapItem._moveSpeedY;
              coinTapItem._scaleXRate = Math.floor((Math.random() * 8)+3);
              coinTapItem._scaleYRate = Math.floor((Math.random() * 8)+3);
              var scaleMax = Math.floor((Math.random() * 220)+200);
              this._scaleMaxX = scaleMax;
              this._scaleMaxY = scaleMax;
              coinTapItem._reverseXSpeedAfterCount = Math.floor((Math.random() * 520)+20);
              coinTapItem._propertiesLocked = true;
              tapItems.push(coinTapItem);
        }

     }

   }else{ // No Set defined use parameters instead
     var tapItems = taps;
   }
  }

  if (!maxItems){maxItems = tapItems.length-1;}
  if (!maxCoinItems){maxCoinItems = tapItems.length-1;}
  $tappingGame = new Tapping_Game(tapItems, mode, inputMode, endAfterTapGoal, tapGoal, timeLimit, maxItems, maxCoinItems, increaseTappingItemChance, tapScreenX, tapScreenY, tapScreenWidth, tapScreenHeight);

  setupLevel(setName, setId);
};

//*****************************************
//             Setup Level
// Set Tapping System and Each Tap Item Properties
//*****************************************
var setupLevel = function(setName, setId){
  if (setName === "cute monsters"){
    // *************** Level 1 ****************
    if (setId === 1){
      // Tapping System
      $tappingGame._inputMode = "swipe";
      $tappingGame._tapScreenX = 100;
      $tappingGame._tapScreenY = 240;
      $tappingGame._tapScreenWidth = 360;
      $tappingGame._tapScreenHeight = 800;
      $tappingGame._endAfterTapGoal = true;
      $tappingGame._mode = "pop in time";
      $tappingGame._tapGoal = 30;
      $tappingGame._timeLimit = 60;
      $tappingGame._negativeStrikeMax = null;
  
      // Each Tap Item
      for (var i = 0; i < $tappingGame._tapItems.length; i++) {
         var tapItem = $tappingGame._tapItems[i];
         if (tapItem._propertiesLocked != true){
           tapItem._timeBeforeMoving = Math.floor((Math.random() * 100)+200);
           tapItem._scaleX = 20; tapItem._originalScaleX = tapItem._scaleX;
           tapItem._scaleY = 20; tapItem._originalScaleY = tapItem._scaleY;
           tapItem._scaleMaxX = 80;
           tapItem._scaleMaxY = 80;
           tapItem._soundWhenClicked = {name:"bop01",volume:50,pan:0,pitch:-1};
           tapItem._shownAt = 25;
           tapItem._moveSpeedX =  0; tapItem._originalMoveSpeedX = tapItem._moveSpeedX;
           tapItem._moveSpeedY =  -2; tapItem._originalMoveSpeedY = tapItem._moveSpeedY;
           tapItem._returnOriginalSpeedX = true;
           tapItem._returnOriginalSpeedY = true;
           tapItem._reverseXSpeedAfterCount = 0;//Math.floor((Math.random() * 170)+40);
           tapItem._reverseYSpeedAfterCount = 0;
           tapItem._reverseXSpeedAfterCount_Index = 0;
           tapItem._reverseYSpeedAfterCount_Index = 0;
           tapItem._reverseXSpeedAfterCount_AfterTap = true;
           tapItem._reverseYSpeedAfterCount_AfterTap = true;
           tapItem._exactXSpeedAfterCount_AfterTap = 0;
           tapItem._exactYSpeedAfterCount_AfterTap = 2;
           tapItem._waitToShow = 500;
           tapItem._rotateSpeed = 0;
           tapItem._originalRotateSpeed = tapItem._rotateSpeed;
           tapItem._rotateBubbleSpeed = 0;
           tapItem._originalRotateBubbleSpeed = tapItem._rotateBubbleSpeed;
           tapItem._rotateSpeedAfterClicked = 10;
           tapItem._rotateBubbleSpeedAfterClicked = 0;
           tapItem._originalAngle = 0;
           tapItem._animationNumber = 4;
           tapItem._releasedAnimationNumber = 5;
           tapItem._scoreAnimationNumber = 134;
           tapItem._opacityAfterClicked = 255;
           tapItem._bubbleOpacityAfterClicked = 200;
           tapItem._opacityAdjustmentAfterClicked = -6;
           tapItem._imgOpacity = 255;
           tapItem._bubbleOpacity = 200;
           tapItem._wallBounceActiveX = true;
           tapItem._wallBounceActiveY = true;
           tapItem._scaleXRate = 2;
           tapItem._scaleYRate = 2;
  //       tapItem._timeAdjustment = 0;
  //       tapItem._scoreAdjustment = 0;
  //       tapItem._coinAdjustment = adjustmentCoin;
  //       tapItem._effect = "breathe";
  //       tapItem._anim = anim;
  //       tapItem._frames = frameNum;
  //       tapItem._animSpeed = animSpeed;
  //       tapItem._animAfter = animAfter;
  //       tapItem._framesAfter = frameNumAfter;
  //       tapItem._animSpeedAfter =  animSpeedAfter;

  //       tapItem._gainActor = gainActor;
  //       tapItem._gainItem = gainItem;
  //       tapItem._quantityGained = quantityGained;
  //       tapItem._commonEventId = commonEventId;
  //       tapItem._commonEventActiveSwitchId = commonEventActiveSwitchId;
         }
      }
    }
  //*****************************************
  
  // *************** Level 2 ****************
    if (setId === 2){
      // Tapping System
      $tappingGame._inputMode = "swipe";
      $tappingGame._tapScreenX = 40;
      $tappingGame._tapScreenY = 420;
      $tappingGame._tapScreenWidth = 500;
      $tappingGame._tapScreenHeight = 840;
      $tappingGame._endAfterTapGoal = true;
      $tappingGame._mode = "pop in time";
      $tappingGame._tapGoal = 45;
      $tappingGame._timeLimit = 60;
      $tappingGame._negativeStrikeMax = null;
  //    $tappingGame._timeBeforeMoving = Math.floor((Math.random() * 250)+50);
  
      // Each Tap Item
      for (var i = 0; i < $tappingGame._tapItems.length; i++) {
         var tapItem = $tappingGame._tapItems[i];
         if (tapItem._propertiesLocked != true){
           tapItem._timeBeforeMoving = Math.floor((Math.random() * 100)+200);
           tapItem._scaleX = 20; tapItem._originalScaleX = tapItem._scaleX;
           tapItem._scaleY = 20; tapItem._originalScaleY = tapItem._scaleY;
           tapItem._scaleMaxX = 80;
           tapItem._scaleMaxY = 80;
           tapItem._soundWhenClicked = {name:"bop01",volume:50,pan:0,pitch:-1};
           tapItem._shownAt = 25;
           tapItem._moveSpeedX =  1; tapItem._originalMoveSpeedX = tapItem._moveSpeedX;
           tapItem._moveSpeedY =  -3; tapItem._originalMoveSpeedY = tapItem._moveSpeedY;
           tapItem._returnOriginalSpeedX = true;
           tapItem._returnOriginalSpeedY = true;
           tapItem._reverseXSpeedAfterCount = Math.floor((Math.random() * 100)+40);
           tapItem._reverseYSpeedAfterCount = 0;
           tapItem._reverseXSpeedAfterCount_Index = 0;
           tapItem._reverseYSpeedAfterCount_Index = 0;
           tapItem._reverseXSpeedAfterCount_AfterTap = true;
           tapItem._reverseYSpeedAfterCount_AfterTap = true;
           tapItem._exactXSpeedAfterCount_AfterTap = 0;
           tapItem._exactYSpeedAfterCount_AfterTap = 2;
           tapItem._waitToShow = 500;
           tapItem._rotateSpeed = 0;
           tapItem._originalRotateSpeed = tapItem._rotateSpeed;
           tapItem._rotateBubbleSpeed = 0;
           tapItem._originalRotateBubbleSpeed = tapItem._rotateBubbleSpeed;
           tapItem._rotateSpeedAfterClicked = 10;
           tapItem._rotateBubbleSpeedAfterClicked = 0;
           tapItem._originalAngle = 0;
           tapItem._animationNumber = 4;
           tapItem._releasedAnimationNumber = 5;
           tapItem._scoreAnimationNumber = 134;
           tapItem._opacityAfterClicked = 255;
           tapItem._bubbleOpacityAfterClicked = 200;
           tapItem._opacityAdjustmentAfterClicked = -6;
           tapItem._imgOpacity = 255;
           tapItem._bubbleOpacity = 200;
           tapItem._wallBounceActiveX = true;
           tapItem._wallBounceActiveY = true;
           tapItem._scaleXRate = 2;
           tapItem._scaleYRate = 2;
         }
      }
    }
  //*****************************************
  
  // *************** Level 3 ****************
    if (setId === 3){
      // Tapping System
      $tappingGame._inputMode = "swipe";
      $tappingGame._tapScreenX = 100;
      $tappingGame._tapScreenY = 240;
      $tappingGame._tapScreenWidth = 360;
      $tappingGame._tapScreenHeight = 800;
      $tappingGame._endAfterTapGoal = true;
      $tappingGame._mode = "pop in time";
      $tappingGame._tapGoal = 30;
      $tappingGame._timeLimit = 60;
      $tappingGame._negativeStrikeMax = null;
  
      // Each Tap Item
      for (var i = 0; i < $tappingGame._tapItems.length; i++) {
         var tapItem = $tappingGame._tapItems[i];
         if (tapItem._propertiesLocked != true){
           tapItem._timeBeforeMoving = Math.floor((Math.random() * 100)+200);
           tapItem._scaleX = 20; tapItem._originalScaleX = tapItem._scaleX;
           tapItem._scaleY = 20; tapItem._originalScaleY = tapItem._scaleY;
           tapItem._scaleMaxX = 80;
           tapItem._scaleMaxY = 80;
           tapItem._soundWhenClicked = {name:"bop01",volume:50,pan:0,pitch:-1};
           tapItem._shownAt = 25;
           tapItem._moveSpeedX =  2; tapItem._originalMoveSpeedX = tapItem._moveSpeedX;
           tapItem._moveSpeedY =  2; tapItem._originalMoveSpeedY = tapItem._moveSpeedY;
           tapItem._returnOriginalSpeedX = true;
           tapItem._returnOriginalSpeedY = true;
           tapItem._reverseXSpeedAfterCount = Math.floor((Math.random() * 170)+40);
           tapItem._reverseYSpeedAfterCount = 0;
           tapItem._reverseXSpeedAfterCount_Index = 0;
           tapItem._reverseYSpeedAfterCount_Index = 0;
           tapItem._reverseXSpeedAfterCount_AfterTap = true;
           tapItem._reverseYSpeedAfterCount_AfterTap = true;
           tapItem._exactXSpeedAfterCount_AfterTap = 0;
           tapItem._exactYSpeedAfterCount_AfterTap = .5;
           tapItem._waitToShow = 360;
           tapItem._rotateSpeed = 0;
           tapItem._originalRotateSpeed = tapItem._rotateSpeed;
           tapItem._rotateBubbleSpeed = 0;
           tapItem._originalRotateBubbleSpeed = tapItem._rotateBubbleSpeed;
           tapItem._rotateSpeedAfterClicked = 10;
           tapItem._rotateBubbleSpeedAfterClicked = 0;
           tapItem._originalAngle = 0;
           tapItem._animationNumber = 4;
           tapItem._releasedAnimationNumber = 5;
           tapItem._scoreAnimationNumber = 134;
           tapItem._opacityAfterClicked = 255;
           tapItem._bubbleOpacityAfterClicked = 200;
           tapItem._opacityAdjustmentAfterClicked = -6;
           tapItem._imgOpacity = 255;
           tapItem._bubbleOpacity = 200;
           tapItem._wallBounceActiveX = true;
           tapItem._wallBounceActiveY = true;
           tapItem._scaleXRate = 2;
           tapItem._scaleYRate = 2;
         }
      }
    }
  //*****************************************
  
  // *************** Level 4 ****************
    if (setId === 4){
      $tappingGame._inputMode = "swipe";
      $tappingGame._tapScreenX = 100;
      $tappingGame._tapScreenY = 240;
      $tappingGame._tapScreenWidth = 360;
      $tappingGame._tapScreenHeight = 800;
      $tappingGame._endAfterTapGoal = true;
      $tappingGame._mode = "pop in time";
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
  
      for (var i = 0; i < $tappingGame._tapItems.length; i++) {
        var tapItem = $tappingGame._tapItems[i]
  
      }
    }
    
  // *************** Level 5 ****************
    if (setId === 5){
      // Tapping System
      $tappingGame._inputMode = "swipe";
      $tappingGame._tapScreenX = 100;
      $tappingGame._tapScreenY = 240;
      $tappingGame._tapScreenWidth = 360;
      $tappingGame._tapScreenHeight = 800;
      $tappingGame._endAfterTapGoal = true;
      $tappingGame._mode = "pop in time";
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 75;
      $tappingGame._negativeStrikeMax = null;
  
      // Each Tap Item
      for (var i = 0; i < $tappingGame._tapItems.length; i++) {
         var tapItem = $tappingGame._tapItems[i];
         if (tapItem._propertiesLocked != true){
           tapItem._timeBeforeMoving = Math.floor((Math.random() * 80)+160);
           tapItem._scaleX = 30; tapItem._originalScaleX = tapItem._scaleX;
           tapItem._scaleY = 30; tapItem._originalScaleY = tapItem._scaleY;
           tapItem._scaleMaxX = 100;
           tapItem._scaleMaxY = 100;
           tapItem._soundWhenClicked = {name:"bop01",volume:50,pan:0,pitch:-1};
           tapItem._shownAt = 15;
           tapItem._moveSpeedX =  2; tapItem._originalMoveSpeedX = tapItem._moveSpeedX;
           tapItem._moveSpeedY =  -1; tapItem._originalMoveSpeedY = tapItem._moveSpeedY;
           tapItem._returnOriginalSpeedX = true;
           tapItem._returnOriginalSpeedY = true;
           tapItem._reverseXSpeedAfterCount = Math.floor((Math.random() * 170)+40);
           tapItem._reverseYSpeedAfterCount = 0;
           tapItem._reverseXSpeedAfterCount_Index = 0;
           tapItem._reverseYSpeedAfterCount_Index = 0;
           tapItem._reverseXSpeedAfterCount_AfterTap = true;
           tapItem._reverseYSpeedAfterCount_AfterTap = true;
           tapItem._exactXSpeedAfterCount_AfterTap = 0;
           tapItem._exactYSpeedAfterCount_AfterTap = .5;
           tapItem._waitToShow = 300;
           tapItem._rotateSpeed = 0;
           tapItem._originalRotateSpeed = tapItem._rotateSpeed;
           tapItem._rotateBubbleSpeed = 0;
           tapItem._originalRotateBubbleSpeed = tapItem._rotateBubbleSpeed;
           tapItem._rotateSpeedAfterClicked = 10;
           tapItem._rotateBubbleSpeedAfterClicked = 0;
           tapItem._originalAngle = 0;
           tapItem._animationNumber = 4;
           tapItem._releasedAnimationNumber = 5;
           tapItem._scoreAnimationNumber = 134;
           tapItem._opacityAfterClicked = 255;
           tapItem._bubbleOpacityAfterClicked = 200;
           tapItem._opacityAdjustmentAfterClicked = -6;
           tapItem._imgOpacity = 255;
           tapItem._bubbleOpacity = 200;
           tapItem._wallBounceActiveX = true;
           tapItem._wallBounceActiveY = false;
           tapItem._scaleXRate = 4;
           tapItem._scaleYRate = 4;
         }
      }
    }
  
    if (setId === 6){
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
      
      // Each Tap Item
      for (var i = 0; i < $tappingGame._tapItems.length; i++) {
       var tapItem = $tappingGame._tapItems[i];
        if (tapItem._propertiesLocked != true){
          tapItem._moveSpeedX =  2; tapItem._originalMoveSpeedX = tapItem._moveSpeedX;
          tapItem._moveSpeedY =  -1; tapItem._originalMoveSpeedY = tapItem._moveSpeedY;
          tapItem._returnOriginalSpeedX = true;
          tapItem._returnOriginalSpeedY = true;
          tapItem._reverseXSpeedAfterCount = Math.floor((Math.random() * 100)+40);
          tapItem._reverseYSpeedAfterCount = 0;
          tapItem._reverseXSpeedAfterCount_Index = 0;
          tapItem._reverseYSpeedAfterCount_Index = 0;
          tapItem._reverseXSpeedAfterCount_AfterTap = true;
          tapItem._reverseYSpeedAfterCount_AfterTap = true;
          tapItem._exactXSpeedAfterCount_AfterTap = 0;
          tapItem._exactYSpeedAfterCount_AfterTap = .5;
        }
      }
    }
  
    if (setId === 7){
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
    }
  
    if (setId === 8){
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
    }
  
    if (setId === 9){
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
    }
  
    if (setId === 10){
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
    }
  
    if (setId === 11){
      $tappingGame._tapGoal = 60;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 12){
      $tappingGame._tapGoal = 60;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 13){
      $tappingGame._tapGoal = 60;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 14){
      $tappingGame._tapGoal = 60;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 15){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 16){
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
    }
  
    if (setId === 17){
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
    }
  
    if (setId === 18){
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
    }
  
    if (setId === 19){
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
    }
  
    if (setId === 20){
      $tappingGame._tapGoal = 50;
      $tappingGame._timeLimit = 60;
    }
  
    if (setId === 21){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 22){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 23){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
    
    if (setId === 24){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 25){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 26){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 27){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
    
    if (setId === 28){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 29){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
  
    if (setId === 30){
      $tappingGame._tapGoal = 75;
      $tappingGame._timeLimit = 90;
    }
  //*****************************************
  }
  
  if (setName === "coin bonus"){
    if (setId === 1){
      $tappingGame._tapGoal = 1;
      $tappingGame._timeLimit = 15;
      $tappingGame._endAfterTapGoal = false;
    }
  }
}

//***************************************************************************************************************************************
var startTapTimer = function(){
  if ($tappingGame){
    if ($tappingGame._timeLimit){
      if ($tappingGame._timeLimit > 0){
        $gameTimer.start(($tappingGame._timeLimit*60)+60);
      }
    }
  }else{
    $gameTimer.start(6);
  }
}

var batchSetTapItems = function(timeBeforeMoving, moveSpeedX, moveSpeedY, returnOriginalSpeedX, returnOriginalSpeedY, reverseXSpeedAfterCount, reverseYSpeedAfterCount,
                     reverseXSpeedAfterCount_AfterTap, reverseYSpeedAfterCount_AfterTap, exactXSpeedAfterCount_AfterTap, exactYSpeedAfterCount_AfterTap, waitToShow,
                     rotateSpeed, rotateSpeedAfterClicked, originalAngle, animationNumber, releasedAnimationNumber, opacityAfterClicked, opacityAdjustmentAfterClicked,
                     imgOpacity, bubbleOpacity){
if ($tappingGame){
  for (var i = 0; i < $tappingGame._tapItems.length; i++) {
    var tapItem = $tappingGame._tapItems[i];
    tapItem._timeBeforeMoving = timeBeforeMoving;
    tapItem._timeBeforeMoving_Counter = 0;
    tapItem._moveSpeedX = moveSpeedX;
    tapItem._moveSpeedY = moveSpeedY;
    tapItem._originalMoveSpeedX = tapItem._moveSpeedX;
    tapItem._originalMoveSpeedY = tapItem._moveSpeedY;
    tapItem._returnOriginalSpeedX = returnOriginalSpeedX;
    tapItem._returnOriginalSpeedY = returnOriginalSpeedY;
    tapItem._reverseXSpeedAfterCount = reverseXSpeedAfterCount;
    tapItem._reverseYSpeedAfterCount = reverseYSpeedAfterCount;
    tapItem._reverseXSpeedAfterCount_Index = 0;
    tapItem._reverseYSpeedAfterCount_Index = 0;
    tapItem._reverseXSpeedAfterCount_AfterTap = reverseXSpeedAfterCount_AfterTap;
    tapItem._reverseYSpeedAfterCount_AfterTap = reverseYSpeedAfterCount_AfterTap;
    tapItem._exactXSpeedAfterCount_AfterTap = exactXSpeedAfterCount_AfterTap;
    tapItem._exactYSpeedAfterCount_AfterTap = exactYSpeedAfterCount_AfterTap;
    tapItem._waitToShow = waitToShow;
    tapItem._waitToShow_Index = 0;
//    tapItem._waiting = false;
var rotateBubbleSpeed = 2;
var rotateBubbleSpeedAfterClicked = 2;
   tapItem._rotateSpeed = rotateSpeed;
   tapItem._originalRotateSpeed = tapItem._rotateSpeed;
   tapItem._rotateBubbleSpeed = rotateBubbleSpeed;
   tapItem._originalRotateBubbleSpeed = tapItem._rotateBubbleSpeed;
   tapItem._rotateSpeedAfterClicked = rotateSpeedAfterClicked;
   tapItem._rotateBubbleSpeedAfterClicked = rotateBubbleSpeedAfterClicked || rotateSpeedAfterClicked;
   tapItem._originalAngle = originalAngle;
   tapItem._animationNumber = animationNumber;
   tapItem._releasedAnimationNumber = releasedAnimationNumber;
   tapItem._opacityAfterClicked = opacityAfterClicked;
   tapItem._opacityAdjustmentAfterClicked = opacityAdjustmentAfterClicked;
   tapItem._imgOpacity = imgOpacity;
   tapItem._bubbleOpacity = bubbleOpacity;
  }
}
}

var start_Tapping = function(){
  if ($tappingGame){
    $tappingGame.showTapItem($tappingGame._tapItems[0]);
  }
};

var tappingGame_checkInput = function(){
if ($tappingGame){
  for (var i = 0; i < $tappingGame._tapItems.length; i++) {
    var tapItem = $tappingGame._tapItems[i]
    if (tapItem._waiting === false){
      if (tapItem._visible === true){
        var halfWidth = ($gameScreen.picture(tapItem._bubblePictureId)._width*($gameScreen.picture(tapItem._bubblePictureId)._scaleX/100))/2;
        var halfHeight = ($gameScreen.picture(tapItem._bubblePictureId)._height*($gameScreen.picture(tapItem._bubblePictureId)._scaleY/100))/2;

        var bubblePic = $gameScreen.picture(tapItem._bubblePictureId);
        if (TouchInput._x > (bubblePic._x - halfWidth) - ($tappingGame._touchAreaX/2) && TouchInput._x < (bubblePic._x + halfWidth) + ($tappingGame._touchAreaX / 2)) {
          if (TouchInput._y > (bubblePic._y - halfHeight) - ($tappingGame._touchAreaY/2) && TouchInput._y < (bubblePic._y + halfHeight) + ($tappingGame._touchAreaY / 2)) {
             if (tapItem._reverseXSpeedAfterCount_AfterTap){
               tapItem._moveSpeedX = -tapItem._moveSpeedX;
             }

             if (tapItem._reverseYSpeedAfterCount_AfterTap){
               tapItem._moveSpeedY = -tapItem._moveSpeedY;
             }
             
             if (tapItem._exactXSpeedAfterCount_AfterTap){
               tapItem._moveSpeedX = tapItem._exactXSpeedAfterCount_AfterTap;
             }
             
             if (tapItem._exactYSpeedAfterCount_AfterTap){
               tapItem._moveSpeedY = tapItem._exactYSpeedAfterCount_AfterTap;
             }

             $gameScreen.picture(tapItem._imgPictureId)._opacity = tapItem._opacityAfterClicked;
             $gameScreen.picture(tapItem._bubblePictureId)._opacity = tapItem._bubbleOpacityAfterClicked;

             if (tapItem._animAfter === true){
                var frm = Math.min(Math.max(tapItem._framesAfter,1),999);
                var speed = tapItem._animSpeedAfter;
                $gameScreen.picture(tapItem._imgPictureId)._animeData = [true,frm,9999,0,speed];
             }

             $gameSwitches.setValue(66, true);
             $gameVariables.setValue(140, i);
             break;
          }
        }
      }
    }
  }
}  
}

var tappingGame_checkInput_tapZone = function(){
  for (var i = 0; i < $tappingGame._tapItems.length; i++) {
    var tapItem = $tappingGame._tapItems[i]
    if (tapItem._waiting === false){
      if (tapItem._visible === true){
        var halfWidth = ($gameScreen.picture(tapItem._bubblePictureId)._width*($gameScreen.picture(tapItem._bubblePictureId)._scaleX/100))/2;
        var halfHeight = ($gameScreen.picture(tapItem._bubblePictureId)._height*($gameScreen.picture(tapItem._bubblePictureId)._scaleY/100))/2;

        if (TouchInput._x > $gameScreen.picture(tapItem._bubblePictureId)._x-(halfWidth) && TouchInput._x < $gameScreen.picture(tapItem._bubblePictureId)._x+(halfWidth)) {
          if (TouchInput._y > $gameScreen.picture(tapItem._bubblePictureId)._y-(halfHeight) && TouchInput._y < $gameScreen.picture(tapItem._bubblePictureId)._y+(halfHeight)) {
             if (tapItem._reverseXSpeedAfterCount_AfterTap){
               tapItem._moveSpeedX = -tapItem._moveSpeedX;
             }

             if (tapItem._reverseYSpeedAfterCount_AfterTap){
               tapItem._moveSpeedY = -tapItem._moveSpeedY;
             }
             
             if (tapItem._exactXSpeedAfterCount_AfterTap){
               tapItem._moveSpeedX = tapItem._exactXSpeedAfterCount_AfterTap;
             }
             
             if (tapItem._exactYSpeedAfterCount_AfterTap){
               tapItem._moveSpeedY = tapItem._exactYSpeedAfterCount_AfterTap;
             }

             $gameScreen.picture(tapItem._imgPictureId)._opacity = tapItem._opacityAfterClicked;
             $gameScreen.picture(tapItem._bubblePictureId)._opacity = tapItem._bubbleOpacityAfterClicked;
             $gameSwitches.setValue(66, true);
             $gameVariables.setValue(140, i);
          }
        }
      }
    }
  }
}

/* SceneManager.terminate = function() {
    var dateObj = new Date();
    $gameVariables.setValue(151, dateObj.getTime());
    alert("Saving Game, Time = " + $gameVariables.value(151));

    $gameSystem.onBeforeSave();
    DataManager.saveGame(1);
    window.close();
};

SceneManager.exit = function() {
    var dateObj = new Date();
    $gameVariables.setValue(151, dateObj.getTime());
    alert("Saving Game, Time = " + $gameVariables.value(151));

    $gameSystem.onBeforeSave();
    DataManager.saveGame(1);

    this.goto(null);
    this._exiting = true;
}; */

var showResults = function(stageNum){
  switch (stageNum){
//                    star1, star2, star3, firstWin, advance, minusBubbles
    case  1: results(  121,   122,   123,    161,      171,        5); break;
    case  2: results(  124,   125,   126,    162,      171,        5); break;
    case  3: results(  127,   128,   129,    163,      171,        5); break;
    case  4: results(  130,   131,   132,    164,      171,        5); break;
    case  5: results(  133,   134,   135,    165,      171,        5); break;
    case  6: results(  136,   137,   138,    166,      171,        5, "skulls"); break;
    case  7: results(  147,   148,   149,    167,      171,        5, "skulls"); break;
    case  8: results(  150,   151,   152,    168,      171,        5, "skulls"); break;
    case  9: results(  153,   154,   155,    169,      171,        5, "skulls"); break;
    case 10: results(  156,   157,   158,    170,      171,        5, "skulls"); break;
    case 11: results(  174,   175,   176,    173,      171,        14); break;
    case 12: results(  177,   178,   179,    181,      171,        14); break;
    case 13: results(  221,   222,   223,    224,      171,        14); break;
    case 14: results(  225,   226,   227,    228,      171,        14); break;
    case 15: results(  229,   230,   231,    232,      171,        14); break;
    case 16: results(  233,   234,   235,    236,      171,        5, "skulls"); break;
    case 17: results(  237,   238,   239,    240,      171,        5, "skulls"); break;
    case 18: results(  241,   242,   243,    244,      171,        5, "skulls"); break;
    case 19: results(  245,   246,   247,    248,      171,        5, "skulls"); break;
    case 20: results(  249,   250,   251,    252,      171,        5, "skulls"); break;
    case 21: results(  253,   254,   255,    256,      171,        12); break;
    case 22: results(  257,   258,   259,    260,      171,        12); break;
    case 23: results(  261,   262,   263,    264,      171,        12); break;
    case 24: results(  265,   266,   267,    268,      171,        12); break;
    case 25: results(  269,   270,   271,    272,      171,        12); break;
    case 26: results(  273,   274,   275,    276,      171,        17); break;
    case 27: results(  277,   278,   279,    280,      171,        17); break;
    case 28: results(  321,   322,   323,    324,      171,        17); break;
    case 29: results(  325,   326,   327,    328,      171,        17); break;
    case 30: results(  329,   330,   331,    332,      171,        17); break;
    case 31: results(  333,   334,   335,    336,      171,        17); break;
    case 32: results(  337,   338,   339,    340,      171,        17); break;
    case 33: results(  341,   342,   343,    344,      171,        17); break;
    case 34: results(  345,   346,   347,    348,      171,        17); break;
    case 35: results(  349,   350,   351,    352,      171,        17); break;
    case 36: results(  353,   354,   355,    356,      171,        17); break;
    case 37: results(  357,   358,   359,    360,      171,        17); break;
    case 38: results(  361,   362,   363,    364,      171,        17); break;
    case 39: results(  365,   366,   367,    368,      171,        17); break;
    case 40: results(  369,   370,   371,    372,      171,        17); break;
    default:
    break;
  }
}

var results = function(star1_SwitchId, star2_SwitchId, star3_SwitchId, firstWin_SwitchID, advance_SwitchID, minusBubbles, resultType){
     var bubblesReleasedVarId = 124;
     var numberTappedVarId = 139;
     var negativeTappedVarId = 160;

     var minusBubbles = minusBubbles || 5;
     var resultType = resultType || "standard";

     var numberTapped = $gameVariables.value(numberTappedVarId);
     var actualReleased = $gameVariables.value(bubblesReleasedVarId) - minusBubbles;
     var negativeTapped = $gameVariables.value(negativeTappedVarId);

     if (resultType === "standard"){
       if (numberTapped >= actualReleased){
        give3Star(star1_SwitchId, star2_SwitchId, star3_SwitchId, 130);
       }else{
         if (numberTapped >= actualReleased * .85){
           give2Star(star1_SwitchId, star2_SwitchId, 129);
         }else{
           if (numberTapped >= $tappingGame._tapGoal){
             give1Star(star1_SwitchId, 128);
           }
         }
       }
     }
     
     if (resultType === "skulls"){
       if (negativeTapped === 0){
        give3Star(star1_SwitchId, star2_SwitchId, star3_SwitchId, 130);
       }else{
         if (negativeTapped < 3){
           give2Star(star1_SwitchId, star2_SwitchId, 129);
         }else{
           if (numberTapped >= $tappingGame._tapGoal){
             give1Star(star1_SwitchId, 128);
           }
         }
       }
     }

     if ($gameSwitches.value(firstWin_SwitchID) != true){
       $gameSwitches.setValue(firstWin_SwitchID, true);
       $gameSwitches.setValue(advance_SwitchID,  true);
     }
}

var giveStar = function(star_SwitchId){
   var goalStar_ItemId = 5;
   if ($gameSwitches.value(star_SwitchId) != true){
      $gameParty.gainItem($dataItems[goalStar_ItemId], 1);
      $gameSwitches.setValue(star_SwitchId, true);
   } 
}

var give1Star = function(star1_SwitchId, animId){
   giveStar(star1_SwitchId);
   $gameMap._interpreter.PlaceAnimation(animId, 288, 382, 0, 0);
}

var give2Star = function(star1_SwitchId, star2_SwitchId, star3_SwitchId, animId){
   giveStar(star1_SwitchId);
   giveStar(star2_SwitchId);
   $gameMap._interpreter.PlaceAnimation(animId, 288, 382, 0, 0);
}

var give3Star = function(star1_SwitchId, star2_SwitchId, star3_SwitchId, animId){
   giveStar(star1_SwitchId);
   giveStar(star2_SwitchId);
   giveStar(star3_SwitchId);
   $gameMap._interpreter.PlaceAnimation(animId, 288, 382, 0, 0);
}


var checkRewardStatus = function(){
  try {
    if (MainActivity){
        // Give Reward
        if (MainActivity.isShowingVideo() != true){
           if (MainActivity.getRewardAmount() > 0){
               $gameParty.gainGold(MainActivity.getRewardAmount());
               $gameVariables.setValue(135, $gameParty.gold());
               $gameTemp.reserveCommonEvent(92);
               MainActivity.setRewardAmount(0);
               $gameSwitches.setValue(5, false);
            }
         }
      }
   } catch (e){
     $gameSwitches.setValue(5, false);
   }
}

var showRewarded = function(){
  try {
      if (MainActivity){MainActivity.showRewarded();}
   } catch (e){
      console.log("No Ad's on PC");
   }
}

var showToast = function(txt){
  try {
    if (MainActivity){MainActivity.showToast(txt);}
   } catch (e){
      console.log("Can't showToast on PC");
   }
}

var showAd = function(){
  try {
     if (MainActivity){
       if (MainActivity.areAdsRemoved() != true){
          MainActivity.pauseSound();
          MainActivity.showInterstitial();
       }else{
          playMusic_Map();
       }
     }
   } catch (e) {
      console.log("No Ad's on PC");
//      console.log(e);
   }
}

var setup_menu = function(){
    var start_X = 15;
    var start_Y = 20;

    var icon_spacing_X = 130;
    var icon_spacing_Y = 0;

    var spacing_X = 0;
    var spacing_Y = 0;

    var livesIcon_X = start_X;
    var livesIcon_Y = start_Y;

    var livesNumber_X = livesIcon_X+4;
    var livesNumber_Y = livesIcon_Y+12;

    var livesTimer_X = livesIcon_X + 42;
    var livesTimer_Y = livesIcon_Y + 14;

    var livesFull_X = livesIcon_X + 40 + spacing_X;
    var livesFull_Y = livesIcon_Y + 14;

    var coinsIcon_X = livesIcon_X + icon_spacing_X + 13;
    var coinsIcon_Y = livesIcon_Y;

    var coinsNumber_X = coinsIcon_X + 56 + spacing_X;
    var coinsNumber_Y = coinsIcon_Y + 14;

    var starsIcon_X = coinsIcon_X + icon_spacing_X;
    var starsIcon_Y = livesIcon_Y - 2;

    var starsNumber_X = starsIcon_X + 58 + spacing_X;
    var starsNumber_Y = starsIcon_Y + 16;

    var gemsIcon_X = starsNumber_X + icon_spacing_X - 52;
    var gemsIcon_Y = livesIcon_Y;

    var gemsNumber_X = gemsIcon_X + icon_spacing_X - 52;
    var gemsNumber_Y = gemsIcon_Y + 14;


    $gameVariables.setValue(161, livesNumber_X);
    $gameVariables.setValue(162, livesNumber_Y);
    
    $gameVariables.setValue(163, livesTimer_X);
    $gameVariables.setValue(164, livesTimer_Y);

    $gameVariables.setValue(165, livesFull_X);
    $gameVariables.setValue(166, livesFull_Y);

    $gameVariables.setValue(167, coinsNumber_X);
    $gameVariables.setValue(168, coinsNumber_Y);

    $gameVariables.setValue(169, starsNumber_X);
    $gameVariables.setValue(170, starsNumber_Y);
    
    $gameVariables.setValue(171, gemsNumber_X);
    $gameVariables.setValue(172, gemsNumber_Y);

//    $gameScreen.showPicture(82, "slot_icon01", 0, 140, 420, 100, 100, 255, 0);

    $gameScreen.showPicture(84, "shop icon 1", 0, 480, 958, 90, 90, 255, 0);

    var musicIcon_X = 22;
    var musicIcon_Y = 1024;

    if ($gameSwitches.value(116)){
      $gameScreen.showPicture(86, "coins4video1_disabled", "center", 280, 970, 100, 100, 255, 0);
    }else{
      $gameScreen.showPicture(86, "coins4video1",          "center", 280, 970, 100, 100, 255, 0);
    }

    if ($gameSwitches.value(102)){
      pauseMusic();
      $gameScreen.showPicture(59, "music_on", "center", musicIcon_X, musicIcon_Y, 100, 100, 255, 0);
      var frm = Math.min(Math.max(3,1),999);
      var speed = 20;
      $gameScreen.picture(59)._animeData = [true,frm,9999,0,speed];
    }else{
      playMusic_Map();
      $gameScreen.showPicture(59, "music_off",  "center", musicIcon_X, musicIcon_Y, 100, 100, 255, 0);
       var frm = Math.min(Math.max(3,1),999);
       var speed = 20;
       $gameScreen.picture(59)._animeData = [true,frm,9999,0,speed];
    }

//    $gameScreen.showPicture(87, "donate_button", 0, 300, 953, 100, 100, 255, 0);

//    $gameScreen.showPicture(70, "chest", 0, 288, 300, 100, 100, 255, 0);

//    $gameScreen.showPicture(89, "back_button1", 0, 476, 952, 100, 100, 255, 0);

    $gameScreen.showPicture(77,  "gems", 0,  gemsIcon_X,  gemsIcon_Y, 100, 100, 255, 0);
    $gameScreen.showPicture(93, "lives", 0, livesIcon_X, livesIcon_Y, 100, 100, 255, 0);
    $gameScreen.showPicture(94, "coins", 0, coinsIcon_X, coinsIcon_Y, 100, 100, 255, 0);
    $gameScreen.showPicture(95, "stars", 0, starsIcon_X, starsIcon_Y, 100, 100, 255, 0);

    //$gameScreen.showPicture(63, "scrollingPlayer", 0, start_X, 878, 100, 100, 255, 0);

    $gameScreen.showPicture(64, "credits", 0, start_X, start_Y + 100, 100, 100, 255, 0);

    $gameScreen.showPicture(74, "header_bg", 0, 0, 0, 100, 100, 200, 0);

};


var toggle_music = function(){
    var musicIcon_X = 64;
    var musicIcon_Y = 1020;

    if ($gameSwitches.value(102)){
      $gameSwitches.setValue(102, false);
    }else{
      $gameSwitches.setValue(102, true);
    }

    setup_menu();
}

var removeAds = function(){
    if (MainActivity) {MainActivity.removeAds();}
}

var eraseMenu = function(){
  $gameScreen.erasePicture(48);
  $gameScreen.erasePicture(59);
  $gameScreen.erasePicture(70);
  $gameScreen.erasePicture(71);
  $gameScreen.erasePicture(74);
  $gameScreen.erasePicture(77);
  $gameScreen.erasePicture(79);
  $gameScreen.erasePicture(82);
  $gameScreen.erasePicture(84);
  $gameScreen.erasePicture(85);
  $gameScreen.erasePicture(86);
  $gameScreen.erasePicture(87);
  $gameScreen.erasePicture(89);
  $gameScreen.erasePicture(90);
  $gameScreen.erasePicture(91);
  $gameScreen.erasePicture(92);
  $gameScreen.erasePicture(93);
  $gameScreen.erasePicture(94);
  $gameScreen.erasePicture(95);
  $gameScreen.erasePicture(98);
  $gameScreen.erasePicture(99);
}

var loadShop = function(){
  playMusic_Shop();

  var iconStart_X   = 20;
  var iconSpacing_X = 20;

  var iconStart_Y   = 160;
  var iconSpacing_Y = 20;

  $gameScreen.showPicture(50, "shop_header1",  0,  78, 10, 100, 100, 255, 0);

  $gameScreen.showPicture(98, "shop_hearts",  0,  iconStart_X,                       iconStart_Y, 100, 100, 255, 0);
  $gameScreen.showPicture(69, "shop_zap",     0,  iconStart_X + iconSpacing_X + 248, iconStart_Y, 100, 100, 255, 0);
  $gameScreen.showPicture(89, "back_button1", 0, 480, 960, 90, 90, 255, 0);

  $gameScreen.showPicture(60, "shop_gems4coins", 0, iconStart_X,                       iconStart_Y + iconSpacing_Y + 248, 100, 100, 255, 0);


  $gameScreen.showPicture(62, "shop_noads", 0, iconStart_X,                       iconStart_Y + (iconSpacing_Y + 248)*2, 100, 100, 255, 0);
  $gameScreen.showPicture(61, "shop_gems4cash",  0, iconStart_X + iconSpacing_X + 248, iconStart_Y + (iconSpacing_Y + 248), 100, 100, 255, 0);
}

var displayLivesTimer = function(){
    return (("0"+(($gameVariables.value(22)-1)-$gameVariables.value(2))).slice(-2)+":"+("0"+(60-$gameVariables.value(1))).slice(-2));
};

var checkLivesTimerActive = function(){
  var lives_varId = 21;
  var maxLives_varId = 23;
  var livesCounterActive_switchId = 141;
  var livesFull_switchId = 142;

  if ($gameVariables.value(lives_varId) >= $gameVariables.value(maxLives_varId)){
    $gameSwitches.setValue(livesCounterActive_switchId, false);
    $gameSwitches.setValue(livesFull_switchId, true);
  }else{
    $gameSwitches.setValue(livesCounterActive_switchId, true);
    $gameSwitches.setValue(livesFull_switchId, false);
  }
  SceneManager._scene._hudWindows['mainMenu'][0].update();
}

var levelSetup = function(){
     var mainSystem = new Main_System();

    var howManyClicks_VarID = 37;
    $gameVariables.setValue(howManyClicks_VarID, 0);

    for (var i = 0; i < mainSystem._levelConnectors.length; i++){
       if ($gameMap._mapId === mainSystem._levelConnectors[i]._mapId){
          $gameTemp.reserveCommonEvent(mainSystem._levelConnectors[i]._commonId);
       }
    }
}

var displayMainHUD = function(){
   var mainHUD_switchId = 140;
   var goldStars_varId = 136;
   var goldCoins_varId = 135;
   var goldStar_itemId = 5;
   var item = $dataItems[goldStar_itemId];

   checkLivesTimerActive();
   $gameSwitches.setValue(mainHUD_switchId, true);
   $gameVariables.setValue(goldStars_varId, $gameParty.numItems(item));

   $gameVariables.setValue(goldCoins_varId, $gameParty.gold());

   setup_menu();
   SceneManager._scene._hudWindows['mainMenu'][0].update();
}

var checkToAdvance = function(){
  var firstWinVarIdList = [161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 173, 181, 224, 228, 232, 236, 240, 244, 248, 252, 256, 260, 264, 268, 272, 276, 280, 284, 324, 328, 332, 336, 340, 344, 348, 352, 356, 360, 364, 368, 372];
  var alreadyAdvanced_startId = 401;
  var advanceLevelSwitchId = 171;
  var advanceTriggeredSwitchId = 32;
  for (var i = 0, len = firstWinVarIdList.length; i < len; i++) {
    var varId = firstWinVarIdList[i];
    if ($gameSwitches.value(varId) === true && $gameSwitches.value(alreadyAdvanced_startId+i) === false){
       $gameSwitches.setValue(advanceLevelSwitchId, true);
       $gameSwitches.setValue(alreadyAdvanced_startId+i, true);
//       $gameTemp.reserveCommonEvent(141);
    }
  }
}

var pauseMusic = function(){
    $gameSwitches.setValue(102, true);
    MainActivity.pauseSound();
}

var playMusic_Map = function(){
    if ($gameSwitches.value(102) === false){
        MainActivity.playSound("caketown1", true, true);
    }
}

var playMusic_tapGame = function(){
  if ($gameSwitches.value(102) === false){
    var bgm = "gem_popper";
    var r = Math.floor((Math.random() * 4)+1);
    switch (r){
        case 1:
            bgm = "area_1";
            break;
        case 2:
            bgm = "gem_popper";
            break;
        case 3:
            bgm = "intense";
            break;
        case 4:
            bgm = "thoughtful_piano_theme";
            break;
        case 5:
            bgm = "tgfcoder_frozenjam"
    }
    MainActivity.playSound(bgm, true, true);
  }
}

var playMusic_Shop = function(){
    if ($gameSwitches.value(102) === false){
        var bgm = "buy_something";
        MainActivity.playSound(bgm, true, true);
    }
}

var tappingGame_checkWhatsCaught = function(){

    var tapItem = $tappingGame._tapItems[$gameVariables.value(140)];
    $gameScreen.picture(tapItem._imgPictureId)._name = tapItem._clickedImgFile;
    $gameScreen.picture(tapItem._imgPictureId).rotate(tapItem._rotateSpeedAfterClicked);
    $gameScreen.picture(tapItem._bubblePictureId).rotate(tapItem._rotateBubbleSpeedAfterClicked);
    $gameScreen.picture(tapItem._bubblePictureId)._name = tapItem._clickedBubbleFile;

    $gameScreen.picture(tapItem._imgPictureId)._opacity = tapItem._opacityAfterClicked;
    $gameScreen.picture(tapItem._bubblePictureId)._opacity = tapItem._bubbleOpacityAfterClicked;

    Galv.PIC.anim(tapItem._bubblePictureId,tapItem._scoreAnimationNumber);
//    Galv.PIC.anim(tapItem._bubblePictureId,tapItem._animationNumber);

    if (tapItem._animationNumber){$gameMap._interpreter.PlaceAnimation(tapItem._animationNumber, tapItem._X, tapItem._Y, 0, 0);}
    //if (tapItem._scoreAnimationNumber){$gameMap._interpreter.PlaceAnimation(tapItem._scoreAnimationNumber, tapItem._X, tapItem._Y, 0, 0);}

    var soundObj = $tappingGame._tapItems[$gameVariables.value(140)]._soundWhenClicked;
    var r = soundObj.pitch;
    if (r < 0){r = Math.floor((Math.random() * 100)+40);}
    var se = {name: soundObj.name, volume: soundObj.volume, pitch: r, pan: soundObj.pan};
    AudioManager.playSe(se);

    if ($tappingGame._tapItems[$gameVariables.value(140)]._category === 6){
        $gameTimer._frames=$gameTimer._frames+$tappingGame._tapItems[$gameVariables.value(140)]._timeAdjustment;
    }

    if ($tappingGame._tapItems[$gameVariables.value(140)]._category === 4 || $tappingGame._tapItems[$gameVariables.value(140)]._category === 5){
        $gameParty._gold = $gameParty._gold + $tappingGame._tapItems[$gameVariables.value(140)]._coinAdjustment;
        $gameVariables.setValue(135, $gameParty._gold);
        $tappingGame._maxItems = $tappingGame._originalMaxItems;
        var se = {name: "Coin", volume: 25, pitch: 150, pan: 0};
        AudioManager.playSe(se);
    }

    if ($tappingGame._tapItems[$gameVariables.value(140)]._category === 3){
        if ($gameSwitches.value(160) != true){
           $gameSwitches.setValue(17, true);
        }
    }
//showToast($tappingGame._tapItems[$gameVariables.value(140)]._scoreAdjustment);
    if (!$tappingGame._hasWon && !$tappingGame._hasLost){

        if ($gameSwitches.value(160) != true){
            if ($tappingGame._tapItems[$gameVariables.value(140)]._category === 2){
                $gameVariables.setValue(160, $gameVariables.value(160)+1);
                if ($tappingGame._negativeStrikeMax){
                    if ($gameVariables.value(160) >= $tappingGame._negativeStrikeMax){
                        $gameSwitches.setValue(17, true);
                    }
                }
            }
        }

        //if ($tappingGame._tapItems[$gameVariables.value(140)]._category === 1){
            if ($gameVariables.value(139) + $tappingGame._tapItems[$gameVariables.value(140)]._scoreAdjustment >= 0){

                $gameVariables.setValue(139, $gameVariables.value(139)+$tappingGame._tapItems[$gameVariables.value(140)]._scoreAdjustment);
            }
        //}

        SceneManager._scene._hudWindows['tappingGameHUD'][0].update();
    }
}