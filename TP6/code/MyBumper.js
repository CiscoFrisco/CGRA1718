/**
 * MyBumper
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyBumper extends CGFobject
{
	constructor(scene, slices, stacks, outside = true, face = false, half = false,minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
		super(scene);

		this.slices = slices;

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

		this.initBuffers();
	};

	initBuffers() 
	{
		var alpha = Math.PI/this.slices;

		this.vertices = [];
		this.normals = [];
		this.indices = [];
		this.texCoords = [];

		var incS = (this.maxS - this.minS)/this.slices;



	   for(var j = 0; j <= this.slices; j++)
	   {
			this.vertices.push(Math.cos(j*alpha),Math.sin(j*alpha),0);
        	this.normals.push(0,0,1);
			this.texCoords.push(Math.cos(alpha) ,1);
			
			this.vertices.push(Math.cos(j*alpha),1,0);
        	this.normals.push(0,0,1);
        	this.texCoords.push(Math.cos(alpha) ,0);
		}
		
		var ind = 0;

		for(let j = 0; j <= this.slices*2 - 1; j++)
		{	
		      if(ind % 2 == 0)
			     this.indices.push(ind, ind + 1, ind + 2);
			  else
			     this.indices.push(ind, ind+2, ind+1);
		
			ind++;
		}

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
