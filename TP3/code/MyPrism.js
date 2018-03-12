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
		var alpha = 2*Math.PI/this.slices;
		this.vertices = [];
		this.normals = [];
		this.indices = [];
		var ind = 0;


		for(var i = 0; i < 2*Math.PI; i += alpha)
		{
			for(var j = 0; j <= 1; j+= 1.0/this.stacks)
			{
				this.vertices.push(Math.cos(i),Math.sin(i),j);
				this.normals.push(Math.cos((i + alpha)/2), Math.sin((i + alpha)/2), 0);
				this.vertices.push(Math.cos(i + alpha),Math.sin(i + alpha),j);
				this.normals.push(Math.cos((i + alpha)/2), Math.sin((i + alpha)/2), 0);
			}
			
			var a = 1;
			var b = 2;
			
			for(var c = 0; c < this.stacks; c++)
			{
				this.indices.push(ind,ind+a,ind+b);
				this.indices.push(ind+b,ind+a,ind+3);
				ind+=2;
			}
			ind += 2;
		}
		
		console.log(this.vertices.length);	
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
