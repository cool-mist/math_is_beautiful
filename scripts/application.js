function Application() {

    this._logger      = new Logger("Application");
    this._logger.time("Init");

    this._canvas      = null;
    this._settings    = new Settings();
    this._patternType = new PatternType(this);
    this._util        = new Util(this._settings);

    this._generatorDefinitions = [];
    this._loadedDefinitions    = [];

    this._currentGenerator     = -1;

    this._p5RaceVictory = false;
}

Application.prototype.init = function(){
    let application = this;
    let generatorDefinitions = this._generatorDefinitions;

    for (var i = generatorDefinitions.length - 1; i >= 0; i--) {
        let generator     = generatorDefinitions[i];
        let generatorUrl  = generatorDefinitions[i].url;      
        UTIL.loadScript(application._generatorPath + generatorUrl, function(file){
            application.register(generator)
        });
    }
}

Application.prototype._parent         = "sketch-board";
Application.prototype._generatorPath  = "scripts/generators/";

Application.prototype.queueGenerator = function(generator){
    this._generatorDefinitions.push(generator);
}

Application.prototype.register = function(generator){
    let func = eval(generator.function);
    this._loadedDefinitions.push(func);
    if(this._loadedDefinitions.length === 1){ // Eager initialization
        this.onPartialInitializationComplete();
        this._logger.info("Initialized with default generator " + func.name);
    }
}

Application.prototype.generate = function(){
    return this._loadedDefinitions[this._currentGenerator];
}

Application.prototype.selectNextGenerator = function(){
    this._currentGenerator = (this._currentGenerator + 1) % this._generatorDefinitions.length;
}

Application.prototype.setup = function() {
    this._p5RaceVictory = true;
};

Application.prototype.setupOnce = function() {
    this.redraw();
};

Application.prototype.draw        = function() {};
Application.prototype.keyPressed  = function(callback){};
Application.prototype.onPartialInitializationComplete = function(){

    this._currentGenerator = 0;

    if(this._p5RaceVictory === true){
        // Manually call setup method if p5 raced us to call setup :(
        this.setupOnce();
    }else{
        // We can safely just override setup method
        this.setup = this.setupOnce;
    };

    this.draw = function(){
        this._patternType.drawTiled();
    };
 
    this.keyPressed = function(keyCode){
        if(keyCode === this._settings.saveImage){
            this.exportPNG();
            return;
        }

        if(keyCode === this._settings.newImage){
            this.redraw();
            return;
        }

        if(keyCode === this._settings.nextGenerator){
            this.selectNextGenerator();
            this._settings.reset();
            this.redraw();
            return;
        }

        if(keyCode === this._settings.incrementComplexity){
            this._settings.modifyComplexity(1);
            this.redraw();
            return;
        }

        if(keyCode === this._settings.decrementComplexity){
            this._settings.modifyComplexity(-1);
            this.redraw();
            return;
        }

        if(keyCode === this._settings.incrementPatternCount){
            this._settings.modifyPatternCount(1);
            this.redraw();
            return;
        }

        if(keyCode === this._settings.decrementPatternCount){
            this._settings.modifyPatternCount(-1);
            this.redraw();
            return;
        }
    };
    this._logger.info("Ready with at least 1 generator in " + this._logger.timeEnd("Init") + "ms");
};

Application.prototype.redraw = function(){
    // Redraw the canvas once.
    colorMode(HSB);
    this._canvas = createCanvas(this._settings.canvasSize, this._settings.canvasSize);
    this._canvas.parent(this._parent);
    noStroke();
    loop();
};

// Export canvas to file as PNG
Application.prototype.exportPNG = function(){
    saveCanvas('image', 'png');
};