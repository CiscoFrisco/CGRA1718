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

        this.rectangle = new MyQuad(scene);
        this.breather = new MyBreather(scene);
        this.spoiler = new MySpoiler(scene);

        this.barrel = new MyCylinder(scene,20,20);

        this.wheel.initBuffers();
        this.chassi.initBuffers();
	};


	display()
	{
		this.scene.carTexture.apply(),
		this.scene.pushMatrix();
			this.chassi.display();
		this.scene.popMatrix();

		//draw wheels
		this.scene.pushMatrix();
		    this.scene.translate(-5,-0.5,2);
			this.scene.scale(0.8,0.8,0.8);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		    this.scene.translate(2,-0.5,2);
			this.scene.scale(0.8,0.8,0.8);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		    this.scene.translate(-5,-0.5,-2);
			this.scene.scale(0.8,0.8,0.8);
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		    this.scene.translate(2,-0.5,-2);
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
		this.scene.eyesTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-0.75,1.5,0);
			this.scene.rotate(Math.PI/6,0,0,1);
			this.scene.scale(1,0.9,4.2);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.rectangle.display();
		this.scene.popMatrix();

		//mouth
		this.scene.mouthTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(5.05,0,0);
			this.scene.scale(1,0.9,4.2);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.rectangle.display();
		this.scene.popMatrix();
		
		//breather
		this.scene.pushMatrix();
			this.scene.translate(2.5,1.1,0);
			this.scene.scale(1.5,0.3,1.5);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.breather.display();
		this.scene.popMatrix();		

		//spoiler
		
		this.scene.pushMatrix();
			this.scene.translate(-6,1.5,0);
			this.spoiler.display();
		this.scene.popMatrix();	

	};
};