/**
 * MyWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheel extends CGFobject
{
	constructor(scene, slices, stacks, num_bumps, minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
		super(scene);

        this.halfWheel = new MyHalfWheel(scene, slices,stacks, num_bumps);
        this.rot = Math.PI/num_bumps;
	};

	initBuffers() 
	{
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	display()
	{
		this.scene.pushMatrix();
			this.scene.scale(1,1,0.5);
			this.halfWheel.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
			this.scene.rotate(Math.PI,1,0,0);
			this.scene.rotate(this.rot, 0,0,1);
			this.scene.scale(1,1,0.5);
			this.halfWheel.display();
		this.scene.popMatrix();
	};
};