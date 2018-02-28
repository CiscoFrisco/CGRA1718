/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cube =  new MyUnitCubeQuad(scene); 
	};

	display()
	{
	    this.scene.pushMatrix();
        this.scene.scale(0.3,3.5,0.3);
        this.scene.translate(-7,0.5,-4);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.3,3.5,0.3);
        this.scene.translate(7,0.5,-4);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.3,3.5,0.3);
        this.scene.translate(-7,0.5,4);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.3,3.5,0.3);
        this.scene.translate(7,0.5,4);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(5,0.3,3);
        this.scene.translate(0,12,0);
        this.cube.display();
        this.scene.popMatrix();

	}
    
};
