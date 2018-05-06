/**
 * My3DTrapeze
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class My3DTrapeze extends CGFobject {
    constructor(scene, bigBase = 1, smallBase = 0.5, depth = 1, height = 1, offset = 0, minS = 0, maxS = 1, minT = 0, maxT = 1) {
        super(scene);

<<<<<<< HEAD
        this.depth = depth;
        this.height = height;
        this.offset = offset;
        this.smallBase = smallBase;
        this.bigBase = bigBase;

        this.side_size = Math.sqrt(offset * offset + height * height);
        this.side1_angle = Math.PI / 2 - Math.atan(this.offset / this.height);
        this.side2_angle = Math.PI / 2 - Math.atan((this.bigBase / 2 - this.smallBase / 2) / this.height)

        this.front = new MyTrapeze(scene, bigBase, smallBase, height, offset);
        this.back = new MyTrapeze(scene, bigBase, smallBase, height, -offset);

        this.top = new MyQuad(scene);
        this.down = new MyQuad(scene);
        this.side1 = new MyQuad(scene);
        this.side2 = new MyQuad(scene);

        this.minS = minS;
        this.maxS = maxS;
        this.minT = minT;
        this.maxT = maxT;

        this.front.initBuffers();
        this.back.initBuffers();
        this.top.initBuffers();
        this.down.initBuffers();
        this.side1.initBuffers();
        this.side2.initBuffers();
    };

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.depth / 2);
        this.front.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.depth / 2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.back.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.offset, this.height / 2, 0);
        this.scene.scale(this.smallBase, 1, this.depth);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -this.height / 2, 0);
        this.scene.scale(this.bigBase, 1, this.depth);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.down.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.5 * this.bigBase + 0.3, 0, 0);
        this.scene.rotate(this.side2_angle, 0, 0, 1);
        this.scene.scale(this.side_size, 1, this.depth);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.side1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.bigBase / 2 - 0.3, 0, 0);
        this.scene.rotate(this.side1_angle, 0, 0, 1);
        this.scene.scale(this.side_size, 1, this.depth);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.side1.display();
        this.scene.popMatrix();
    }
};
=======
		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				-(this.bigBase)/2.0, -(this.height)/2.0, this.depth/2,
				(this.bigBase)/2.0, -(this.height)/2.0, this.depth/2,
				-(this.smallBase)/2.0 + this.offset, (this.height)/2.0, this.depth/2,
				(this.smallBase)/2.0 + this.offset, (this.height)/2.0, this.depth/2,

				-(this.bigBase)/2.0, -(this.height)/2.0,-this.depth/2,
				(this.bigBase)/2.0, -(this.height)/2.0, -this.depth/2,
				-(this.smallBase)/2.0 + this.offset, (this.height)/2.0, -this.depth/2,
				(this.smallBase)/2.0 + this.offset, (this.height)/2.0, -this.depth/2,
				];

		this.indices = [
				
				//front
				0, 1, 2, 
				3, 2, 1,

				//back
				4,6,5,
				7,5,6,
				
				//side
				1,5,3,
				7,3,5,

				//other side

				0,2,4,
				6,4,2,

				//up

				3,7,2,
				6,2,7,

				//bottom

				1,0,5,
				4,5,0,


			];


		this.texCoords = [
			0,1,
			1,1,
			0,0,
			1,0,

			0,1,
			1,1,
			0,0,
			1,0,

			
		];		
			
		this.primitiveType=this.scene.gl.TRIANGLES;

		this.normals = [0,0,1,
						0,0,1,
						0,0,1,
						0,0,1,

						0,0,-1,
						0,0,-1,
						0,0,-1,
						0,0,-1,


		];
		this.initGLBuffers();
	};

};
>>>>>>> carro
