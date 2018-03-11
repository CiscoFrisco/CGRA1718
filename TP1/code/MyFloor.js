/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyFloor extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cube =  new MyUnitCubeQuad(scene); 
	};

	display()
	{
	    this.scene.pushMatrix();
        this.scene.scale(8,0.1,6);
        this.cube.display();
        this.scene.popMatrix();
	}
    
};
