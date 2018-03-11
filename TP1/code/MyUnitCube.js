/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


class MyUnitCube extends CGFobject{

    constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

    initBuffers() 
	{
		this.vertices = [
				-0.5, -0.5, -0.5,
				0.5, -0.5, -0.5,
				-0.5, 0.5, -0.5,
				0.5, 0.5, -0.5,
				-0.5, -0.5, 0.5,
				0.5, -0.5, 0.5,
				-0.5, 0.5, 0.5,
				0.5, 0.5, 0.5,
				];

		this.indices = [
                //face paralela ao eixo dos z's com z = 0
                1, 0, 3, 
				2, 3, 0,
                
                //face paralela ao eixo dos z's com z = 1
                4, 5, 6, 
                7, 6, 5,
                
                //face paralela ao eixo dos x's com x = -0.5
                4, 6, 0,
                0, 6, 2,

                //face paralela ao eixo dos x's com x = 0.5
				1, 3, 5,
                7, 5, 3,

                //face paralela ao eixo dos y's com y = -0.5
                0, 1, 5,
                5, 4, 0, 

                //face paralela ao eixo dos y's com y = 0.5
				2, 6, 7,
                7, 3, 2,
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};





}