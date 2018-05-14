/**
 * MyLamp
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyLamp extends CGFobject
{
	constructor(scene, slices, stacks, minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.maxS =maxS;
		this.minS =minS;
		this.minT =minT;
		this.maxT =maxT;
		
		this.initBuffers();
	};

	initBuffers() 
	{
		var alpha = 2*Math.PI/this.slices;
		var beta = (Math.PI/2)/this.stacks;
		this.vertices = [];
		this.normals = [];
		this.indices = [];
		this.texCoords =[];
		
		var z = 0;
		var raio = 1;

	    var incS = (this.maxS - this.minS)/this.slices;
		var incT = (this.maxT - this.minT)/this.stacks;
		
		for(var i = 0; i < this.stacks; i ++)
		{	
			if(i > 0)
				raio = Math.cos(Math.asin(z));

			for(var j = 0; j <= this.slices; j++)
			{
				this.vertices.push(Math.cos(j*alpha)*raio, Math.sin(j*alpha)* raio,z);
				this.normals.push(Math.cos(j*alpha), Math.sin(j*alpha), raio);
				if((j*alpha) >= Math.PI/2 && (j*alpha) <= 3*Math.PI/2)
					if((j*alpha) >= Math.PI/2 && (j*alpha) <= Math.PI)
		  	    		this.texCoords.push(0.5 + (Math.cos(j*alpha)/2) + incS*i, 0.5 - (Math.sin(j*alpha)/2) + incT*i);
		  	    	else
		  	    		this.texCoords.push(0.5 + (Math.cos(j*alpha)/2) + incS*i, 0.5 + (Math.sin(j*alpha)/2) + incT*i);
				else
				{
					if((j*alpha) >= 3*Math.PI/2 && (j*alpha) <= 2*Math.PI)
						this.texCoords.push(0.5 + (Math.cos(j*alpha)/2), 0.5 + (Math.sin(j*alpha)/2) + incT*i);
					else
						this.texCoords.push(0.5 + (Math.cos(j*alpha)/2), 0.5 - (Math.sin(j*alpha)/2) + incT*i);
				}

			}	

			z += 1/this.stacks;
						
		}
		this.vertices.push(0,0,1);
		this.normals.push(Math.cos(j*alpha), Math.sin(j*alpha), raio);
		this.texCoords.push(0.5,0.5);

				
		var ind = 0;

		for(let i = 0; i < this.stacks - 1;i++)
		{
			for(let j = 0; j <= this.slices; j++)
			{	
				if(j != this.slices)
				{
					this.indices.push(ind, ind + 1, ind + this.slices + 1);
					this.indices.push(ind + this.slices + 1, ind +1, ind + this.slices + 2);
				}
				else
				{
					//this.indices.push(ind, ind - 1, i*this.slices);
					//this.indices.push(ind - 1, i*this.slices + this.slices - 1, i*this.slices);
				}

				ind++;
			}
		}

		var vert_ind = ind+this.slices + 1;
		var first_ind = ind;

		for(let i = 0; i <= this.slices; i++)
		{	
		if(i == this.slices)
		{
			this.indices.push(ind,first_ind, vert_ind);
		}
		else
		{
			this.indices.push(ind,ind+1, vert_ind);
		}
			ind++;
		}

		console.log(this.vertices.length);	
		console.log(this.normals.length);
		console.log(this.indices.length);
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
