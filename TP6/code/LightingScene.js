var degToRad = Math.PI / 180.0;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	init(application) 
	{
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
		
		this.option1=true; this.option2=false; this.speed=3;


		// Scene elements
		
		//this.trapeze = new My3DTrapeze(this);
		//this.cylinder = new MyCylinderRound(this, 20, 20);
		this.wheel = new MyWheel(this,20,20, 20);
		// Materials
		this.materialDefault = new CGFappearance(this);
		
		//Textures

		
		this.fps = 60;
		this.setUpdatePeriod(1000/this.fps);
		this.time = 0;
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0.3,0.3,0.3, 1);
		

        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
        this.lights[0].enable();
        this.lights[0].update();

	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


	display() 
	{
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
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup
		
		// ---- BEGIN Scene drawing section
		
		if(this.angle >= 2*Math.PI)
			this.angle = 0;
		else
			this.angle += 0.05;

		this.y += 0.1;

		this.pushMatrix();
		//this.scale(2,1,1);
		//this.trapeze.display();
		//this.cylinder.display();
		this.wheel.display();
		this.popMatrix();


		// ---- BEGIN Scene drawing section
		


	
		// ---- END Scene drawing section	
	};

	doSomething()
	{ 
		console.log("Doing something..."); 
	};

};
