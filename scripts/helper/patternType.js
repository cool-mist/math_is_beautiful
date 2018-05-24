function PatternType(application) {
    this._application = application;
}

// To draw a tiled pattern based on the pattern generated in the square
PatternType.prototype.drawTiled = function(){
	let settings = this._application._settings;
    let sizeOfEachSquare = settings.canvasSize / settings.patternCount;
    for (var i = 0; i < settings.patternCount; i++) {
        let startX = i*sizeOfEachSquare;
        for(var j = 0; j < settings.patternCount; j++){
            let startY = j*sizeOfEachSquare;
            this._application.generate()(startX, startY, sizeOfEachSquare, sizeOfEachSquare, settings.complexity);   
        }
    }
    noLoop();
};