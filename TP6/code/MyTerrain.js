/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends Plane {
    constructor(scene, nrDivs = 1, length = 1, width = 1, minS = 0, maxS = 1, minT = 0, maxT = 1, altimetry, texture) {
        super(scene, nrDivs, minS, maxS, minT, maxT);

        this.texture = texture;
        this.length = length;
		this.width = width;
		this.patchLength = this.length / nrDivs;
		this.patchWidth = this.width / nrDivs;

		if (altimetry !== undefined && altimetry.length == nrDivs + 1 && altimetry[0].length == nrDivs + 1)
			this.altimetry = altimetry;
		else
			this.setDefaultAltimetry();

		this.initBuffers();

		this.possPath = this.possiblePath(this.altimetry);

		this.ratio = this.possPath.length/width;
    }

   	/**
	 * In case no altimetry matrix is specified, or its dimensions are wrong, the altimetry is then
	 * constant - 0.
	 */
	setDefaultAltimetry() {
		this.altimetry = [];

		for (let i = 0; i <= this.nrDivs; i++) {
			let row = [];

			for (let j = 0; j <= this.nrDivs; j++)
				row.push(0.0);

			this.altimetry.push(row);
		}
	};

	initBuffers() {

        if(!this.altimetry)
            return;

		/* example for nrDivs = 3 :
		(numbers represent index of point in vertices array)

				y
				^
				|
		0    1  |  2    3
				|
		4	 5	|  6    7
		--------|--------------> x
		8    9  |  10  11
				|
		12  13  |  14  15    

		*/

		// Generate vertices and normals 
		this.vertices = [];
		this.normals = [];

		// Uncomment below to init texCoords
		this.texCoords = [];

		var yCoord = 0.5 * this.width;
		var incS = (this.maxS - this.minS) / this.nrDivs;
		var incT = (this.maxT - this.minT) / this.nrDivs;

		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -0.5 * this.length;
			for (var i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, yCoord, this.altimetry[i][j]);

				// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
				// So all the vertices will have the same normal, (0, 0, 1).

				this.normals.push(0, 0, 1);

				// texCoords should be computed here; uncomment and fill the blanks
				this.texCoords.push(this.minS + i * incS, this.minT + j * incT);

				xCoord += this.patchLength;
			}
			yCoord -= this.patchWidth;
		}

		// Generating indices
		/* for nrDivs = 3 output will be 
			[
				 0,  4, 1,  5,  2,  6,  3,  7, 
					7,  4,
				 4,  8, 5,  9,  6, 10,  7, 11,
				   11,  8,
				 8, 12, 9, 13, 10, 14, 11, 15,
			]
		Interpreting this index list as a TRIANGLE_STRIP will draw rows of the plane (with degenerate triangles in between. */

		this.indices = [];
		var ind = 0;


		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);

				ind++;
			}
			if (j <= this.nrDivs) {
				// Extra vertices to create degenerate triangles so that the strip can wrap on the next row
				// degenerate triangles will not generate fragments
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;

		/* Alternative with TRIANGLES instead of TRIANGLE_STRIP. More indices, but no degenerate triangles */
		/*
			for (var j = 0; j < this.nrDivs; j++) 
			{
				for (var i = 0; i < this.nrDivs; i++) 
				{
					this.indices.push(ind, ind+this.nrDivs+1, ind+1);
					this.indices.push(ind+1, ind+this.nrDivs+1, ind+this.nrDivs+2 );

					ind++;
				}
				ind++;
			}

			this.primitiveType = this.scene.gl.TRIANGLES;
		*/

		this.initGLBuffers();
	};

    setTexture(texture) {
        this.texture = texture;
    }

    possiblePath(altimetry){

		let path = [];


		for(let i = 0; i < altimetry.length - 1; i++)
		{
			let line = [];
			for(let j = 0; j < altimetry[i].length - 1; j++)
			{
				if(altimetry[i][j] == 0 &&
					altimetry[i][j+1] == 0 &&
					altimetry[i+1][j] == 0 &&
					altimetry[i+1][j+1] == 0)
				{
						line.push(0);
				}
				else
				{
					line.push(1);
				}
			}
			path.push(line);
		}
		
		return path;
    }
};