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


		this.v0 = 5;
		this.gravity = 1.8;
		this.angle = Math.PI/6;
		this.rotAngle = -Math.PI/6;
		this.otherAngle = this.rotAngle;
		this.v0x = this.v0*Math.cos(this.angle);
		this.v0y = this.v0*Math.sin(this.angle);
		this.dt = 0.1;
		this.t = 0;

		this.rotDown = 0.005;
		this.rotPlane = 0.007;
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

	fly(deltaTime)
	{	
		if(this.Y >= 0)
		{
			if(this.X<=0.2)
			{
				this.setPos(this.X, this.Y-0.01*deltaTime, this.Z);
				this.rotAngle-=deltaTime*this.rotDown;

			}
			else
			{
				this.setPos(this.initX - this.v0x*deltaTime,
				this.initY + this.v0y*deltaTime - 0.5*this.gravity*deltaTime*deltaTime,
				this.Z);
				this.rotAngle+=deltaTime*this.rotPlane;

			}
		}
	};

	display()
	{
		if(this.Y>=0)
		{
			this.scene.rotate(this.rotAngle,0,0,1);
		}

		super.display();
	}

	setPos(x,y,z)
	{
		this.X = x;
		this.Y = y;
		this.Z = z;
	};
};
