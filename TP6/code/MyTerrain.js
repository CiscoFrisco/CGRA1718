/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends Plane {
<<<<<<< HEAD
    constructor(scene, texture, nrDivs = 1, length = 1, width = 1, minS = 0, maxS = 1, minT = 0, maxT = 1) {
        super(scene, nrDivs, length, width, minS, maxS, minT, maxT);
=======
    constructor(scene, nrDivs = 1, length = 1, width = 1, minS = 0, maxS = 1, minT = 0, maxT = 1, altimetry, texture) {
        super(scene, nrDivs, length, width, minS, maxS, minT, maxT, altimetry);
>>>>>>> carro

        this.texture = texture;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
<<<<<<< HEAD
        this.texture.apply();
=======
        
        if(this.texture)
        	this.texture.apply();
        	
>>>>>>> carro
        this.drawElements(this.primitiveType);
        this.scene.popMatrix();
    }

<<<<<<< HEAD
=======

>>>>>>> carro
    setTexture(texture) {
        this.texture = texture;
    }

    setTextureWrap(wrapS, wrapT) {
        this.texture.setTextureWrap(wrapS, wrapT);
    }
};