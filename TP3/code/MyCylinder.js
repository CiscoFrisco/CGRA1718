/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
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
		
		var z = 0;

		for(let i = 0; i <= this.stacks; i ++)
		{
			for(var j = 0; j < this.slices; j++)
			{
				this.vertices.push(Math.cos(j*alpha),Math.sin(j*alpha),z);
				this.normals.push(Math.cos(j*alpha), Math.sin(j*alpha), 0);
			}	

			z += 1/this.stacks;
		}
		
		var ind = 0;

		for(let i = 0; i < this.stacks;i++)
		{
			for(let j = 0; j < this.slices; j++)
			{	
				if(j != this.slices -1 )
				{
					this.indices.push(ind, ind + 1, ind + this.slices);
					this.indices.push(ind + this.slices, ind +1, ind + this.slices + 1);
				}
				else
				{
					this.indices.push(ind, i*this.slices, ind + this.slices);
					this.indices.push(ind + this.slices, i*this.slices, (i+1)*this.slices);
				}

				ind++;
			}
		}

		console.log(this.vertices.length);	
		console.log(this.normals.length);
		console.log(this.indices.length);
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
