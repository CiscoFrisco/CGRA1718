/**
 * MyPaperAirplane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperAirplane extends CGFobject
{
	constructor(scene, initX, initY, initZ) 
	{
		super(scene);

		this.initX = initX;
		this.initY = initY;
		this.initZ = initZ;

		this.X = initX;
		this.Y = initY;
		this.Z = initZ;


		this.v0 = 15;
		this.gravity = 9.8;
		this.angle = Math.PI/6;
		this.rotAngle = -Math.PI/6;
		this.otherAngle = this.rotAngle;
		this.v0x = this.v0*Math.cos(this.angle);
		this.v0y = this.v0*Math.sin(this.angle);
		this.dt = 0.01;
		this.t = 0;

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
			if(this.X<=0.2)
			{
				this.setPos(this.X, this.Y-0.1*this.t, this.Z);
			}
			else
			{
				this.setPos(this.initX - this.v0x*this.t,
				this.initY + this.v0y*this.t - 0.5*this.gravity*this.t*this.t,
				this.Z);

			}
			this.t += this.dt;
			this.rotAngle+=0.01;
			this.otherAngle = this.rotAngle;

		}
	};

	display()
	{
		super.display();
		if(this.X <=0.2 && this.Y>=0.2)
		{
			this.otherAngle -= 0.01;
			this.scene.rotate(this.otherAngle,0,0,1)
		}
		else
			this.scene.rotate(this.rotAngle,0, 0, 1);
	}

	setPos(x,y,z)
	{
		this.X = x;
		this.Y = y;
		this.Z = z;

	};
};
