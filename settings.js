var Settings = {
    generators : [],
    generator  : null,
    genIndex   : null,
    
    canvasSize : 800,
    numSquares : 1,
    maxDepth   : 3,
    hue        : 255,
    sat        : 40,
    bri        : 100,

    // Key code controls
    newImage      : 71, // 'g'
    saveImage     : 83, // 's'
    nextGenerator : 78, // 'n'

    register : function(generatorFunction) {
        this.generators.push(generatorFunction); 
    },

    nextGen  : function() { 
        this.genIndex = (this.genIndex + 1) % (this.generators.length);
        this.init();
    },

    // Select a random generator initially
    init     : function() { 
        if(this.genIndex === null){
            this.genIndex = Math.floor(Math.random()*this.generators.length);
        }

        this.generator = this.generators[this.genIndex]; 
    }
};