/**
 * MyChassi
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

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