/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyQuad extends CGFobject
{
	constructor(scene, minS, maxS, minT, maxT) 
	{
		super(scene);
		this.initBuffers();

		minS = typeof minS !== 'undefined' ? minS : 0;
		maxS = typeof maxS !== 'undefined' ? maxS : 1;
		minT = typeof minT !== 'undefined' ? minT : 0;
		maxT = typeof maxT !== 'undefined' ? maxT : 1;

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;
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

		
		this.texCoords = [
			0,0,
			0,1,
			1,1,
			1,0
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
