function Application() {

    this._logger      = new Logger("Application");
    this._logger.time("Init");

    this._generatorDefinitions = [];
    this._loadedDefinitions    = [];

    this._currentGenerator     = -1;

    this._p5RaceVictory = false;
    this._canvas      = null;
    this._settings    = new Settings();
    this._util        = new Util(this);
    this._patternType = new PatternType(this);
    this._controls    = new Controls(this);
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

Application.prototype.selectGeneratorByName = function(funcName){
    for (var i = this._loadedDefinitions.length - 1; i >= 0; i--) {
        if(this._loadedDefinitions[i].name === funcName){
            this._currentGenerator = i;
            break;
        }
    }
    this.loadSettingsForCurrentGenerator();
}

Application.prototype.selectNextGenerator = function(){
    this._currentGenerator = (this._currentGenerator + 1) % this._loadedDefinitions.length;
    this.loadSettingsForCurrentGenerator();
}

Application.prototype.loadSettingsForCurrentGenerator = function(){
    try{
        let func = eval(this._loadedDefinitions[this._currentGenerator].name + "Settings");
        let settings = func();
        this._settings.maxPatternCount = settings.maxSize;    
    }catch(err){
        this._logger.error(err);
        this._settings.maxPatternCount = 15;
    }
    this._controls.reset();
    
}

Application.prototype.setup = function() {
    this._p5RaceVictory = true;
};

Application.prototype.setupOnce = function() {
    this.redraw();
    this.loadSettingsForCurrentGenerator();
    this._controls.reset();
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
        this._logger.info("Drawing started ..")
        this._logger.time("redraw");
        push();

        this._patternType.drawTiled();

        pop();
        let timeTaken = this._logger.timeEnd("redraw");
        this._logger.info("Drawing completed in " + timeTaken+ " ms");
        select("#time").html((timeTaken / 1000).toFixed(5) + " sec");

    };
 
    this.keyPressed = this._controls.keyPressed.bind(this._controls); // Is this even OOP ?
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