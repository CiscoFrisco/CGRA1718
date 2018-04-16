/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject
{
	constructor(scene, slices, stacks = 1) 
	{
		super(scene);
        this.slices = slices;
		this.stacks = stacks;
        
        this.cylinder = new MyCylinder(scene, this.slices, this.stacks);
        this.front = new MyPoligon(scene, this.slices);
        this.seconds = new MyClockHand(scene, 20, 1,0.005,0.45,0.005);
        //this.seconds.setAngle(270);
        this.minutes = new MyClockHand(scene, 20,1,0.01,0.3,0.01);
		//this.minutes.setAngle(180);
        this.hours = new MyClockHand(scene, 20,1,0.01,0.2,0.01);
		//this.hours.setAngle(90);


        this.clockAppearance = new CGFappearance(this.scene);
		this.clockAppearance.setDiffuse(1,1,1,1);
		this.clockAppearance.setSpecular(0.2,0.2,0.2,0.2);
		this.clockAppearance.setShininess(10);
		this.clockAppearance.loadTexture("../resources/images/clock.png");
    };

	display() 
	{
	    //sides of clock
	    this.scene.pushMatrix()
	       this.scene.materialDefault.apply();
		   this.scene.scale(0.5, 0.5, 0.1);
	       this.cylinder.display();
	    this.scene.popMatrix();

        //clock face
	    this.scene.pushMatrix();
	   	 this.scene.translate(0,0,0.1);
	   	  this.scene.scale(0.5, 0.5, 1);
		  this.clockAppearance.apply();
		  this.front.display();
		this.scene.popMatrix();

        //hours pointer
		this.scene.pushMatrix()
		  this.scene.materialDefault.apply();
		  this.scene.translate(0,0,0.1);
		  this.hours.display();
		this.scene.popMatrix();

        //minutes pointer
		this.scene.pushMatrix()
		  this.scene.materialDefault.apply();
		  this.scene.translate(0,0,0.1);
		  this.minutes.display();
		this.scene.popMatrix();

		//seconds pointer
		this.scene.pushMatrix()
		  this.scene.materialDefault.apply();
		  this.scene.translate(0,0,0.1);
		  this.seconds.display();
		this.scene.popMatrix();
	};

	update(currTime)
	{
		var secVel = 2*180/(60*1000);
		var minVel = 2*180/(60*60*1000);
		var hourVel = 2*180/(60*60*24*1000);

		this.seconds.setAngle(currTime*secVel);
		this.minutes.setAngle(currTime*minVel);
		this.hours.setAngle(currTime*hourVel);
	};
};
