//=============================================================================
// LoadMapAsTitle_CTBolt.js
//=============================================================================

/*:
 * @plugindesc Allows a map to be played in place of the title screen.
 * @author CT_Bolt
 *
 * @param Map ID
 * @desc The Map ID to be used as the title.
 * @default 1
 *
 * @param X
 * @desc The X Coordinate where the player starts
 * @default 1
 *
 * @param Y
 * @desc The Y Coordinate where the player starts
 * @default 1
 *
 * @param Direction
 * @desc The direction the player is facing (2 = Down, 4 = Left, 6 = Right, 8 = Up)
 * @default 2
 *
 * @help
 *
 * Enter a Map ID to be played as in place of the title.
 *
 */

var params = PluginManager.parameters('LoadMapAsTitle_CTBolt');
var mapId = Number(params['Map ID'] || 1);
var xPos = Number(params['X'] || 1);
var yPos = Number(params['Y'] || 1);
var direction = Number(params['Direction'] || 2);

Scene_Title.prototype = Object.create(Scene_Base.prototype);
Scene_Title.prototype.constructor = Scene_Title;

Scene_Title.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
};

Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    $gamePlayer.reserveTransfer(mapId, xPos, yPos, direction, 2);
    SceneManager.goto(Scene_Map);
};