/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 class MyCrane extends CGFobject
 {
     constructor(scene, initAngle, initPos)
     {
         super(scene);

         this.base = new MyCylinder(scene, 20, 20, true, true);
         this.mid = new MyCylinder(scene, 20, 20, true, true);
         this.joint = new MyCylinder(scene, 20, 20, true, true);
         this.arm = new MyCylinder(scene, 20, 20, true, true);
         this.magnet = new MyCylinder(scene, 20, 20, true, true);
         this.cable = new MyCylinder(scene, 20, 20, true, true);
         
         this.angleY = initPos == 'D' ? Math.PI : 0;
         this.angleX = 0;
         this.initAngle = initAngle == 'UP' ? Math.PI/3 - 0.9 : Math.PI/3;
         
         this.maxUpAngle =  -0.9;
         this.maxDownAngle = Math.PI/3;
         this.RAngle = 0.3;

         this.inc = 0.01;

         this.state = 'DEF';
     }

     display()
     {  
     this.scene.pushMatrix();
        this.scene.rotate(this.angleY, 0,1, 0);

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
        this.scene.translate(0.4,10,5.5);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.joint.display();
        this.scene.popMatrix();

        this.scene.pushMatrix()
        this.scene.translate(0,10,5.5); 
        this.scene.pushMatrix();
        this.scene.rotate(this.initAngle + this.angleX, 1, 0, 0);
        this.scene.scale(0.5,0.6,5.4);
        this.arm.display();
        this.scene.popMatrix();        

        this.scene.pushMatrix();
                this.scene.translate(0, -Math.sin(this.angleX +this.initAngle)*5.4,Math.cos(this.angleX + this.initAngle)*5.4);
                //this.scene.rotate(Math.PI/6 + this.angleX ,1,0,0);
                this.scene.scale(0.1,2.6,0.1)
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.cable.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
                this.scene.translate(0.1,- Math.sin(this.angleX + this.initAngle)*5.4 -2.6,Math.cos(this.angleX + this.initAngle)*5.4);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.scene.scale(2,2,0.2);
                this.magnet.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
                this.scene.translate(0.1,- Math.sin(this.angleX + this.initAngle)*5.4 -2.6,Math.cos(this.angleX + this.initAngle)*5.4);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.scale(2,2,0.2);
                this.magnet.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        
        this.scene.popMatrix();
     }

     update(currTime)
     {
        switch(this.state)
        {
                case 'DEF':
                        break;
                case 'GRAB':
                   if(this.angleY>=this.RAngle)
                       this.angleY-=this.inc;
                   else
                    if(this.angleX<=this.maxDownAngle)
                       this.angleX+=this.inc;
                        break;
                default:
                        break;
        }


       /* if(motion == 'UP')
        {
             if(this.angleX>=this.maxUpAngle)
                this.angleX-=this.inc;
        }
        else
        {
        if(this.angleX<=this.maxDownAngle)
                this.angleX+=this.inc;
        }
*/
       // this.angleY+=this.inc;
     }
 };