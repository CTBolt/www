//=============================================================================
// OnlineAvatar.js
// PUBLIC DOMAIN
// ----------------------------------------------------------------------------
// (Previous update history is not recorded)
// 2016/10/25 Fixed a bug in data being inconsistent between switch and server on switch / variable synchronization
// 2016/11/09 Fixed avatar's parting when moving to the same map
// 2016/11/14 Countermeasure against conflict with Event Dynamic Generation Plugin (EventReSpawn.js)
//=============================================================================

/*:
 * @ plugindesc Synchronize players online using Firebase.
 * @author ?????
 *
 * @param apiKey
* @desc Firebase apiKey. Please do copipe each one
 * @default *******************
 *
 * @param authDomain
* @desc Firebase authDomain. Please do copipe each one
 * @default **********.firebaseapp.com
 *
 * @param databaseURL
* @desc Firebase databaseURL. Please do copipe each one
 * @default https://**********.firebaseio.com
 *
 * @param avatarEvent
* @ desc The number of the common event to be copied to the avatar. 0 to turn off the avatar function itself
 * @default 1
 *
 * @param syncSwitchStart
* @ desc The beginning of the number of the switch that all players share online. Both 0 disable shared function itself
 * @default 11
 *
 * @param syncSwitchEnd
* @desc End of the number of the switch to share online with all players. Both 0 disable shared function itself
 * @default 20
 *
 * @param syncVariableStart
* @desc The beginning of the number of variables that all players share online. Both 0 disable shared function itself
 * @default 11
 *
 * @param syncVariableEnd
* @desc The end of the number of variables that all players share online. Both 0 disable shared function itself
 * @default 20
 *
 * @help
 * Work in cooperation with Firebase which is external BaaS, like MMORPG
 * This plug-in corresponds to online avatar (player character) display.
 * We also added a switch and variable synchronization function.
 * 
 * Getting Started:
* 1. On Firebase's official website (https://console.firebase.google.com/)
 * Get a Google account (if you do not have one) and create a new project
* 2. Press "Add firebase to web application" button
 * Copy apiKey, authDomain, databaseURL as plugin parameters
* 3. Activate "Auth" from the left menu ? "Login method" ? "anonymous" from the top
* 4. When multiple games are activated, avatars of all the players will be displayed on the screen!
 * * Since you can not launch multiple from the test play button, open index.html from Firefox
 * 
*! note!
 * For many posting sites, for the sake of safety it is a function called Content Security Policy
 * Online communication to Firebase is restricted.
 * If you plan to post games using this plugin,
 * Make sure beforehand whether this plugin can be used at the posting destination!
 * 
 * 
 * Switch · Variable synchronization:
 * syncSwitchStart, syncSwitchEnd, syncVariableStart, syncVariableEnd
 * Set the "switch and variable range to synchronize" with 4 parameters.
 * (In the initial setting, numbers of 11 to 20 are shared for both switches and variables)
 * The range of switches and variables are set by all players by online communication
* The same value is shared! This is not just about letting out avatars
 * I think that you can make various kinds of games using online.
 * 
 * Advanced version:
 * The avatar displayed on the screen is the common event number specified by avatarEvent
 * Copy "execution contents" to their own execution contents and execute them in parallel processing.
 * By combining this with the plugin command below you can also implement chat.
 * See the sample in detail ? https: //krmbn0576.github.io/rpgmakermv/
 * 
 * Plugin command:
 * online 1 to chat Sends the contents of variable 1 as "chat".
 * online 1 from chat Assign "chat" sent by "that avatar" to variable 1.
 * 
 * License:
* There is no restriction on how to use this plugin. Please do as you like.
 */

function OnlineManager() {
	throw new Error('This is a static class');
}

function Game_Avatar() {
	this.initialize.apply(this, arguments);
}

