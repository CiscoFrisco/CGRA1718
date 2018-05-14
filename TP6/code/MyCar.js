/**
 * MyCar
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCar extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

        this.chassi = new MyChassi(scene);
        this.wheel = new MyWheel(scene, 20,20,20);
        this.lamp = new MyLamp(scene,20,20);
        this.leftmirror = new MyMirror(scene,20,20);
        this.rightmirror = new MyMirror(scene,20,20, true); 
        this.rightwindooh = new MyTrapeze(scene, 1, 0.7,1,0.05);
		this.leftwindooh = new MyTrapeze(scene, 1, 0.7,1,-0.05);

        this.angleCar = 0;

        this.rectangle = new MyQuad(scene);
        this.breather = new MyBreather(scene);
        this.spoiler = new MySpoiler(scene);

        this.barrel = new MyCylinder(scene,20,20);

        this.wheel.initBuffers();
        this.chassi.initBuffers();

        this.centerX = 0;
        this.centerY = 0;
        this.centerZ = 0;
        this.angle = 0;
        this.direction = 0;
        this.vel = 0;

        this.controlOn = true;

		this.carTexture = new CGFappearance(this.scene);	

		this.eyesTexture = new CGFappearance(this.scene);
		this.eyesTexture.loadTexture("../resources/images/cars_eyes.png");

		this.mouthTexture = new CGFappearance(this.scene);
		this.mouthTexture.loadTexture("../resources/images/cars_mouth.png");

		this.windoohTexture = new CGFappearance(this.scene);
		this.windoohTexture.loadTexture("../resources/images/windooh.png");

		this.lightTexture = new CGFappearance(this.scene);
		this.lightTexture.loadTexture("../resources/images/car_light.png");
		
	};

	setTexture(texture)
	{
		this.carTexture = texture;
	}

	display()
	{			
		this.carTexture.apply();
		
		this.scene.pushMatrix();
		this.chassi.display();
		this.scene.popMatrix();

		//spoiler
		
		this.scene.pushMatrix();
			this.scene.translate( -6,1.5,0);
			this.spoiler.display();
		this.scene.popMatrix();

				//breather
		this.scene.pushMatrix();
			this.scene.translate(2.5,1.1,0);
			this.scene.scale(1.5,0.3,1.5);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.breather.display();
		this.scene.popMatrix();		

		//mirrors

		this.carTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-1,1.5,2.6);
			this.scene.scale(0.3,0.5,0.3);
			this.rightmirror.display();
		this.scene.popMatrix();

		this.carTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-1,1.5,-2.6);
			this.scene.scale(0.3,0.5,0.3);
			this.leftmirror.display();
		this.scene.popMatrix();

		//draw wheels
		this.scene.pushMatrix();
		    this.scene.translate(-5,-0.5,2);
		    this.scene.rotate(this.angle,0,0,1);
			this.scene.scale(0.8,0.8,0.8);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		    this.scene.translate(2,-0.5,2);
			if(this.direction != 0)
				this.scene.rotate(this.direction + Math.PI,0,1,0);
			else
				this.scene.rotate(this.direction,0,1,0);			
			this.scene.rotate(this.angle,0,0,1);
			this.scene.scale(0.8,0.8,0.8);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		    this.scene.translate(-5,-0.5,-2);
			this.scene.rotate(this.angle,0,0,1);
			this.scene.scale(0.8,0.8,0.8);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		    this.scene.translate(2,-0.5,-2);
		  	if(this.direction != 0)
				this.scene.rotate(this.direction + Math.PI,0,1,0);
			else
				this.scene.rotate(this.direction,0,1,0);
			this.scene.rotate(this.angle,0,0,1);
			this.scene.scale(0.8,0.8,0.8);
			this.wheel.display();
		this.scene.popMatrix();

		//barrels
		this.scene.pushMatrix();
		    this.scene.translate(2,-0.5,-2);
			this.scene.scale(0.1,0.1,4);
			this.barrel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		    this.scene.translate(-5,-0.5,-2);
			this.scene.scale(0.1,0.1,4);
			this.barrel.display();
		this.scene.popMatrix();


		//eyes
		this.eyesTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-0.75,1.5,0);
			this.scene.rotate(Math.PI/6,0,0,1);
			this.scene.scale(1,0.9,4.2);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.rectangle.display();
		this.scene.popMatrix();

		//mouth
		this.mouthTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(5.05,0,0);
			this.scene.scale(1,0.9,4.2);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.rectangle.display();
		this.scene.popMatrix();
		

		this.lightTexture.apply();
		
		//lamps
		this.scene.pushMatrix();
			this.scene.translate(5,0,1.7);
			this.scene.scale(0.3,0.5,0.3);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.lamp.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(5,0,-1.7);
			this.scene.scale(0.3,0.5,0.3);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.lamp.display();
		this.scene.popMatrix();

		//windoohs!!!!
		this.windoohTexture.apply();
		this.scene.pushMatrix();
			this.scene.translate(-3,1.4,2.21);
			this.scene.scale(4.5,0.8,1);
			this.rightwindooh.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3,1.4,-2.21);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.scale(4.5,0.8,1);
			this.leftwindooh.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-5.1,1.5,0);
			this.scene.rotate(-Math.PI/4,0,0,1);
			this.scene.scale(1,1,4);
			this.scene.rotate(-Math.PI/2,0,1,0);
			this.rectangle.display();
		this.scene.popMatrix();

	};

	update(currTime, dir=0, angle = 0)
	{			
		this.centerX+=currTime*this.vel*Math.cos(this.angleCar);
		this.centerZ-=currTime*this.vel*Math.sin(this.angleCar);

		this.angle -= currTime*this.vel;
		
		this.angleCar += angle;
		
		this.direction = dir*10;
	};
};