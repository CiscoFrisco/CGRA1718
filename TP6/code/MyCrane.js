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
         

         this.maxDownAngle = Math.PI/5;            
         this.maxUpAngle = -0.5;
         this.RAngle = 0.0;
         this.DAngle = Math.PI;


         this.angleY = initPos == 'D' ? Math.PI : 0;
         this.initAngle = initAngle == 'UP' ? this.maxUpAngle : this.maxDownAngle;
         this.angleX = this.initAngle;


         this.vel = 0.001;

         this.state = 'DEF';
     }

     display()
     {  
     this.scene.pushMatrix();
        this.scene.rotate(this.angleY, 0,1, 0);

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(2,2,1);
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/3, 1, 0, 0);
        this.scene.translate(0,0.5,0.5);
        this.scene.scale(0.7,0.7,15);
        this.mid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4,14,7.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(1.5,1.5,1.1);
        this.joint.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4,14,7.5);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(1.5,1.5,1.1);
        this.joint.display();
        this.scene.popMatrix();

        this.scene.pushMatrix()
        this.scene.translate(0,14,8.0); 
        this.scene.pushMatrix();
        this.scene.rotate(this.angleX, 1, 0, 0);
        this.scene.scale(0.5,0.6,11.4);
        this.arm.display();
        this.scene.popMatrix();        

        this.scene.pushMatrix();
                this.scene.translate(0, -Math.sin(this.angleX)*11.4,Math.cos(this.angleX)*11.4);
                //this.scene.rotate(Math.PI/6 + this.angleX ,1,0,0);
                this.scene.scale(0.1,6,0.1)
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.cable.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
                this.scene.translate(0.1,- Math.sin(this.angleX)*11.4 -5.7,Math.cos(this.angleX)*11.4);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.scene.scale(3,3,0.3);
                this.magnet.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
                this.scene.translate(0.1,- Math.sin(this.angleX)*11.4 -5.7,Math.cos(this.angleX)*11.4);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.scale(3,3,0.3);
                this.magnet.display();
        this.scene.popMatrix();
        if(this.scene.car.attached)
        {
                this.scene.pushMatrix();
                this.scene.translate(0.1,- Math.sin(this.angleX)*11.4 -6.7 -this.scene.car.centerY,Math.cos(this.angleX)*11.4);
                this.scene.rotate(this.scene.car.angleCar,0,1,0);
                this.scene.car.display();
                this.scene.popMatrix();
        }

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
                       this.angleY-=currTime*this.vel;
                   else if(this.angleX<=this.maxDownAngle)
                       this.angleX+=currTime*this.vel;
                   else
                   {
                       this.scene.car.attached = true;
                       this.state = 'MOVE';
                   }
                   break;
                case 'MOVE':
                   if(this.angleX>=this.maxUpAngle)
                       this.angleX-=currTime*this.vel;
                   else if(this.angleY<=this.DAngle)
                       this.angleY+=currTime*this.vel;
                   else
                      {

                    this.state = 'DROP';
                    this.scene.car.attached = false;
                    this.scene.car.centerX = 0.1;
                    this.scene.car.centerY = 14.3;
                    this.scene.car.centerZ = -17;
                    this.scene.car.angleCar += this.angleY;
                    //this.scene.car.controlOn = true; 
                    this.scene.car.vel = 0;
                      }

                   break;
                case 'DROP':
                if(this.scene.car.centerY>=1.3)
                        this.scene.car.centerY-=currTime*0.01;
                else
                {
                        this.state = 'DEF';
                        this.scene.car.controlOn = true;
                }

                /* if(this.angleX<=this.maxDownAngle)
                       this.angleX+=currTime*this.vel;
                 else
                {     
                    this.state = 'DEF';
                    this.scene.car.attached = false;
                    this.scene.car.centerX = 0.1;
                    this.scene.car.centerY = 1.3;
                    this.scene.car.centerZ = -17;
                    this.scene.car.angleCar += this.angleY;
                    this.scene.car.controlOn = true; 
                    this.scene.car.vel = 0;
                }*/

                default:
                        break;
        }
     }
 };