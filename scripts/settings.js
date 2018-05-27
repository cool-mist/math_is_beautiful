function Settings(){
    this.canvasSize   = 800;
    this.patternCount = 1;
    this.complexity   = 1;

    // Bounds
    this.minComplexity = 1;
    this.maxComplexity = 5;

    this.minPatternCount = 1;
    this.maxPatternCount = 15;

    // Colors
    this.hue = 255;
    this.sat = 40;
    this.bri = 100;

    // Key code controls
    this.newImage              = 71; // 'g' - Generate a new image
    this.saveImage             = 83; // 's' - Save the current image
    this.nextGenerator         = 78;  // 'n'
    this.incrementComplexity   = 107; // '+'
    this.decrementComplexity   = 109; // '-'
    this.incrementPatternCount = 221; // ']'
    this.decrementPatternCount = 219; // '['
}

Settings.prototype.reset = function(){
    this.patternCount = 1;
    this.complexity   = 1;
}

Settings.prototype.modifyComplexity = function(count){
    this.complexity = UTIL.boundedIncrement(this.complexity, count, this.minComplexity, this.maxComplexity);
}

Settings.prototype.setComplexity = function(newValue){
    this.complexity = newValue;
}

Settings.prototype.modifyPatternCount = function(count){
    this.patternCount = UTIL.boundedIncrement(this.patternCount, count, this.minPatternCount, this.maxPatternCount);
}

Settings.prototype.setPatternCount = function(newValue){
    this.patternCount = newValue;
}