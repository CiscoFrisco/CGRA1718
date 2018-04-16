/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{
	constructor(scene, slices, stacks, scaleX, scaleY, scaleZ, minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
		super(scene, slices, stacks);
        this.angle = 0;
        this.hand = new MyCylinder(scene, slices, stacks, minS, maxS, minT, maxT);
	    
	    this.scaleX = scaleX;
	    this.scaleY = scaleY;
	    this.scaleZ = scaleZ;
	};

	display() 
	{
        this.scene.pushMatrix();
        this.scene.rotate(-(this.angle*Math.PI/180),0,0,1);
        this.scene.scale(this.scaleX,this.scaleY,this.scaleZ);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.hand.display();     	
        this.scene.popMatrix();
        console.log(this.angle);
	};

	setAngle(angle)
	{
        this.angle += angle;
	}
};
