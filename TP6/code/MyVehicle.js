/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyVehicle extends CGFobject {
	constructor(scene, centerX = 0, centerY = 0, centerZ = 0) {
		super(scene);

		//car elements
		this.chassi = new MyChassi(scene);
		this.wheel = new MyWheel(scene, 20, 20, 20);
		this.lamp = new MyLamp(scene, 20, 20);
		this.leftmirror = new MyMirror(scene, 20, 20);
		this.rightmirror = new MyMirror(scene, 20, 20, true);
		this.rightwindooh = new MyTrapeze(scene, 1, 0.7, 1, 0.05);
		this.leftwindooh = new MyTrapeze(scene, 1, 0.7, 1, -0.05);

		this.angleCar = 0;

		this.rectangle = new MyQuad(scene);
		this.breather = new MyBreather(scene);
		this.spoiler = new MySpoiler(scene);

		this.barrel = new MyCylinder(scene, 20, 20);

		this.wheel.initBuffers();
		this.chassi.initBuffers();

		this.centerX = centerX;
		this.centerY = centerY;
		this.centerZ = centerZ;
		this.angle = 0;
		this.direction = 0;
		this.vel = 0;

		//car movement variables
		this.speed_inc = 0.01;
		this.reverting_speed_inc = 0.01;

		//behaviour booleans
		this.controlOn = true;
		this.attached = false;

		this.initTextures();
	};

	initTextures() {
		this.carTexture = new CGFappearance(this.scene);

		this.eyesTexture = new CGFappearance(this.scene);
		this.eyesTexture.loadTexture("../resources/images/cars_eyes.png");

		this.mouthTexture = new CGFappearance(this.scene);
		this.mouthTexture.loadTexture("../resources/images/cars_mouth.png");

		this.windoohTexture = new CGFappearance(this.scene);
		this.windoohTexture.loadTexture("../resources/images/windooh.png");

		this.lightTexture = new CGFappearance(this.scene);
		this.lightTexture.loadTexture("../resources/images/car_light.png");
	};

	setTexture(texture) {
		this.carTexture = texture;
	}

	display() {
		this.carTexture.apply();

		this.scene.pushMatrix();
		this.chassi.display();
		this.scene.popMatrix();

		//spoiler
		this.scene.pushMatrix();
		this.scene.translate(-6, 1.5, 0);
		this.spoiler.display();
		this.scene.popMatrix();

		//breather
		this.scene.pushMatrix();
		this.scene.translate(2.5, 1.1, 0);
		this.scene.scale(1.5, 0.3, 1.5);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.breather.display();
		this.scene.popMatrix();

		//mirrors
		this.carTexture.apply();

		this.scene.pushMatrix();
		this.scene.translate(-1, 1.5, 2.6);
		this.scene.scale(0.3, 0.5, 0.3);
		this.rightmirror.display();
		this.scene.popMatrix();

		this.carTexture.apply();

		this.scene.pushMatrix();
		this.scene.translate(-1, 1.5, -2.6);
		this.scene.scale(0.3, 0.5, 0.3);
		this.leftmirror.display();
		this.scene.popMatrix();

		//draw wheels
		this.scene.pushMatrix();
		this.scene.translate(-5, -0.5, 2);
		this.scene.rotate(this.angle, 0, 0, 1);
		this.scene.scale(0.8, 0.8, 0.8);
		this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2, -0.5, 2);
		if (this.direction != 0)
			this.scene.rotate(this.direction, 0, 1, 0);
		else
			this.scene.rotate(this.direction, 0, 1, 0);
		this.scene.rotate(this.angle, 0, 0, 1);
		this.scene.scale(0.8, 0.8, 0.8);
		this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-5, -0.5, -2);
		this.scene.rotate(this.angle, 0, 0, 1);
		this.scene.scale(0.8, 0.8, 0.8);
		this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2, -0.5, -2);
		if (this.direction != 0)
			this.scene.rotate(this.direction, 0, 1, 0);
		else
			this.scene.rotate(this.direction, 0, 1, 0);
		this.scene.rotate(this.angle, 0, 0, 1);
		this.scene.scale(0.8, 0.8, 0.8);
		this.wheel.display();
		this.scene.popMatrix();

		//barrels
		this.scene.pushMatrix();
		this.scene.translate(2, -0.5, -2);
		this.scene.scale(0.1, 0.1, 4);
		this.barrel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-5, -0.5, -2);
		this.scene.scale(0.1, 0.1, 4);
		this.barrel.display();
		this.scene.popMatrix();

		//eyes
		this.eyesTexture.apply();

		this.scene.pushMatrix();
		this.scene.translate(-0.75, 1.5, 0);
		this.scene.rotate(Math.PI / 6, 0, 0, 1);
		this.scene.scale(1, 0.9, 4.2);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.rectangle.display();
		this.scene.popMatrix();

		//mouth
		this.mouthTexture.apply();

		this.scene.pushMatrix();
		this.scene.translate(5.05, 0, 0);
		this.scene.scale(1, 0.9, 4.2);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.rectangle.display();
		this.scene.popMatrix();

		this.lightTexture.apply();

		//lamps
		this.scene.pushMatrix();
		this.scene.translate(5, 0, 1.7);
		this.scene.scale(0.3, 0.5, 0.3);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.lamp.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(5, 0, -1.7);
		this.scene.scale(0.3, 0.5, 0.3);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.lamp.display();
		this.scene.popMatrix();

		//windoohs!!!!
		this.windoohTexture.apply();
		this.scene.pushMatrix();
		this.scene.translate(-3, 1.4, 2.21);
		this.scene.scale(4.5, 0.8, 1);
		this.rightwindooh.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-3, 1.4, -2.21);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(4.5, 0.8, 1);
		this.leftwindooh.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-5.1, 1.5, 0);
		this.scene.rotate(-Math.PI / 4, 0, 0, 1);
		this.scene.scale(1, 1, 4);
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.rectangle.display();
		this.scene.popMatrix();

		this.scene.materialDefault.apply();
	};

	update(deltaTime) {
		this.centerX += deltaTime * this.vel * Math.cos(this.angleCar);
		this.centerZ -= deltaTime * this.vel * Math.sin(this.angleCar);
		this.angle -= deltaTime * this.vel;
	};

	move(deltaTime) {
		var time = deltaTime / 1000.0;
		if (this.vel != 0 || this.scene.keysPressed != false) {
			if (this.scene.keyAPressed) {
				this.direction = 1;
				if (this.vel > 0)
					this.angleCar += 2 * time;
				else if (this.vel < 0)
					this.angleCar -= 2 * time;
			} else if (this.scene.keyDPressed) {
				this.direction = -1;
				if (this.vel > 0)
					this.angleCar -= 2 * time;
				else if (this.vel < 0)
					this.angleCar += 2 * time;

			} else if (this.direction != 0)
				this.balanceDirection(time);

			if (this.scene.keyWPressed) {
				if (this.vel < 0)
					this.vel += this.reverting_speed_inc * time;

				else if (this.vel < this.scene.maxSpeed * 0.01)
					this.vel += this.speed_inc * time;
			} else if (this.scene.keySPressed) {
				if (this.vel > 0)
					this.vel -= this.reverting_speed_inc * time;

				else if (this.vel > -this.scene.maxSpeed * 0.01)
					this.vel -= this.speed_inc * time;
			} else
				this.stopCar(time);


			this.update(deltaTime);
					} else {
			if (this.direction != 0)
				this.balanceDirection(time);
		}
	};

	balanceDirection(time) {
		if (this.direction < 0.05 && this.direction > -0.05) {
			this.direction = 0;
		} else if (this.direction > 0.1) {
			this.direction += -3 * time;
			if (this.vel > 0)
				this.angleCar += 2 * time;
			else if (this.vel < 0)
				this.angleCar -= 2 * time;
		} else if (this.direction < -0.1) {
			this.direction += 3 * time;

			if (this.vel > 0)
				this.angleCar -= 2 * time;
			else if (this.vel < 0)
				this.angleCar += 2 * time;
		}
	};

	stopCar(time) {
		if (this.vel < 0.0001 && this.vel > -0.0001)
			this.vel = 0;
		else if (this.vel > 0)
			this.vel -= this.speed_inc * time;
		else if (this.vel < 0)
			this.vel += this.speed_inc * time;
	};
};