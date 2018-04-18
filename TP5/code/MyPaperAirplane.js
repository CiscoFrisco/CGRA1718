/**
 * MyPaperAirplane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperAirplane extends CGFobject
{
	constructor(scene, minS = 0, maxS = 1, minT= 0, maxT=1) 
	{
		super(scene);

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				0.1, 0.2, -0.5, 
				0.6,  0.2, -0.5,
				0.0, 0.2, 0.5,
				0.0, -0.1, -0.5,
				-0.1, 0.2, -0.5, 
				-0.6,  0.2, -0.5,
				0.0, 0.2, 0.5,
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


		/*this.texCoords = [
			this.maxS, this.maxT,
			this.minS, this.maxT,
			this.maxS, this.minT,
			this.minS, this.minT
		];*/		
	
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
};
