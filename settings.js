var Settings = {
    generators : [],
    generator  : null,
    genIndex   : null,
    
    canvasSize   : 800,
    patternCount : 1,
    complexity   : 1,

    // Bounds
    minComplexity : 1,
    maxComplexity : 5,

    minPatternCount : 1,
    maxPatternCount : 15,

    // Colors
    hue : 255,
    sat : 40,
    bri : 100,

    // Key code controls
    newImage  : 71, // 'g' - Generate a new image
    saveImage : 83, // 's' - Save the current image

    // handling keyPresses controlling state of `this`
    nextGenerator         : 78,  // 'n'
    incrementDepth        : 221, // ']'
    decrementDepth        : 219, // '['
    incrementPatternCount : 107, // '+'
    decrementPatternCount : 109, // '-'

    handleKeyPress : function(keyCode){
        if(keyCode === this.nextGenerator){
            Settings.nextGen();
            return true;
        }else if(keyCode === this.incrementDepth){
            this.modifyComplexity(1);
            return true;
        }else if(keyCode === this.decrementDepth){
            this.modifyComplexity(-1);
            return true;
        }else if(keyCode === this.incrementPatternCount){
            this.modifyPatternCount(1);
            return true;
        }else if(keyCode === this.decrementPatternCount){
            this.modifyPatternCount(-1);
            return true;
        }
        return false;
    },

    register : function(generatorFunction) {
        this.generators.push(generatorFunction); 
    },

    nextGen  : function() { 
        this.genIndex = (this.genIndex + 1) % (this.generators.length);
        this.init();
    },

    // Set defaults
    init : function() {
        if(this.genIndex === null){
            this.genIndex = Math.floor(Math.random()*this.generators.length);
        }
        this.generator  = this.generators[this.genIndex];
        colorMode(HSB);
    },

    modifyComplexity : function(count){
        this.complexity = boundedIncrement(this.complexity, count, this.minDepth, this.maxDepth);
    },

    modifyPatternCount : function(count){
        this.patternCount = boundedIncrement(this.patternCount, count, this.minPatternCount, this.maxPatternCount);
    }
};