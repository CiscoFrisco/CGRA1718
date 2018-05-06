/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

<<<<<<< HEAD
class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks, outside, face, minS = 0, maxS = 1, minT = 0, maxT = 1) {
=======
class MyCylinder extends CGFobject
{
	constructor(scene, slices, stacks, outside = true, face = false, half = false,minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
>>>>>>> carro
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;
		this.outside = outside;
		this.face = face;
		this.half = half;

		this.initBuffers();
	};

<<<<<<< HEAD
	initBuffers() {
		var alpha = 2 * Math.PI / this.slices;
=======
	initBuffers() 
	{
		var alpha = 2*Math.PI/this.slices;
		if(this.half == true)
			alpha = Math.PI/this.slices;
>>>>>>> carro
		this.vertices = [];
		this.normals = [];
		this.indices = [];
		this.texCoords = [];

		var z = 0;
		var incS = (this.maxS - this.minS) / this.slices;
		var incT = (this.maxT - this.minT) / this.stacks;

<<<<<<< HEAD
		for (let i = 0; i <= this.stacks; i++) {
			for (var j = 0; j < this.slices; j++) {
				this.vertices.push(Math.cos(j * alpha), Math.sin(j * alpha), z);
=======
		for(let i = 0; i <= this.stacks; i ++)
		{
			for(var j = 0; j <= this.slices; j++)
			{
				this.vertices.push(Math.cos(j*alpha) ,Math.sin(j*alpha),z);
>>>>>>> carro

				if (this.outside == true)
					this.normals.push(Math.cos(j * alpha), Math.sin(j * alpha), 0);
				else
					this.normals.push(-Math.cos(j * alpha), -Math.sin(j * alpha), 0);

				this.texCoords.push(this.maxS - incS * j, this.minT + incT * i);
			}

			z += 1 / this.stacks;
		}

		if (this.face == true) {
			this.vertices.push(0, 0, 1);
			this.normals.push(0, 0, 1);
		}

		var ind = 0;

<<<<<<< HEAD
		for (let i = 0; i < this.stacks; i++) {
			for (let j = 0; j < this.slices; j++) {
				if (j != this.slices - 1) {
					if (this.outside == true) {
						this.indices.push(ind, ind + 1, ind + this.slices);
						this.indices.push(ind + this.slices, ind + 1, ind + this.slices + 1);
					} else {
						this.indices.push(ind, ind + this.slices, ind + 1);
						this.indices.push(ind + this.slices, ind + this.slices + 1, ind + 1);
					}
				} else {
					if (this.outside == true) {
						this.indices.push(ind, i * this.slices, ind + this.slices);
						this.indices.push(ind + this.slices, i * this.slices, (i + 1) * this.slices);
					} else {
						this.indices.push(ind, ind + this.slices, i * this.slices);
						this.indices.push(ind + this.slices, (i + 1) * this.slices, i * this.slices);
=======
		for(let i = 0; i < this.stacks;i++)
		{
			for(let j = 0; j <= this.slices; j++)
			{		
				if(j != this.slices)
				{
					if(this.outside == true)
					{
						this.indices.push(ind, ind + 1, ind + this.slices + 1);
						this.indices.push(ind + this.slices + 1, ind +1, ind + this.slices + 2);
					}
					else
					{
						this.indices.push(ind, ind + this.slices + 1, ind + 1);
						this.indices.push(ind + this.slices + 1,ind + this.slices + 2, ind + 1);
					}
				}
				/*else if(this.half == false)
				{
					if(this.outside == true)
					{
						this.indices.push(ind , i*this.slices, ind + this.slices + 1);
						this.indices.push(ind + this.slices + 1, i*this.slices, (i+1)*this.slices + 1);
					}
					else
					{
						this.indices.push(ind, ind + this.slices + 1, i*this.slices);
						this.indices.push(ind + this.slices + 1, (i+1)*this.slices + 1, i*this.slices);
>>>>>>> carro
					}
				}*/

				ind++;
			}
		}

		if (this.face == true) {
			var vert_ind = ind + this.slices;
			var first_ind = ind;

<<<<<<< HEAD
			for (let i = 0; i < this.slices; i++) {
				if (i == this.slices - 1) {
					this.indices.push(ind, first_ind, vert_ind);
				} else {
					this.indices.push(ind, ind + 1, vert_ind);
=======
			for(let i = 0; i <= this.slices; i++)
			{	
				if(i == this.slices)
				{
					this.indices.push(ind,first_ind, vert_ind);
>>>>>>> carro
				}

				ind++;
			}
		}


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};