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

		this.materialWood = new CGFappearance(this.scene);
		this.materialWood.setAmbient(0.3,0.3,0.3,1);
		this.materialWood.setDiffuse(0.87,0.72,0.53,1);
		this.materialWood.setSpecular(0.2,0.1,0.05,0.2);
		this.materialWood.setShininess(10);

		this.materialMetal = new CGFappearance(this.scene);
		this.materialMetal.setAmbient(0.3,0.3,0.3,1);
		this.materialMetal.setDiffuse(0.73,0.77,0.8,0.5);
		this.materialMetal.setSpecular(0.9,0.92,1,1);
		this.materialMetal.setShininess(120); 
	};

	display()
	{
	    this.scene.pushMatrix();
        this.scene.scale(0.3,3.5,0.3);
        this.scene.translate(-7,0.5,-4);
        this.materialMetal.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.3,3.5,0.3);
        this.scene.translate(7,0.5,-4);
        this.materialMetal.apply();

        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.3,3.5,0.3);
        this.scene.translate(-7,0.5,4);
        this.materialMetal.apply();

        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.3,3.5,0.3);
        this.scene.translate(7,0.5,4);
        this.materialMetal.apply();

        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(5,0.3,3);
        this.scene.translate(0,12,0);
        this.materialWood.apply();
        this.cube.display();
        this.scene.popMatrix();

	}
    
};
