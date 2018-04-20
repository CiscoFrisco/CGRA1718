/**
 * MyPaperAirplane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperAirplane extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.X = 14;
		this.Y = 3.8;
		this.Z = 8;

		this.mass = 0.01;
		this.gravity = 0.8;
		this.F = this.mass*this.gravity;
		this.dt = 0.01;
		this.t = 0;

		this.initVelX = -0.1;
		this.initVelY = -0.1;

		this.angle = 0;

		this.velX = -Math.cos(this.angle)*this.initVelX;
		this.velY = Math.sin(this.angle)*this.initVelY;

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [

				1.0, 0.3, -0.1, 
				1.0,  0.3, -0.6,
				0.0, 0.3, 0.0,
				1.0, 0.0, 0.0,
				1.0, 0.3, 0.1, 
				1.0,  0.3, 0.6,
				0.0, 0.3, 0.0,
				];

		this.indices = [
				0, 1, 2, 
				0, 2, 1,
				0, 3, 2,
				0, 2, 3,
				3, 4, 6,
				3, 6, 4,
				4, 5, 6,
				4, 6, 5,
			];	
	
		this.normals = [0,0,1,
						0,0,1,
						0,0,1,
						0,0,1,
						0,0,1,
						0,0,1,
						0,0,1,
		];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	fly()
	{
		if(this.Y >= 0)
		{
			this.setVel(this.velX - (this.F/this.mass)*this.dt,
						this.velY + (this.F/this.mass)*this.dt,
						0);
			
			this.setPos(this.X + this.velX*this.dt/this.mass, 
						this.Y + this.velY*this.dt/this.mass, 
						this.Z);

			//this.angle += 0.01;
			this.t += this.dt;

			//if(this.X <= 0)
			//{
			//	this.setVel(0,this.Y + this.velY*this.dt/this.mass,0);
			//}
		}
	};

	setPos(x,y,z)
	{
		this.X = x;
		this.Y = y;
		this.Z = z;

	};

	setVel(x,y,z)
	{
		this.velX = x;
		this.velY = y;
		this.velZ = z;	
	};


};
