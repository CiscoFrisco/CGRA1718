/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				-0.5, -0.5, 0,
				0.5, -0.5, 0,
				-0.5, 0.5, 0,
				0.5, 0.5, 0,
				];

		this.indices = [
				0, 1, 2, 
				3, 2, 1,
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;

		this.normals = [0,0,1,
						0,0,1,
						0,0,1,
						0,0,1,
		];
		this.initGLBuffers();
	};
};
