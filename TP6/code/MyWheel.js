/**
 * MyWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheel extends CGFobject
{
	constructor(scene, slices, stacks, minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
		super(scene);

        this.cylinder = new MyCylinder(scene, slices,stacks);
        this.front = new MyPoligon(scene, slices);  
        this.back = new MyPoligon(scene, slices);  
        this.polygon
	};

	initBuffers() 
	{
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};