/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 class MyCrane extends CGFobject
 {
     constructor(scene)
     {
         super(scene);

         this.base = new MyCylinder(scene, 20, 20, true, true);
         this.mid = new MyCylinder(scene, 20, 20, true, true);
         this.joint = new MyCylinder(scene, 20, 20, true, true);
         this.arm = new MyCylinder(scene, 20, 20, true, true);
         this.magnet = new MyCylinder(scene, 20, 20, true, true);
         this.cable = new MyCylinder(scene, 20, 20, true, true);

     }

     display()
     {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/3, 1, 0, 0);
        this.scene.translate(0,0.3,1);
        this.scene.scale(0.6,0.6,10);
        this.mid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4,10,5.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.joint.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1, 10, 5.5);
        this.scene.rotate(Math.PI/6, 1, 0, 0);
        this.scene.scale(0.6,0.6,5);
        this.arm.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1,5.5,9.7);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.1,0.1,2);
        this.cable.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1,5.3, 9.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(2,2,0.2);
        this.magnet.display();
        this.scene.popMatrix();
     }
 };