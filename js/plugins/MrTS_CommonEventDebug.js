//=============================================================================
// MrTS_CommonEventDebug.js
//=============================================================================

/*:
* @plugindesc Logs all executing common events to console.
* Add-on: Store last calling event ID & Item ID to game variables
*
* @author Mr. Trivel (add-on by CT_Bolt)
*
* @param On
* @desc Default: true
* @default true
*
* @param Game Variable ID (Event ID)
* @desc Set Game Variable ID to hold calling Event ID
* (Note: If set to 0 this will not do anything)
* @default 0
*
* @param Game Variable ID (Old Event ID)
* @desc Set Game Variable ID to hold calling Last Event ID
* (Note: If set to 0 this will not do anything)
* @default 0
*
* @param Game Variable ID (Item ID)
* @desc Set Game Variable ID to hold calling Item ID
* (Note: If set to 0 this will not do anything)
* @default 0
*
* @help
* --------------------------------------------------------------------------------
* Free for commercial and non-commercial use.
* Version 1.0
* --------------------------------------------------------------------------------
*
* --------------------------------------------------------------------------------
* Open console by pressing F8.
* --------------------------------------------------------------------------------
* 
* --------------------------------------------------------------------------------
* Version History
* --------------------------------------------------------------------------------
* 1.0 - Release
*    ---Add-On (Store last calling Event ID & Item ID to Game Variables)
*/

var Imported = Imported || {};

(function() {
	var parameters = PluginManager.parameters('MrTS_CommonEventDebug');
	var paramOn = Boolean((parameters['On'] || "true").toLowerCase() === "true");
        var gameVarID = Number(parameters['Game Variable ID (Event ID)']);
        var gameVar3ID = Number(parameters['Game Variable ID (Old Event ID)']);
        var gameVar2ID = Number(parameters['Game Variable ID (Item ID)']);

	var _GameInterpreter_setupChild = Game_Interpreter.prototype.setupChild;
	Game_Interpreter.prototype.setupChild = function(list, eventId) {
		_GameInterpreter_setupChild.call(this, list, eventId);
	    if (paramOn){
              console.log((eventId === 0 ? "Battle" : "EventID: " + eventId)  + " executed CE ID #" + this._params[0]);
               if (gameVarID === 0) {
               }else{
                 $gameVariables.setValue(gameVar3ID, $gameVariables.value(gameVarID));
                 $gameVariables.setValue(gameVarID, eventId);
               }
            }
	};

	var _GameAction_applyGlobal = Game_Action.prototype.applyGlobal;
	Game_Action.prototype.applyGlobal = function() {
	    this.item().effects.forEach(function(effect) {
	        if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
	          if (paramOn){
                    console.log("ItemID: " + this.item().id + " executed CE ID #" + effect.dataId);
                     if (gameVar2ID === 0) {
                     }else{
                       $gameVariables.setValue(gameVar2ID, this.item().id);
                     }
                  }
	        }
	    }, this);
		_GameAction_applyGlobal.call(this);
	};
})();
