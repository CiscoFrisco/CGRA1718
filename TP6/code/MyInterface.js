 class MyInterface extends CGFinterface {


 	/**
 	 * MyInterface
 	 * @constructor
 	 */
 	constructor() {
 		super();
 	}

 	/**
 	 * Create number buttons to enable/disable a light
 	 * @param {*} number 
 	 */
 	createLights(number) {
 		var group = this.gui.addFolder("Luzes");
 		group.open();

 		for (let i = 1; i <= number; i++)
 			group.add(this.scene, 'light' + i);
 	};

 	/**
 	 * init
 	 * @param {CGFapplication} application
 	 */
 	init(application) {
 		// call CGFinterface init
 		super.init(application);

 		// init GUI. For more information on the methods, check:
 		//  http://workshop.chromeexperiments.com/examples/gui

 		this.gui = new dat.GUI();

 		this.gui.add(this.scene, 'doSomething');

 		//Button to enable/disable solids display (disabled by default)
 		this.gui.add(this.scene, 'showSolids');

 		//Button to enable/disable axis display (enabled by default)
 		this.gui.add(this.scene, 'drawAxis');

 		//Buttons to enable/disable lights (enabled bu default)
 		this.createLights(5);

 		//Car maximum speed, between 1 and 5
 		this.gui.add(this.scene, 'maxSpeed', 1, 5);

 		//Textures selectors (dropdown)
 		this.gui.add(this.scene, 'currVehicleAppearance', this.scene.vehicleAppearanceList)
 		this.gui.add(this.scene, 'currTerrainAppearance', this.scene.terrainAppearanceList)

 		this.initKeys();

 		return true;
 	};


 	initKeys() {
 		this.scene.gui = this;
 		this.processKeyboard = function () {};
 		this.activeKeys = {};
 	}

 	processKeyDown(event) {
 		this.activeKeys[event.code] = true;
 	};

 	processKeyUp(event) {
 		this.activeKeys[event.code] = false;
 	};

 	isKeyPressed(keyCode) {
 		return this.activeKeys[keyCode] || false;
 	}
 };