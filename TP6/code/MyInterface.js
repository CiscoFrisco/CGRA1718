 class MyInterface extends CGFinterface {


 	/**
 	 * MyInterface
 	 * @constructor
 	 */
 	constructor() {
 		super();
 	}

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

 		// add a button:
 		// the first parameter is the object that is being controlled (in this case the scene)
 		// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
 		// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

 		this.gui.add(this.scene, 'doSomething');

 		this.gui.add(this.scene, 'showSolids');

 		this.gui.add(this.scene, 'drawAxis');
 		// add a group of controls (and open/expand by defult)



 		// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
 		// e.g. this.option1=true; this.option2=false;

 		this.createLights(5);

 		// add a slider
 		// must be a numeric variable of the scene, initialized in scene.init e.g.
 		// this.speed=3;
 		// min and max values can be specified as parameters

 		this.gui.add(this.scene, 'speed', -5, 5);

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