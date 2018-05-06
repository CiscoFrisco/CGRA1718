/**
 * MyChassi
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

<<<<<<< HEAD
class MyChassi extends CGFobject {
    constructor(scene, minS = 0, maxS = 1, minT = 0, maxT = 1) {
        super(scene);

        this.front = new MyTrapeze(scene);
        this.back = new MyTrapeze(scene);

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
        this.scene.translate(0, 0, 0.5);
        this.front.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.back.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.scale(0.5, 1, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.down.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.35, 0, 0);
        this.scene.rotate(2 * Math.PI / 3.5, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.side1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.35, 0, 0);
        this.scene.rotate(-2 * Math.PI / 3.5, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.side1.display();
        this.scene.popMatrix();
    }
};
=======
class MyChassi extends CGFobject
{
	constructor(scene, minS = 0, maxS = 1, minT= 0, maxT=1) 
	{
		super(scene);

		this.width = 4.4;
        
        this.trapeze = new My3DTrapeze(scene, 1, 0.7, this.width, 1, 0.15);
        this.trapeze2 = new My3DTrapeze(scene, 1, 0.7 , this.width,1,0.05);
        this.cube = new MyUnitCubeQuad(scene);
        this.bumper = new MyWheelBumper(scene, 20,1);
        this.cylinder = new MyCylinder(scene, 20, 1, true, true, true);

	};

	display()
	{
		var size = -6.5;

		this.scene.pushMatrix();
			this.scene.translate(size + 5.9,0.75,0);
			this.scene.scale(9.2,0.5,this.width);
            this.cube.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
			this.scene.translate(size + 0.3,0.75, 0);
			this.scene.scale(1,0.5,1);
            this.trapeze.display();
	    this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(size,0,0);
            this.trapeze.display();
            size += 1.5;
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
			this.scene.translate(size,-0.5, this.width/2);
			this.scene.scale(1,1,this.width);
            this.bumper.display();
            size += 3.5;
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
			this.scene.translate(size,-0.6, 0);
			this.scene.scale(5,0.2,1);
			this.scene.rotate(Math.PI,1,0,0);
            this.trapeze2.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
			this.scene.translate(size,0, 0);
			this.scene.scale(5,1,this.width);
			this.scene.rotate(Math.PI,1,0,0);
            this.cube.display();
            size += 3.5;
	    this.scene.popMatrix();

	     this.scene.pushMatrix();
			this.scene.translate(size,-0.5, this.width/2);
			this.scene.scale(1,1,this.width);
            this.bumper.display();
            size += 1.5;
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
			this.scene.translate(size,0,0);
			this.scene.scale(1,1,this.width);
            this.cube.display();
            size += 1;
	    this.scene.popMatrix();

	     this.scene.pushMatrix();
			this.scene.translate(-3,1.5,0);
			this.scene.scale(5,1,1);
            this.trapeze2.display();
	    this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(size,0.25, 0);
			this.scene.scale(1,1.5,1);
			this.scene.rotate(-Math.PI/2,0,0,1);
            this.trapeze.display();
	    this.scene.popMatrix();
               
	}
};
>>>>>>> carro
