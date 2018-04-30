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

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		this.option1 = true;
		this.option2 = false;
		this.speed = 3;


		// Scene elements

		this.trapeze = new My3DTrapeze(this, 0.5, 1, 2, 2, 1);
		this.wheel = new MyWheel(this, 20, 20, 20);
		// Materials
		this.materialDefault = new CGFappearance(this);

		//Textures
		this.enableTextures(true);

		this.tireTexture = new CGFappearance(this);
		this.tireTexture.loadTexture("../resources/images/tire.png");

		this.rimTexture = new CGFappearance(this);
		//this.rimTexture.loadTexture("../resources/images/rims.png");
		this.rimTexture.setAmbient(0.5, 0.5, 0.5, 1.0);
		this.rimTexture.setDiffuse(192.0/255, 192.0/255, 192.0/255, 1.0);

		this.defaultTexture = new CGFappearance(this);
		this.defaultTexture.setAmbient(0.2, 0.2, 0.2, 1.0);
		this.defaultTexture.setDiffuse(0.2, 0.2, 0.2, 1.0);


		this.drawAxis = true;

		this.fps = 60;
		this.setUpdatePeriod(1000 / this.fps);
		this.time = 0;
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

	};

	updateLights() {

		if(this.light1)
			this.lights[0].enable();
		else 
			this.lights[0].disable();

		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
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
		this.rotate(-Math.PI/2,0,1,0);
		this.trapeze.display();
		this.popMatrix();


		// ---- BEGIN Scene drawing section




		// ---- END Scene drawing section	
	};

	doSomething() {
		console.log("Doing something...");
		console.log(this.option1);
	};

};