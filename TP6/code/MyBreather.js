/**
 * MyBreather
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyBreather extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

        this.trapeze = new My3DTrapeze(scene,1,0.5,1,1,0.2);
        this.rectangle = new MyQuad(scene);

        


        this.trapeze.initBuffers();
        this.rectangle.initBuffers();
	};


	display()
	{
		this.scene.carTexture.apply();
		
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2,0,1,0);
			this.trapeze.display();
		this.scene.popMatrix();

				this.scene.breatherColor.apply();


		this.scene.pushMatrix();
			this.scene.translate(0,0,0.5);
			this.rectangle.display();
		this.scene.popMatrix();		  
	};
};