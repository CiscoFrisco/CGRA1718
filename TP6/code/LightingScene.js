var degToRad = Math.PI / 180.0;

class LightingScene extends CGFscene {
	constructor() {
		super();
	};

	init(application) {
		super.init(application);

		this.initCameras();
		this.enableTextures(true);
		this.initLights();

		this.gl.clearColor(126.0/255, 192.0/255, 238.0/255, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		this.option1 = true;
		this.option2 = false;
		this.speed = 3;

		this.altimetry = [
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

		this.myAltimetry = [
		[6.0, 6.0, 4.0, 1.0, 1.5, 1.4, 1.3, 1.3, 1.3],
		[5.0, 5.0, 2.0, 4.0, 3.5, 3.4, 4.3, 1.3, 1.3],
		[3.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
		[2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
		[0.0, 0.0, 0.2, 0.0, 1.5, 2.1, 0.0, 0.0, 0.0],
		[2.0, 2.0, 0.2, 0.0, 1.5, 2.1, 0.0, 0.0, 0.0],
		[3.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
		[5.0, 5.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
		[6.0, 6.0, 3.0, 1.0, 2.5, 2.4, 2.3, 1.3, 1.3]
		];


		this.terrainTexture = new CGFappearance(this);
		this.terrainTexture.loadTexture("../resources/images/terrain.jpg")
		this.terrainTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		// Scene elements
		this.car = new MyCar(this);
		this.crane = new MyCrane(this);
		this.terrain = new MyTerrain(this, 8, 50.0, 50.0, 0, 1, 0, 1, this.myAltimetry, this.terrainTexture);
		
		this.lamp = new MyLamp(this, 20, 20);

		//this.terrain = new Plane(this, 8, 50.0, 50.0, 0, 10, 0, 10);
		// Materials
		this.materialDefault = new CGFappearance(this);

		//Textures
		this.enableTextures(true);
	
		

		this.defaultTexture = new CGFappearance(this);
		this.defaultTexture.setAmbient(0.2, 0.2, 0.2, 1.0);
		this.defaultTexture.setDiffuse(0.2, 0.2, 0.2, 1.0);


		this.drawAxis = true;

		this.fps = 60;
		this.setUpdatePeriod(1000 / this.fps);
		this.time = 0;

		var vidalTexture = new CGFappearance(this);
		vidalTexture.loadTexture("../resources/images/raul_vidal.png");

		var maregaTexture = new CGFappearance(this);
		maregaTexture.loadTexture("../resources/images/marega.png");

		this.vehicleAppearances = [vidalTexture, maregaTexture];
		this.vehicleAppearanceList = {};
		this.vehicleAppearanceList["vidal"] = 0;
		this.vehicleAppearanceList["marega"] = 1;

		this.currVehicleAppearance = 0;

		this.keyWPressed = false;
		this.keySPressed = false;
		this.keyAPressed = false;
		this.keyDPressed = false;

	};

	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() {
		this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1);

		this.lights[0].setPosition(15, 2, 5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();
		this.lights[0].update();
		this.light1 = true;
		
		// Positions for four lights
		//this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		//this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 6, 5, 1);
		//this.lights[3].setVisible(true)
		
		this.lights[4].setPosition(0.1, 4, 7, 1);
		//this.lights[4].setVisible(true);
		
		//this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		//this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0,1.0,1.0,1.0);

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0,1.0,0.0,1.0);
		
		this.lights[4].setAmbient(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0,1.0,1.0,1.0);

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

	checkLights()
	{
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
		if(this.drawAxis)
			this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		
		this.pushMatrix();
			this.translate(this.car.centerX,this.car.centerY,this.car.centerZ);
			this.translate(3,0.5,0.5);
			this.rotate(this.car.angleCar,0,1,0);
			this.scale(0.4,0.4,0.4);
			this.car.setTexture(this.vehicleAppearances[this.currVehicleAppearance]);
		this.car.display();	
		this.popMatrix();
		
		//this.terrainTexture.apply();
		this.terrain.display();
		//this.crane.display();
		
		this.vehicleAppearances[this.currVehicleAppearance].apply();
		//this.lamp.display();

		// ---- BEGIN Scene drawing section




		// ---- END Scene drawing section	
	};

	doSomething() {
		console.log("Doing something...");
		console.log(this.option1);
	};

	checkKeys() {
		var text = "Keys pressed: ";
		var keysPressed = false;

		if (this.gui.isKeyPressed("KeyW")) {
			text += " W ";
			keysPressed = true;
			this.keyWPressed = true;
		}
		else
			this.keyWPressed = false;

		if (this.gui.isKeyPressed("KeyS")) {
			text += " S ";
			keysPressed = true;
			this.keySPressed = true;
		}
		else
			this.keySPressed = false;

		if (this.gui.isKeyPressed("KeyA")) {
			text += " A ";
			keysPressed = true;
			this.keyAPressed = true;
		}
		else
			this.keyAPressed = false;

		if (this.gui.isKeyPressed("KeyD")) {
			text += " D ";
			keysPressed = true;
			this.keyDPressed = true;
		}
		else
			this.keyDPressed = false;

		if (keysPressed)
			console.log(text);
	};

	update(currTime) {

		this.checkKeys();

		this.lastTime=this.lastTime || 0;
		this.deltaTime=currTime-this.lastTime;

		this.lastTime = currTime;
		var dir = 0;
		var incX = 0;
		var incY = 0;
		var dirAngle = 0;
		var wheelRot = 1;
		var speed_inc = 0.0001;
		var reverting_speed_inc = 0.0005;

		this.crane.update();
		
		if(this.keyWPressed)
		{
			wheelRot = -1;

			if(this.car.vel < 0)
				this.car.vel += reverting_speed_inc; 
			
			else if(this.car.vel < 0.1)
				this.car.vel += speed_inc;

			if(this.keyAPressed)
			{
				dir = 1;
				dirAngle = 0.05;
			}
			else if(this.keyDPressed)
			{
				dir = -1;
				dirAngle = -0.05;
			}
			
			this.car.update(this.deltaTime,dir, dirAngle);
		}
		else if(this.keySPressed)
		{
			wheelRot = 1;

			if(this.car.vel > 0)
				this.car.vel -= reverting_speed_inc; 
			
			else if(this.car.vel > -0.1)
				this.car.vel -= speed_inc;

			if(this.keyAPressed)
			{
				dir = 1;				
				dirAngle = -0.05;
			}
			else if(this.keyDPressed)
			{
				dir = -1;
				dirAngle = 0.05;
			}
			
			this.car.update(this.deltaTime, dir, dirAngle);

		}
		else
		{
			if(this.car.vel < 0.0001 && this.car.vel > -0.0001)
				this.car.vel = 0;
			else if(this.car.vel > 0)
				this.car.vel -= speed_inc;
			else if(this.car.vel < 0)
				this.car.vel += speed_inc;

			
			this.car.update(this.deltaTime,this.direction);
		}
	}	

};