(function() {
	'use strict';
	OnlineManager.parameters = PluginManager.parameters('OnlineAvatar');
	OnlineManager.url = 'https://www.gstatic.com/firebasejs/live/3.0/firebase.js';
	OnlineManager.avatarTemplate = {"id":0,"meta":{},"name":"","note":"","pages":[{"conditions":{"actorId":1,"actorValid":false,"itemId":1,"itemValid":false,"selfSwitchCh":"A","selfSwitchValid":false,"switch1Id":1,"switch1Valid":false,"switch2Id":1,"switch2Valid":false,"variableId":1,"variableValid":false,"variableValue":0},"directionFix":false,"image":{"tileId":0,"characterName":"","direction":2,"pattern":1,"characterIndex":0},"list":null,"moveFrequency":5,"moveRoute":{"list":[{"code":45,"parameters":["this.moveOnlineXy()"],"indent":null},{"code":0,"parameters":[]}],"repeat":true,"skippable":false,"wait":false},"moveSpeed":5,"moveType":3,"priorityType":1,"stepAnime":false,"through":true,"trigger":4,"walkAnime":true}],"x":0,"y":0};
	OnlineManager.avatarsInThisMap = null;
	OnlineManager.mapRef = null;
	OnlineManager.selfRef = null;
	OnlineManager.switchRef = null;
	OnlineManager.variableRef = null;
	OnlineManager.user = null;
	OnlineManager . SyncBusy  =  false ;	 // At the moment of synchronous connection, block transmission from overwriting reception

	// Read the firebase file from the net
	OnlineManager.initialize = function() {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = this.url;
		script.async = true;
		script.onload = this.awake.bind(this);
		script.onerror = function(e) {
			throw  new  Error ( ' loading firebase failed, try again with F5 ' );
		};
		document.body.appendChild(script);
	};

	// Start firebase
	OnlineManager.awake = function() {
		var ps = this.parameters;
		ps['avatarEvent'] = +ps['avatarEvent'];
		ps['syncSwitchStart'] = +ps['syncSwitchStart'];
		ps['syncSwitchEnd'] = +ps['syncSwitchEnd'];
		ps['syncVariableStart'] = +ps['syncVariableStart'];
		ps['syncVariableEnd'] = +ps['syncVariableEnd'];

		try {
			firebase.initializeApp({apiKey: ps['apiKey'], authDomain: ps['authDomain'], databaseURL: ps['databaseURL']});
		} catch(e) {
			throw  new  Error ( ' ApiKey is not set correctly, please check. ' );
		}

		this.auth();
	};

	// Access firebase app and sign in anonymously
	// Let's remodel this method if you want to login with password authentication or Twitter linkage authentication
	OnlineManager.auth = function() {
		firebase.auth().signInAnonymously().then(this.start.bind(this)).catch(SceneManager.catchException.bind(SceneManager));
	};

	// after sign-in is completed
	// A function written in the description on event registration of online connection (such as xxxRef.on ()) calls it from this method
	OnlineManager.start = function(user) {
		this.user = user;

		/ / Reattach onDisconnect on reconnection
		var connectedRef = firebase.database().ref('.info/connected');
		connectedRef.on('value', function(data) {
			if (data.val() && OnlineManager.selfRef) OnlineManager.selfRef.onDisconnect().remove();
		});

		// If the connection is delayed from the initial map read, subscribe to the online data of the current map
		if (this.mapExists()) this.connectNewMap();

		if ($gameSwitches) this.startSync();
	};

	// Start online synchronization of switches and variables
	OnlineManager.startSync = function() {
		if (!this.user) return;

		if (this.parameters['syncSwitchStart'] || this.parameters['syncSwitchEnd']) {
			if (this.switchRef) this.switchRef.off();
			else this.switchRef = firebase.database().ref('switches');
			OnlineManager.syncBusy = true;
			this.switchRef.once('value', function(data) {
				OnlineManager.syncBusy = false;
			});
			this.switchRef.on('child_added', function(data) {
				$gameSwitches.setValue(data.key, data.val(), true);
			});
			this.switchRef.on('child_changed', function(data) {
				$gameSwitches.setValue(data.key, data.val(), true);
			});
		}

		if (this.parameters['syncVariableStart'] || this.parameters['syncVariableEnd']) {
			if (this.variableRef) this.variableRef.off();
			else  this . variableRef  =  firebase . database (). ref ( ' variables ' );
			OnlineManager.syncBusy = true;
			this.variableRef.once('value', function(data) {
				OnlineManager.syncBusy = false;
			});
			this.variableRef.on('child_added', function(data) {
				$gameVariables.setValue(data.key, data.val(), true);
			});
			this.variableRef.on('child_changed', function(data) {
				$gameVariables.setValue(data.key, data.val(), true);
			});
		}
	};

	// Subscribe to the online data of the new map and receive avatar information
	OnlineManager.connectNewMap = function() {
		if (!this.user || !this.parameters['avatarEvent']) return;

		// Detach the callback of the previous map and remove coordinate information
		if (this.mapRef) {
			this.mapRef.off();
			this.selfRef.onDisconnect().cancel();
			this.selfRef.remove();
		}

		if ( ! $ dataMap . meta  ||  $ dataMap . Meta . avatar_off ) {
			this.mapRef = null;
			this.selfRef = null;
			this.avatarsInThisMap = null;
			return;
		}

		this.mapRef = firebase.database().ref('map' + $gameMap.mapId().padZero(3));
		this.selfRef = this.mapRef.child(this.user.uid);
		this . selfRef . onDisconnect (). remove ();	 // Remove the character coordinates when disconnected

		var avatarTemplate = this.avatarTemplate;
		var avatarsInThisMap = this.avatarsInThisMap = {};
		if (!avatarTemplate.pages[0].list) {
			avatarTemplate.pages[0].list = $dataCommonEvents[this.parameters['avatarEvent']].list;
		}

		// Other players enter the same map
		this.mapRef.on('child_added', function(data) {
			if (OnlineManager.shouldDisplay(data)) {
				avatarsInThisMap[data.key] = new Game_Avatar(avatarTemplate, data.val());
			}
		});

		// Other players move on the same map
		this.mapRef.on('child_changed', function(data) {
			if (OnlineManager.shouldDisplay(data)) {
				if (avatarsInThisMap[data.key]) {
					avatarsInThisMap[data.key].setOnlineData(data.val());
				} else {	 // just in case
					avatarsInThisMap[data.key] = new Game_Avatar(avatarTemplate, data.val());
				}
			}
		});

		// Other players leave from this map
		this.mapRef.on('child_removed', function(data) {
			if (OnlineManager.shouldDisplay(data)) {
				if (avatarsInThisMap[data.key]) avatarsInThisMap[data.key].erase();
				delete avatarsInThisMap[data.key];
			}
		});

		this.sendPlayerInfo();
	};

	// Player information to send
	OnlineManager.playerInfo = function() {
		was $ = $ game player;
		return {x: $.x, y: $.y, direction: $.direction(), speed: $.realMoveSpeed(), charaName: $.characterName(), charaIndex: $.characterIndex()};
	};

	// Send player information online
	OnlineManager.sendPlayerInfo = function() {
		if (this.selfRef) this.selfRef.update(this.playerInfo());
	};

	// Send the information specified by the plugin command and player information online
	OnlineManager.sendCustomInfo = function(key, value) {
		var info = this.playerInfo();
		info[key] = value;
		if (this.selfRef) this.selfRef.update(info);
	};

	// Delete player information
	OnlineManager.removePlayerInfo = function() {
		if (this.selfRef) this.selfRef.remove();
	};

	// Ensure that $ gameMap and $ dataMap are not null
	OnlineManager.mapExists = function() {
		return DataManager.isMapLoaded();
	};

	// If the data sent is not me, but it is displayed when the map is loaded
	OnlineManager.shouldDisplay = function(data) {
		return data.key !== this.user.uid && this.mapExists();
	};

	// switch is within synchronization range
	OnlineManager.switchInRange = function(switchId) {
		return this.parameters['syncSwitchStart'] <= switchId && switchId <= this.parameters['syncSwitchEnd'];
	};

	// variable is within synchronization range
	OnlineManager.variableInRange = function(variableId) {
		return this.parameters['syncVariableStart'] <= variableId && variableId <= this.parameters['syncVariableEnd'];
	};

	// Send switch
	OnlineManager.sendSwitch = function(switchId, value) {
		if (this.switchRef && !this.syncBusy && this.switchInRange(switchId)) {
			was sent = {};
			send[switchId] = value;
			this.switchRef.update(send);
		}
	};

	// Send variables
	OnlineManager.sendVariable = function(variableId, value) {
		if (this.variableRef && !this.syncBusy && this.variableInRange(variableId)) {
			was sent = {};
			send[variableId] = value;
			this.variableRef.update(send);
		}
	};



	// Start OnlineManager
	var _SceneManager_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_SceneManager_initialize.apply(this, arguments);
		OnlineManager.initialize();
	};

	// Do not reread $ dataMap when same map
	var _DataManager_loadMapData = DataManager.loadMapData;
	DataManager.loadMapData = function(mapId) {
		if ($gamePlayer.isTransferring() || SceneManager.isPreviousScene(Scene_Load)) {
			_DataManager_loadMapData.apply(this, arguments);
		}
	};

	/ / When walking
	var _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
	Game_Player.prototype.moveStraight = function(d) {
		var prevD = this.direction();
		_Game_Player_moveStraight.apply(this, arguments);
		// Only send when the position or direction is different from the previous time
		if (this.isMovementSucceeded() || d !== prevD) {
			OnlineManager.sendPlayerInfo();
		}
	};

	// when changing graphics
	var _Game_Player_setImage = Game_Player.prototype.setImage;
	Game_Player.prototype.setImage = function(characterName, characterIndex) {
		_Game_Player_setImage.apply(this, arguments);
		if ( ! this . isTransferring ()) OnlineManager . sendPlayerInfo ();	 // unnecessary when moved
	};

	// when switching map
	var _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
	Game_Player.prototype.performTransfer = function() {
		if ($gameMap.mapId() === $gamePlayer.newMapId()) {
			for (var key in OnlineManager.avatarsInThisMap) OnlineManager.avatarsInThisMap[key].erase();
		}
		_Game_Player_performTransfer.apply(this, arguments);
		OnlineManager.connectNewMap();
	};

	// When loading, delete remaining avatar at save time
	// (Since this does not touch $ dataMap when hooking to Scene_Load.onLoadSuccess, this timing)
	var _Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function() {
		_Scene_Map_start.apply(this, arguments);
		if (SceneManager.isPreviousScene(Scene_Load)) {
			$gameMap.events().forEach(function(event) {if (event instanceof Game_Avatar) event.erase();});
			OnlineManager.connectNewMap();
		}
	};

	// Remove the character coordinates even when I returned to the title
	var _Scene_Title_start = Scene_Title.prototype.start;
	Scene_Title.prototype.start = function() {
		OnlineManager.removePlayerInfo();
		_Scene_Title_start.apply(this, arguments);
	};

	// plugin command
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.apply(this, arguments);
		if (command.toLowerCase() === 'online') {
			switch (args[1].toLowerCase()) {
				case 'from':
					var online = this.character(0).online;
					$gameVariables.setValue(+args[0], online && online[args[2]]);
					break;
				case 'to':
					OnlineManager.sendCustomInfo(args[2], $gameVariables.value(+args[0]));
					break;
				default:
					break;
			}
		}
	};

	// switch synchronization
	var _Game_Switches_setValue = Game_Switches.prototype.setValue;
	Game_Switches.prototype.setValue = function(switchId, value, byOnline) {
		_Game_Switches_setValue.call(this, switchId, value);
		if (!byOnline) OnlineManager.sendSwitch(switchId, this.value(switchId));
	};

	// variable synchronization
	var _Game_Variables_setValue = Game_Variables.prototype.setValue;
	Game_Variables.prototype.setValue = function(variableId, value, byOnline) {
		_Game_Variables_setValue.call(this, variableId, value);
		if (!byOnline) OnlineManager.sendVariable(variableId, this.value(variableId));
	};

	// At the time of initialization of switch · variable, resynchronization processing (timing is representative of switch)
	var _Game_Switches_initialize = Game_Switches.prototype.initialize;
	Game_Switches.prototype.initialize = function() {
		_Game_Switches_initialize.apply(this, arguments);
		OnlineManager.startSync();
	};

	/ / Reflected in debug window (F9) when switch / variable is changed via online
	// Somewhat heavy processing, but F9 is not running on smartphones or browsers so it's okay with this
	var _Window_DebugEdit_update = Window_DebugEdit.prototype.update;
	Window_DebugEdit.prototype.update = function() {
		_Window_DebugEdit_update.apply(this, arguments);
		this.refresh();
	};



	//Game_Avatar
	// Define the map event to use as an avatar
	Game_Avatar.prototype = Object.create(Game_Event.prototype);
	Game_Avatar.prototype.constructor = Game_Avatar;

	Game_Avatar.prototype.initialize = function(eventData, onlineData) {
		can mapId =  $ gameMap . mapId ();
		var eventId = $gameMap.getEventIdSequence ? $gameMap.getEventIdSequence() : $gameMap._events.length;

		['A', 'B', 'C', 'D'].forEach(function(switchId) {
			can key = [mapId, eventId, switchId];
			$gameSelfSwitches.setValue(key, false);
		});

		this.eventData = eventData;
		Game_Event.prototype.initialize.call(this, mapId, eventId);
		this.locate(onlineData.x, onlineData.y);
		this.setDirection(onlineData.direction);
		this.setMoveSpeed(onlineData.speed);
		this . setImage ( onlineData . friend , onlineData . charaIndex );
		this.setOnlineData(onlineData);
		$gameMap._events.push(this);

		var scene = SceneManager._scene;
		if (scene instanceof Scene_Map) {
			var sprite = new Sprite_Character(this);
			scene._spriteset._characterSprites.push(sprite);
			scene._spriteset._tilemap.addChild(sprite);
		}
	};

	Game_Avatar.prototype.event = function() {
		return this.eventData;
	};

	Game_Avatar.prototype.setOnlineData = function(onlineData) {
		this.online = onlineData;
	};

	// Walk to the same position as online coordinates (it is set as a custom route of avatarTemplate)
	Game_Avatar.prototype.moveOnlineXy = function() {
		this.setMoveSpeed(this.online.speed);
		this.setImage(this.online.charaName, this.online.charaIndex);
		var distance = $gameMap.distance(this.x, this.y, this.online.x, this.online.y);
		if (distance ===  0 ) {	 // if the coordinates are reached only turning
			this.setDirection(this.online.direction);
		} else  if (distance >  5 ) {	 // If it is more than 5 steps to coordinate, then warp
			this.locate(this.online.x, this.online.y);
			this.setDirection(this.online.direction);
		} else {	 // If you walk 1 to 5 steps to the coordinates, walk to that coordinate
			this.moveTowardCharacter(this.online);
		}
	};
})();