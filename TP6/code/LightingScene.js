class LightingScene extends CGFscene {
	constructor() {
		super();
	};

	initTextures() {
		this.enableTextures(true);

		var vidalTexture = new CGFappearance(this);
		vidalTexture.loadTexture("../resources/images/raul_vidal.png");

		var maregaTexture = new CGFappearance(this);
		maregaTexture.loadTexture("../resources/images/marega.png");

		var desert = new CGFappearance(this);
		desert.loadTexture("../resources/images/desert.png")

		var grass = new CGFappearance(this);
		grass.loadTexture("../resources/images/grass.png");

		var chrome = new CGFappearance(this);
		chrome.loadTexture("../resources/images/chrome_256x256.png");

		var def = new CGFappearance(this);
		def.setAmbient(1.0, 0.0, 0.0, 1.0);
		def.setDiffuse(1.0, 0.0, 0.0, 1.0);

		this.platTex = new CGFappearance(this);
		this.platTex.loadTexture("../resources/images/plat.png");

		this.materialDefault = new CGFappearance(this);
		this.materialDefault.setAmbient(0.2, 0.2, 0.2, 1.0);
		this.materialDefault.setDiffuse(0.2, 0.2, 0.2, 1.0);

		this.vehicleAppearances = [def, maregaTexture, vidalTexture];
		this.vehicleAppearanceList = {};
		this.vehicleAppearanceList["vidal"] = 2;
		this.vehicleAppearanceList["marega"] = 1;
		this.vehicleAppearanceList["def"] = 0;
		this.currVehicleAppearance = 0;

		this.terrainAppearances = [grass, desert, chrome];
		this.terrainAppearanceList = {};
		this.terrainAppearanceList["chrome"] = 2;
		this.terrainAppearanceList["desert"] = 1;
		this.terrainAppearanceList["grass"] = 0;
		this.currTerrainAppearance = 0;
	}

	initElements() {

		var altimetry = [
			[2.0, 3.0, 2.0, 4.0, 2.5, 2.4, 2.3, 1.3, 1.3],
			[2.0, 3.0, 2.0, 4.0, 7.5, 6.4, 4.3, 1.3, 1.3],
			[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
			[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
			[0.0, 0.0, 2.0, 4.0, 2.5, 2.4, 0.0, 0.0, 0.0],
			[0.0, 0.0, 2.0, 4.0, 2.5, 2.4, 0.0, 0.0, 0.0],
			[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
			[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
			[2.0, 3.0, 2.0, 1.0, 2.5, 2.4, 2.3, 1.3, 1.3]
		];

		var myAltimetry = [
			[2.0, 1.0, 4.0, 3.0, 5.0, 3.0, 4.0, 1.0, 2.0],
			[1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
			[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
			[0.0, 0.0, 0.0, 3.0, 3.0, 3.0, 0.0, 0.0, 0.0],
			[0.0, 0.0, 0.0, 3.0, 2.0, 3.0, 0.0, 0.0, 0.0],
			[0.0, 0.0, 0.0, 3.0, 3.0, 3.0, 0.0, 0.0, 0.0],
			[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
			[1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
			[-2.0, 0.0, -2.0, -1.0, -2.0, -1.0, -2.0, 0.0, -2.0]
		];

		this.car = new MyCar(this, 10, 1.3, 12);
		this.crane = new MyCrane(this, 'UP', 'D');
		this.terrain = new MyTerrain(this, 8, 50.0, 50.0, 0, 5, 0, 5, myAltimetry, this.terrainAppearances[this.currTerrainAppearance]);

		this.planeD = new Plane(this, 8, 10, 7);
		this.planeR = new Plane(this, 8, 10, 7);

		this.lamp = new MyLamp(this, 20, 20);
		this.cylinder = new MyCylinder(this, 20, 20);
		this.trapeze = new My3DTrapeze(this);
	}

	init(application) {
		super.init(application);

		this.initCameras();
		this.initLights();

		this.gl.clearColor(126.0 / 255, 192.0 / 255, 238.0 / 255, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		//Car maximum speed
		this.maxSpeed = 3;

		//Textures	
		this.initTextures();

		// Scene elements
		this.initElements();

		this.showSolids = false;

		this.drawAxis = true;

		this.fps = 20;
		this.setUpdatePeriod(1000 / this.fps);

		this.keyWPressed = false;
		this.keySPressed = false;
		this.keyAPressed = false;
		this.keyDPressed = false;
	};

	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() {
		this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1)

		// Positions for five lights

		this.lights[0].setPosition(15, 2, 5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);

		this.lights[3].setPosition(4, 6, 5, 1);
		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 0.0, 1.0);

		this.lights[4].setPosition(0.1, 4, 7, 1);
		this.lights[4].setAmbient(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);

		//Attenuation
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].setQuadraticAttenuation(0);

		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(1);

		this.lights[2].enable();
		this.lights[3].enable();
		this.lights[4].enable();

		//Booleans for dat.gui
		this.light1 = true;
		this.light2 = true;
		this.light3 = true;
		this.light4 = true;
		this.light5 = true;
	};

	updateLights() {

		this.checkLights();

		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	checkLights() {
		if (this.light1)
			this.lights[0].enable();
		else
			this.lights[0].disable();

		if (this.light2)
			this.lights[1].enable();
		else
			this.lights[1].disable();

		if (this.light3)
			this.lights[2].enable();
		else
			this.lights[2].disable();

		if (this.light4)
			this.lights[3].enable();
		else
			this.lights[3].disable();

		if (this.light5)
			this.lights[4].enable();
		else
			this.lights[4].disable();
	}

	display() {
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if (this.drawAxis)
			this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section


		if (!this.car.attached)
			this.displayCar();

		this.terrain.setTexture(this.terrainAppearances[this.currTerrainAppearance]);
		this.terrain.display();

		this.displayCrane();

		this.displayPlanes();

		this.vehicleAppearances[this.currVehicleAppearance].apply();

		if (this.showSolids)
			this.displaySolids();

		// ---- END Scene drawing section	
	};

	displayCrane() {
		this.materialDefault.apply();
		this.pushMatrix()
		this.translate(0, 2, 0);
		this.crane.display();
		this.popMatrix();
	}

	displayPlanes() {
		this.pushMatrix();
		this.translate(0.75, 0.1, -17);
		this.rotate(-Math.PI / 2, 1, 0, 0);
		this.platTex.apply();
		this.planeD.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(0.75, 0.1, 17);
		this.rotate(-Math.PI / 2, 1, 0, 0);
		this.planeR.display();
		this.popMatrix();

		this.materialDefault.apply();
	}

	displayCar() {
		this.pushMatrix();
		this.translate(this.car.centerX, this.car.centerY, this.car.centerZ);
		this.rotate(this.car.angleCar, 0, 1, 0);
		this.car.setTexture(this.vehicleAppearances[this.currVehicleAppearance]);
		this.car.display();
		this.popMatrix();
	}

	displaySolids() {

		this.vehicleAppearances[1].apply();

		this.pushMatrix();
		this.translate(-8, 5, -10);
		this.rotate(-Math.PI / 2, 1, 0, 0);
		this.scale(1, 2, 2);
		this.lamp.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(-11, 10, -10);
		this.rotate(Math.PI / 2, 1, 0, 0);
		this.scale(1, 1, 5);
		this.cylinder.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(-14, 5, -10);
		this.scale(2, 2, 2);
		this.trapeze.display();
		this.popMatrix();

		this.materialDefault.apply();
	}

	doSomething() {
		console.log("Doing something...");
		console.log(this.option1);
	};

	checkKeys() {
		var text = "Keys pressed: ";
		this.keysPressed = false;

		if (this.gui.isKeyPressed("KeyW")) {
			text += " W ";
			this.keysPressed = true;
			this.keyWPressed = true;
		} else
			this.keyWPressed = false;

		if (this.gui.isKeyPressed("KeyS")) {
			text += " S ";
			this.keysPressed = true;
			this.keySPressed = true;
		} else
			this.keySPressed = false;

		if (this.gui.isKeyPressed("KeyA")) {
			text += " A ";
			this.keysPressed = true;
			this.keyAPressed = true;
		} else
			this.keyAPressed = false;

		if (this.gui.isKeyPressed("KeyD")) {
			text += " D ";
			this.keysPressed = true;
			this.keyDPressed = true;
		} else
			this.keyDPressed = false;

		if (this.keysPressed)
			console.log(text);
	};

	update(currTime) {

		this.checkKeys();

		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		if (Math.abs(this.car.centerX) <= 2 &&
			Math.abs(this.car.centerZ - 17) <= 2 &&
			this.crane.state == 'DEF' &&
			Math.abs(this.car.vel) <= 0.0001) {
			this.car.controlOn = false;
			this.crane.state = 'GRAB';
		}
		if (this.car.controlOn)
			this.car.move(this.deltaTime);

		this.crane.update(this.deltaTime);
	}
};