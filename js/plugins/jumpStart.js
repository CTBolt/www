/*:
 * @plugindesc Removes title screen, 1-step save, autoload 
 * permaDeath option in parameters
 * 
 * @author Starbird Resources
 *
 * @param permaDeath ON
 * @desc Set to true for permadeath. Erases save file on Gameover.
 * @default no
 * @help This plugin skips the title screen, autoloads saved game if it exists, and starts new game otherwise. There is only one save file, and saving is 
 * only one step. Set permaDeath to 'yes' if you want the save file to be erased upon Gameover. Plugin accepts 'yes' or 'no' as options. permaDeath activates * upon the $gameParty.isAllDead check.  
 */
 //SETS UP THE ONLY PARAMETER, WHETHER PERMADEATH IS ON OR OFF
 var parameters = PluginManager.parameters('jumpStart');
 var permaDeath = (parameters['permaDeath ON'] || 'no').toLowerCase();
 //THIS CHANGES SCENE BOOT TO REMOVE TITLE SCREEN. IT CHECKS IF THERE IS A SAVED FILE AND AUTO LOADS IT IF THERE IS ONE. OTHERWISE, IT STARTS NEW GAME. 
Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
     }
	else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
	    SceneManager.goto(Scene_Map);
     }
	else if (DataManager.isAnySavefileExists() == true){
	  DataManager.loadGame(1);
	  $gameSystem.onAfterLoad();
	  SceneManager.goto(Scene_Map);
      }
	else {
      this.checkPlayerLocation();
	  DataManager.setupNewGame();
      SceneManager.goto(Scene_Map);
	  }
    this.updateDocumentTitle();
};
//THIS CHANGES MAXIMUM NUMBER OF SAVE FILES TO 1. THIS PROBABLY ISN'T NECESSARY FOR THE SCRIPT. 
 DataManager.maxSavefiles = function() {
    return 1;
      };
//THIS CHANGES 'SAVE' IN MENU --AND EVERYWHERE ELSE-- TO A SIMPLE, ONE-STEP SAVE  
function Scene_Save() {
    this.initialize.apply(this, arguments);
}
Scene_Save.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Save.prototype.constructor = Scene_Save;
Scene_Save.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Save.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);

};
Scene_Save.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
   	$gameSystem.onBeforeSave();
	DataManager.saveGame(1);
	SceneManager.push(Scene_Map);
	SoundManager.playSave();
	};

//WHAT HAPPENS AFTER GAMEOVER INSTEAD OF TITLE SCREEN 

Scene_Base.prototype.checkGameover = function() {
    if ($gameParty.isAllDead()) {
		if (permaDeath == 'yes') {
	     StorageManager.remove(1);
		 SceneManager.goto(Scene_Gameover);
		}
		else {SceneManager.goto(Scene_Gameover);}
        }
};

Scene_Gameover.prototype.gotoTitle = function() {
    if (permaDeath == 'yes') {
	  DataManager.setupNewGame();
      SceneManager.goto(Scene_Map)
	}
	else {
		if (permaDeath == 'no' && DataManager.isAnySavefileExists() == true){
	  DataManager.loadGame(1);
	  $gameSystem.onAfterLoad();
	  SceneManager.goto(Scene_Map);
      }
	    else {
	  DataManager.setupNewGame();
      SceneManager.goto(Scene_Map);
	     };
	   };
	};
// WHAT HAPPENS ON "GAME END"  
Scene_GameEnd.prototype.commandToTitle = function() {
    this.fadeOutAll();
    StorageManager.remove(1)
	DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
};

Window_GameEnd.prototype.makeCommandList = function() {
    this.addCommand(TextManager.newGame, 'toTitle');
    this.addCommand(TextManager.cancel,  'cancel');
};