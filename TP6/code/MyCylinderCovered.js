/**
 * MyCylinderCovered
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


class MyCylinderCovered extends CGFobject{

    constructor(scene, slices, stacks) 
	{
		super(scene);
		this.cylinder = new MyCylinder(scene, slices, stacks);
		this.circle =new MyPoligon(scene, slices);
		this.stacks = stacks;
	};

	display()
	{
        this.scene.pushMatrix();
        this.cylinder.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.rotate(Math.PI,1,0,0);
        this.circle.display();
        this.scene.popMatrix();   
	}

}