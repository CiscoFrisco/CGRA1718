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

		this.car = new MyVehicle(this, 10, 1.3, 12);
		this.crane = new MyCrane(this, 'UP', 'D');
		this.terrain = new MyTerrain(this, 8, 50.0, 50.0, 0, 5, 0, 5, myAltimetry, this.terrainAppearances[this.currTerrainAppearance]);

		this.platform = new MyQuad(this);
		this.planeZ = 17;
		this.planeX = 0.75;

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

		this.fps = 60;
		this.setUpdatePeriod(1000 / this.fps);

		this.keyWPressed = false;
		this.keySPressed = false;
		this.keyAPressed = false;
		this.keyDPressed = false;
	};

	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(100, 100, 100), vec3.fromValues(0, 0, 0));
	};

	initLights() {
		this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1)

		// Positions for five lights

		this.lights[0].setPosition(15, 10, 15, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);

		this.lights[1].setPosition(-15, 10, 15, 1.0);
		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

		this.lights[2].setPosition(15, 10, -15, 1);
		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 0.0, 1.0);

		this.lights[3].setPosition(-15, 10, -15, 1);
		this.lights[3].setAmbient(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);

		this.lights[4].setPosition(0, 10, 0, 1);
		this.lights[4].setAmbient(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);

		//Attenuation
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(0);
		this.lights[2].setQuadraticAttenuation(1);
		
		//Enable
		this.lights[0].enable();
		this.lights[1].enable();
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

	checkLight(enabled, light)
	{
		if(enabled)
			light.enable();
		else
			light.disable();
	};

	checkLights() {

		this.checkLight(this.light1, this.lights[0]);
		this.checkLight(this.light2, this.lights[1]);
		this.checkLight(this.light3, this.lights[2]);
		this.checkLight(this.light4, this.lights[3]);
		this.checkLight(this.light5, this.lights[4]);

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

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		this.materialDefault.apply();

		if (!this.car.attached)
			this.displayCar();

		this.terrain.setTexture(this.terrainAppearances[this.currTerrainAppearance]);
		this.terrain.display();

		this.displayCrane();

		this.displayPlatforms();

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

	displayPlatforms() {

		this.platTex.apply();

		//Deposit
		this.pushMatrix();
		this.translate(this.planeX, 0.1, -this.planeZ);
		this.rotate(-Math.PI / 2, 1, 0, 0);
		this.scale(17,10,1);
		this.platform.display();
		this.popMatrix();
		
		//Recovery
		this.pushMatrix();
		this.translate(this.planeX, 0.1, this.planeZ);
		this.rotate(-Math.PI / 2, 1, 0, 0);
		this.scale(17,10,1);
		this.platform.display();
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

		this.vehicleAppearances[this.currVehicleAppearance].apply();

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

	checkKey(keyID)
	{
		if(this.gui.isKeyPressed(keyID))
		{
			this.keysPressed = true;
			return true;
		}
		
		return false;
	};

	checkKeys() {
		this.keysPressed = false;

		this.keyWPressed = this.checkKey("KeyW");
		this.keySPressed = this.checkKey("KeyS");
		this.keyAPressed = this.checkKey("KeyA");
		this.keyDPressed = this.checkKey("KeyD");
	};
	
	cmpCoords(x1, x2, z1, z2, limit)
	{
		return Math.abs(x2-x1)<= limit && Math.abs(z2 -z1) <=limit;
	};

	update(currTime) {

		this.checkKeys();

		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		var GrabSpeed = 0.0001;
		var limit = 5;
		
		if (this.cmpCoords(this.car.centerX, this.planeX, this.car.centerZ, this.planeZ, limit) &&
			this.crane.state == 'DEF' &&
			Math.abs(this.car.vel) <= GrabSpeed) {
			this.car.controlOn = false;
			this.crane.state = 'GRAB';
		}
		if (this.car.controlOn)
			this.car.move(this.deltaTime);

		this.crane.update(this.deltaTime);
	}
};