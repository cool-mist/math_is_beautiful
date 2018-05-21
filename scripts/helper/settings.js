function getAppSettings(){
    return {
        generators : [],
        current    : -1,
        
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
        incrementComplexity   : 107, // '+'
        decrementComplexity   : 109, // '-'
        incrementPatternCount : 221, // ']'
        decrementPatternCount : 219, // '['

        action : Object.freeze({
            redraw : 0,
            save   : 1,
            none   : 2
        }),

        // Return the action to perform
        handleKeyPress : function(keyCode){
            if(keyCode === this.saveImage){
                return this.action.save;
            }

            if(keyCode === this.newImage){
                return this.action.redraw;
            }

            if(keyCode === this.nextGenerator){
                this.selectNextGenerator();
                this.reset();
                return this.action.redraw;
            }

            if(keyCode === this.incrementComplexity){
                this.modifyComplexity(1);
                return this.action.redraw;
            }

            if(keyCode === this.decrementComplexity){
                this.modifyComplexity(-1);
                return this.action.redraw;
            }

            if(keyCode === this.incrementPatternCount){
                this.modifyPatternCount(1);
                return this.action.redraw;
            }

            if(keyCode === this.decrementPatternCount){
                this.modifyPatternCount(-1);
                return this.action.redraw;
            }

            return this.action.none; //Event was not handled
        },

        reset : function(){
            this.patternCount = 1;
            this.complexity   = 1;
        },

        register : function(generatorFunction) {
            this.generators.push(generatorFunction);
            if(this.current == -1){
                this.current = 0;
            }
        },

        currentGenerator : function(){
            return this.generators[this.current];
        },

        selectNextGenerator : function() { 
            this.current = (this.current + 1) % (this.generators.length);
            return this.currentGenerator();
        },

        modifyComplexity : function(count){
            this.complexity = UTIL.boundedIncrement(this.complexity, count, this.minComplexity, this.maxComplexity);
        },

        modifyPatternCount : function(count){
            this.patternCount = UTIL.boundedIncrement(this.patternCount, count, this.minPatternCount, this.maxPatternCount);
        }
    };
}