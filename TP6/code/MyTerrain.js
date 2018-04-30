/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 class MyTerrain extends Plane
 {
    constructor(scene, texture, nrDivs = 1, length = 1, width=1, minS = 0, maxS= 1, minT=0, maxT=1)
    {
        super(scene, nrDivs, length, width, minS, maxS, minT, maxT);

        this.texture = texture;
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0 ,0);
        this.texture.apply();
        this.drawElements(this.primitiveType);
        this.scene.popMatrix();
    }

    setTexture(texture)
    {
        this.texture = texture;
    }

    setTextureWrap(wrapS, wrapT)
    {
        this.texture.setTextureWrap(wrapS,wrapT);
    }
 };

