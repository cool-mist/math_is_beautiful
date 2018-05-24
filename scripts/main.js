/*Globals - The only set of globals coming from THIS app*/

var APPLICATION;  

var UTIL;                // General purpose utils @helper/utils.js

var SETTINGS;            // Current settings for this sketch @settings.js

var SKETCH;              // var pertaining to sketch
var CONTROLS;            // to control sketch parameters @controls.js

var ALL_PATTERN_SCRIPTS; // All scripts to be loaded
var LOADED_GENERATORS;   // TODO

/* 
Registered generators 

A recursive generator function must be of the form scriptNameGEnerator(x, y, w, h, complexity)
All measurements from canvas area top-left

x : x coordinate of draw area 
y : y coordinate of draw area
w : width of draw area
h : height of draw area
complexity : complexity of the pattern

*/
ALL_PATTERN_SCRIPTS = [
    "sierpinskiTriangle.js", // https://en.wikipedia.org/wiki/Sierpinski_triangle
    "sierpinskiCarpet.js"  , // https://en.wikipedia.org/wiki/Sierpinski_carpet
];

APPLICATION = {
    _p5RaceVictory : false,

    setup : function() {
        this._p5RaceVictory = true;
    },

    setupOnce : function() {
        SKETCH.redraw();
    },
    draw        : function() {},
    keyPressed  : function(callback){},
    initialized : function(){

        if(this._p5RaceVictory === true){
            // Manually call setup method if p5 raced us to call setup :(
            this.setupOnce();
        }else{
            // We can safely just override setup method
            this.setup = this.setupOnce;
        }

        this.draw = function(){
            SKETCH.drawTiled();
        },

        this.keyPressed = function(){
            let action = SETTINGS.handleKeyPress(keyCode);
            if(action === SETTINGS.action.redraw){
                SKETCH.redraw();
                return;
            }
            if(action === SETTINGS.action.save){
                SKETCH.exportPNG();
                return;
            }
        };
        console.log("Application initialized");
    }
};

LOADED_GENERATORS = {
    _generators : [],

    add : function(generator){
        this._generators.push(generator);
        if(this._generators.length === 1){
            APPLICATION.initialized();
        }
    }
};

UTIL     = getUtil();
SETTINGS = getAppSettings();
SKETCH   = getSketch(SETTINGS);
CONTROLS = null;

function setup() {
    APPLICATION.setup();
}
function draw()  {
    APPLICATION.draw();
}

function keyPressed(){
    APPLICATION.keyPressed();
} 

for (var i = ALL_PATTERN_SCRIPTS.length - 1; i >= 0; i--) {
    UTIL.loadScript("scripts/generators/" + ALL_PATTERN_SCRIPTS[i], function(file){
        let generator = file.slice("scripts/generators/".length, file.indexOf(".")) + "Generator";
        SETTINGS.register(eval(generator));
        console.log("Registered generator " + generator);
        LOADED_GENERATORS.add(generator);
    });
}

function getSketch(settings){
    return {

        _parent : "sketch-board",
        _canvas : null,

        // To draw a tiled pattern based on the pattern generated in the square
        drawTiled : function(){
            let sizeOfEachSquare = settings.canvasSize / settings.patternCount;
            for (var i = 0; i < settings.patternCount; i++) {
                let startX = i*sizeOfEachSquare;
                for(var j = 0; j < settings.patternCount; j++){
                    let startY = j*sizeOfEachSquare;
                    settings.currentGenerator()(startX, startY, sizeOfEachSquare, sizeOfEachSquare, settings.complexity);   
                }
            }
            noLoop();
        },

        // Fill a random color for all subsequent shapes created using p5 in the canvas
        fillRandomColor : function(){
            fill(random(settings.hue), random(settings.sat), random(settings.bri));
        },

        // Redraw the canvas once.
        redraw : function(){
            colorMode(HSB);
            this._canvas = createCanvas(settings.canvasSize, settings.canvasSize);
            this._canvas.parent(this._parent);
            noStroke();
            loop();
        },

        // Export canvas to file as PNG
        exportPNG : function(){
            saveCanvas('image', 'png');
        },
    }
}