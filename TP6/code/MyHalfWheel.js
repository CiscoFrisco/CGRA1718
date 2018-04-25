/**
 * MyHalfWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyHalfWheel extends CGFobject
{
	constructor(scene, slices, stacks, num_bumps, minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
		super(scene);

        this.cylinder = new MyCylinderRound(scene, slices,stacks);
        this.num_bumps = num_bumps;
        this.size_of_bump = 2/this.num_bumps;
        this.angle = 0;
        this.inc = 2*Math.PI/this.num_bumps;
	};

	initBuffers() 
	{
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	display()
	{
		this.scene.pushMatrix();
			this.cylinder.display();
		this.scene.popMatrix();

        for(let i = 0; i < this.num_bumps; i++)
        {
            this.scene.pushMatrix();
                this.scene.translate(Math.cos(this.angle), Math.sin(this.angle), 0);
                this.scene.scale(/*0.05*/this.size_of_bump,/*0.05 */this.size_of_bump, 1);
                this.cylinder.display();
            this.scene.popMatrix();

            this.angle += this.inc;
        }
		
	};
};